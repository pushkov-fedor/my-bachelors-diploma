import { observable, action, reaction, autorun, toJS } from "mobx";
import React from "react";
import { MatrixInput } from "../components/MatrixInput/MatrixInput";
import {
  parseStringToMatrix,
  parseMatrixToString,
  getSign,
  clearString,
  polynomialToLpFormat
} from "../utils/ExpParser";
import {
  matrixSumOnVariables,
  matrixMinusOnVariables,
  matrixMultiplicationOnVariables
} from "../utils/Math";

const objective = observable.box("");
const setObjective = action(objective_ => objective.set(objective_));

const objectiveType = observable.box("Maximize");
const setObjectiveType = action(type => objectiveType.set(type));

const subjectTo = observable.box("");
const setSubjectTo = action(subject => subjectTo.set(subject));

const bounds = observable.box("");
const setBounds = action(bs => bounds.set(bs));

const subjectToParts = observable([]);
const setSubjectToParts = action(parts => {
  while (subjectToParts.length > 0) subjectToParts.pop();
  parts.forEach(part => subjectToParts.push(part));
});

autorun(() => {
  const sign = "&";
  const signIndex = subjectTo.get().indexOf(sign);
  if (signIndex !== -1) {
    const subjectToClear = clearString(subjectTo.get());
    const [subjLeft, subjRight] = subjectToClear.split(sign);
    setSubjectToParts([subjLeft, sign, subjRight]);
  }
});

const matrixDataSubjectParts = observable([]);
const setMatrixDataSubjectParts = action(parts => {
  while (matrixDataSubjectParts.length > 0) matrixDataSubjectParts.pop();
  parts.forEach(part => matrixDataSubjectParts.push(part));
});
const updateMatrixDataSubjectParts = action((id, value) => {
  const matrixDataSubjectPartsCopy = toJS(matrixDataSubjectParts).slice();
  const matrixDataObject = matrixDataSubjectPartsCopy
    .flat()
    .find(md => md.id === id);
  matrixDataObject.value = value;
  setMatrixDataSubjectParts(matrixDataSubjectPartsCopy);
});

const matrixInputSubjectParts = observable([]);
const setMatrixInputSubjectParts = action(parts => {
  while (matrixInputSubjectParts.length > 0) matrixInputSubjectParts.pop();
  parts.forEach(part => matrixInputSubjectParts.push(part));
});

const calculatedParts = observable([]);
const setCalculatedParts = action(parts => {
  while (calculatedParts.length > 0) calculatedParts.pop();
  parts.forEach(part => calculatedParts.push(part));
});

const calculate = () => {
  const [subjLeftClear, subjSignClear, subjRightClear] = toJS(
    subjectToParts
  ).map(part => clearString(part));
  const resultLeft = calculateSum(subjLeftClear, 0);
  const resultSign = toJS(matrixDataSubjectParts)[1].find(md => md.id === "&")
    .value;
  const resultRight = calculateSum(subjRightClear, 2);
  setCalculatedParts(
    [resultLeft, resultSign, resultRight].map(res => parseMatrixToString(res))
  );
};

const calculateSum = (expression, index) => {
  const matrices = expression.split("+").map(exp => calculateMinus(exp, index));
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixSumOnVariables(acc, m), initialValue);
};

const calculateMinus = (expression, index) => {
  const matrices = expression.split("-").map(exp => calculateMult(exp, index));
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixMinusOnVariables(acc, m), initialValue);
};

const calculateMult = (expression, index) => {
  const matrices = expression
    .split("*")
    .map(id =>
      parseStringToMatrix(
        toJS(matrixDataSubjectParts)[index].find(data => data.id == id).value
      )
    );
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixMultiplicationOnVariables(acc, m), initialValue);
};

reaction(
  () => toJS(subjectToParts),
  subjectToParts => {
    const [matrixDataLeft, matrixDataSign, matrixDataRight] = toJS(
      subjectToParts
    ).map(part =>
      clearString(part)
        .split("+")
        .map(exp => exp.split("-"))
        .flat()
        .map(exp => exp.split("*"))
        .flat()
        .map(exp => exp.split("/"))
        .flat()
        .filter(matrix => matrix != "")
        .map(mx => ({ id: mx, value: "" }))
    );
    const [matrixInputLeft, matrixInputSign, matrixInputRight] = [
      matrixDataLeft,
      matrixDataSign,
      matrixDataRight
    ].map(part => part.map(md => <MatrixInput id={md.id} key={md.id} />));
    setMatrixDataSubjectParts([
      matrixDataLeft,
      matrixDataSign,
      matrixDataRight
    ]);
    setMatrixInputSubjectParts([
      matrixInputLeft,
      matrixInputSign,
      matrixInputRight
    ]);
    setCalculatedParts(["", ""]);
  }
);

const createLP = () => {
  let lp = "";
  lp += `${objectiveType.get()}\n`;
  let objectiveLP = polynomialToLpFormat(objective.get());
  lp += ` obj: ${objectiveLP}\n`;
  lp += "Subject To\n";
  calculate();
  const [cLeft, cSign, cRight] = toJS(calculatedParts).map(part =>
    part.split("\n")
  );
  cLeft.forEach((value, index) => {
    const objRow = [
      ` c${index + 1}: ${polynomialToLpFormat(cLeft[index])}`,
      cSign[index],
      cRight[index]
    ]
      .map(part => (part === undefined ? "0" : part))
      .join(" ")
      .concat("\n");
    lp += objRow;
  });
  if (bounds.get() !== "") {
    lp += "Bounds\n";
    bounds
      .get()
      .split("\n")
      .map(bound => clearString(bound))
      .map(bound => {
        let signLeft = getSign(bound);
        let [left, center, right] = bound.split(signLeft);
        if (right !== undefined)
          return [left, center, right].join(` ${signLeft} `);
        else {
          right = center;
          let signRight = getSign(right);
          right = right.split(signRight).join(` ${signRight} `);
          return [left, right].join(` ${signLeft} `);
        }
      })
      .map(bound => ` ${bound}\n`)
      .forEach(bound => (lp += bound));
  }
  lp += "End\n";
  console.log(lp);
};

export const expStore = {
  objective,
  setObjective,
  objectiveType,
  setObjectiveType,
  subjectTo,
  setSubjectTo,
  bounds,
  setBounds,
  subjectToParts,
  matrixDataSubjectParts,
  updateMatrixDataSubjectParts,
  matrixInputSubjectParts,
  calculatedParts,
  calculate,
  createLP
};
