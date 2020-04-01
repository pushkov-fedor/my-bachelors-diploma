import { calculate } from "./Math";

export const calculateExpression = expression => {
  return parsePlusExpression(expression);
};

const parsePlusExpression = expression => {
  return expression
    .split("+")
    .map(str => parseMinusExpression(str))
    .reduce((acc, num) => acc + num, 0.0);
};

const parseMinusExpression = expression => {
  const numbers = expression.split("-").map(str => parseMultExpression(str));
  const initialValue = numbers[0];
  return numbers.slice(1).reduce((acc, num) => acc - num, initialValue);
};

const parseMultExpression = expression => {
  return expression
    .split("*")
    .map(str => parseDivExpression(str))
    .reduce((acc, num) => acc * num, 1.0);
};

const parseDivExpression = expression => {
  const numbers = expression.split("/").map(str => +str);
  const initialValue = numbers[0];
  return numbers.slice(1).reduce((acc, num) => acc / num, initialValue);
};

const getSign = subjectTo => {
  const signLevel = [">=", "<=", ">", "=", "<"];
  return signLevel
    .map(sign => ({ sign, index: subjectTo.indexOf(sign) }))
    .filter(({ index }) => index != -1)
    .shift().sign;
};

export const parseStringToMatrix = string => {
  return string
    .split("\n")
    .map(row => row.split(" "))
    .map(row => row.filter(v => v !== ""));
};

export const parseMatrixToString = matrix => {
  try {
    return matrix.map(row => row.join(" ")).join("\n");
  } catch (error) {
    console.error(error);
  }
};
