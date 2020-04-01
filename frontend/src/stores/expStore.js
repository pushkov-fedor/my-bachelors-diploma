import { observable, action, autorun, toJS } from "mobx";
import React from "react";
import { MatrixInput } from "../components/MatrixInput/MatrixInput";
import {
  parseStringToMatrix,
  parseMatrixToString,
  getSign
} from "../utils/ExpParser";
import {
  matrixSumOnVariables,
  matrixMinusOnVariables,
  matrixMultiplicationOnVariables
} from "../utils/Math";

const expression = observable.box("");
const setExpression = action(exp => expression.set(exp));

autorun();

const matrixData = observable([]);
const setMatrixData = action(data => {
  while (matrixData.length > 0) matrixData.pop();
  data.forEach(md => matrixData.push(md));
});
const updateMatrixData = action((id, value) => {
  matrixData.find(md => md.id == id).value = value;
});

const matrixInputComponents = observable([]);
const setMatrixInputComponents = action(components => {
  while (matrixInputComponents.length > 0) matrixInputComponents.pop();
  components.forEach(component => matrixInputComponents.push(component));
});

const solution = observable.box("");
const setSolution = action(sol => solution.set(sol));

const calculate = () => {
  const filteredExpression = expression
    .get()
    .trim()
    .replace(/\s/g, "");
  const res = calculateSum(filteredExpression);
  setSolution(parseMatrixToString(res));
};

const calculateSum = expression => {
  const matrices = expression.split("+").map(exp => calculateMinus(exp));
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixSumOnVariables(acc, m), initialValue);
};

const calculateMinus = expression => {
  const matrices = expression.split("-").map(exp => calculateMult(exp));
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixMinusOnVariables(acc, m), initialValue);
};

const calculateMult = expression => {
  const matrices = expression
    .split("*")
    .map(id =>
      parseStringToMatrix(toJS(matrixData).find(data => data.id == id).value)
    );
  const initialValue = matrices[0];
  return matrices
    .slice(1)
    .reduce((acc, m) => matrixMultiplicationOnVariables(acc, m), initialValue);
};

autorun(() => {
  const matrixData = expression
    .get()
    .trim()
    .replace(/\s/g, "")
    .split("+")
    .map(exp => exp.split("-"))
    .flat()
    .map(exp => exp.split("*"))
    .flat()
    .map(exp => exp.split("/"))
    .flat()
    .filter(matrix => matrix != "")
    .map(mx => ({ id: mx, value: "" }));
  const inputComponents = matrixData.map(md => (
    <MatrixInput id={md.id} key={md.id} />
  ));
  setMatrixData(matrixData);
  setMatrixInputComponents(inputComponents);
  setSolution("");
});

export const expStore = {
  expression,
  setExpression,
  matrixData,
  matrixInputComponents,
  updateMatrixData,
  calculate,
  solution
};
