export const clearString = (str) => {
  return str.trim().replace(/\s/g, "");
};

export const polynomialToLpFormat = (str) => {
  return clearString(str)
    .replace(/-/g, "+~")
    .split("+")
    .map((part) => part.replace(/~/g, "-"))
    .map((part) => part.split("*").join(" "))
    .map((part) => `+ ${part}`)
    .join(" ")
    .split("+ -")
    .join("- ")
    .split("+  -")
    .join("-");
};

export const calculateExpression = (expression) => {
  return parsePlusExpression(expression);
};

const parsePlusExpression = (expression) => {
  return expression
    .split("+")
    .map((str) => parseMinusExpression(str))
    .reduce((acc, num) => acc + num, 0.0);
};

const parseMinusExpression = (expression) => {
  const numbers = expression.split("-").map((str) => parseMultExpression(str));
  const initialValue = numbers[0];
  return numbers.slice(1).reduce((acc, num) => acc - num, initialValue);
};

const parseMultExpression = (expression) => {
  return expression
    .split("*")
    .map((str) => parseDivExpression(str))
    .reduce((acc, num) => acc * num, 1.0);
};

const parseDivExpression = (expression) => {
  const numbers = expression.split("/").map((str) => +str);
  const initialValue = numbers[0];
  return numbers.slice(1).reduce((acc, num) => acc / num, initialValue);
};

export const getSign = (subjectTo) => {
  const signLevel = [">=", "<=", ">", "=", "<"];
  const signs = signLevel
    .map((sign) => ({ sign, index: subjectTo.indexOf(sign) }))
    .filter(({ index }) => index !== -1);
  if (signs.length === 0) return "NOSIGN";
  else return signs.shift().sign;
};

export const parseStringToMatrix = (string) => {
  return string
    .split("\n")
    .map((row) => row.split(" "))
    .map((row) => row.filter((v) => v !== ""));
};

export const parseMatrixToString = (matrix) => {
  if (typeof matrix === "string") return matrix;
  try {
    return matrix
      .map((row) => row.join(" "))
      .join("\n")
      .split("+-")
      .join("-");
  } catch (error) {
    console.error(error);
  }
};

const parseInputVectorRange = (vectorRange) => {
  let sign = vectorRange.indexOf("-");
  if (sign !== -1) sign = "-";
  else sign = "|";
  const [start, end] = vectorRange.split(sign);
  if (end !== undefined)
    return {
      direction: sign,
      range: { start, end },
    };
  else
    return {
      direction: sign,
      range: { start: undefined, end: undefined },
    };
};

export const firstLevelInputToSecondLevelStructure = (input) => {
  const { id, value } = input;
  const [, right, rightRight] = value.split(":");
  if (right !== undefined) {
    const { direction: direction1, range: range1 } = parseInputVectorRange(
      right
    );
    if (rightRight !== undefined) {
      const { direction: direction2, range: range2 } = parseInputVectorRange(
        rightRight
      );
      return { id, type: "MATRIX", direction1, range1, direction2, range2 };
    } else {
      return { id, type: "VECTOR", direction1, range1 };
    }
  } else {
    return {
      id,
      type: undefined,
      direction1: undefined,
      range1: { start: undefined, end: undefined },
    };
  }
};

export const parseFirstLevelDataDataNamesInput = (names) => {
  let input = names;
  input = input.trim().split(";");
  return input;
};

export const firstLevelDataDataNamesArrayToString = (names) => {
  return names.join(";");
};

export const parseFirstLevelDataNamesFilter = (expr) => {
  return expr.split("(").map((expr) => expr.replace("(", "").replace(")", ""));
};
