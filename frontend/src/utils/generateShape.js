import create2dArray from "./create2dArray";

export const generateShape = (exp = "", cellId = "") => {
  if (exp === "" || cellId === "") {
    console.log("Пустые аргументы");
    return [];
  }
  const symbols = ["|", "=", "*", "<", ">", "<>"];
  const errors = [];

  let parsedSym;
  let parsedExp;
  symbols.forEach((sym) => {
    const parsedPair = exp.split(sym);
    if (
      parsedPair.length > 1 &&
      parsedExp === undefined &&
      parsedSym === undefined
    ) {
      parsedExp = parsedPair;
      parsedSym = sym;
    }
  });
  const listsLenghts = parsedExp.map((exp) => getLengthByListId(exp));

  let result = [];
  const [leftLen, rightLen] = listsLenghts;
  switch (parsedSym) {
    case "=":
      if (leftLen !== rightLen) {
        errors.push(`Списки ${parsedExp} должны быть одинаковой длины`);
        break;
      }
      for (let i = 0; i < leftLen; i++) {
        result.push([]);
        for (let j = 0; j < leftLen; j++) {
          i === j ? result[i].push(`${cellId}${i}${i}`) : result[i].push(null);
        }
      }
      break;
    case "*":
      for (let i = 0; i < leftLen; i++) {
        result.push([]);
        for (let j = 0; j < leftLen; j++) {
          result[i].push(`${cellId}${i}${i}`);
        }
      }
      break;
    case "<":
      for (let i = 1; i <= leftLen; i++) {
        for (let j = i + 1; j <= leftLen; j++) {
          result.push(`${cellId}${i}${j}`);
        }
      }
      break;
    case ">":
      for (let i = leftLen; i >= 1; i--) {
        for (let j = leftLen; j >= i + 1; j--) {
          result.push(`${cellId}${j}${i}`);
        }
      }
      break;
    case "<>":
      for (let i = 1; i <= leftLen; i++) {
        for (let j = 1; j <= leftLen; j++) {
          i !== j && result.push(`${cellId}${i}${j}`);
        }
      }
      break;
    case "|":
      const pairs = [];
      for (let i = 1; i <= leftLen; i++) {
        for (let j = i + 1; j <= leftLen; j++) {
          pairs.push({ i, j });
        }
      }
      for (let i = 1; i <= leftLen; i++) {
        result.push([]);
        for (let j = 1; j <= pairs.length; j++) {
          const { i: pairsI, j: pairsJ } = pairs[j - 1];
          i === pairsI
            ? result[i - 1].push(`${cellId}${pairsI}${pairsJ}`)
            : i === pairsJ
            ? result[i - 1].push(`${cellId}${pairsJ}${pairsI}`)
            : result[i - 1].push(null);
        }
      }
      break;
  }
  return [result, errors];
};

const getLengthByListId = (id) => {
  return 4;
};
