import getBounds from "./getBounds";
import isColumn from "./isColumn";
import { errors, appendError, setErrors } from "../stores/uiStore";
import { firstLevelData } from "../stores/firstLevel";
import { names } from "../stores/names";
import { toJS } from "mobx";

export const parseDataExpression = (expr) => {
  const result = expr.split(";");
  if (result.length != 2) {
    appendError(
      "Ошибка при парсинге выражения вида Y=X;Y*X, слишком много или слишком мало ';'"
    );
    return [];
  }
  return result;
};

export const parseDataSubexpression = (expr) => {
  const symbols = ["|", "=", "*", "<", ">", "<>"];
  const parseResult = {};
  symbols.forEach((sym) => {
    const parsedPair = expr.split(sym);
    if (
      parsedPair.length > 1 &&
      parseResult.left === undefined &&
      parseResult.right === undefined &&
      parseResult.operation === undefined
    ) {
      parseResult.operation = sym;
      parseResult.left = parsedPair[0];
      parseResult.right = parsedPair[1];
    }
  });
  if (
    parseResult.left === undefined &&
    parseResult.right === undefined &&
    parseResult.operation === undefined
  ) {
    appendError(
      `Ошибка при парсинге подвыражения, доступные операции: ${symbols}`
    );
  }
  return parseResult;
};

export const isBound = (row, col) => {
  return row === 0 || col === 0;
};

export const isFiltered = (expr) => {
  const splitted = expr.split("(").map((part) => part.replace(")", ""));
  return splitted.length === 2;
};

export const isTransport = (expr) => {
  const signs = ["<>", "<", ">"];
  for (let i = 0; i < signs.length; i++) {
    const sign = signs[i];
    const splitted = expr.split(sign);
    if (splitted.length === 2) return { is: true, sign };
  }
  return { is: false };
};

export const getTransportLength = (sign, expr, names) => {
  const [left, right] = expr.split(sign);
  if (left !== right) {
    appendError(
      `ID для листов транспортных пар должны совпадать ${left}!==${right}`
    );
    return;
  }
  const listId = left;
  const list = names.find((list) => list.listId === listId);
  if (list === undefined) {
    appendError(`Нет листа с ID ${listId}`);
    return;
  }
  const rawLen = list.names.length;
  const transportPairs = [];
  switch (sign) {
    case "<":
      for (let i = 1; i <= rawLen; i++) {
        for (let j = i + 1; j <= rawLen; j++) {
          transportPairs.push({ i, j });
        }
      }
      break;
    case ">":
      for (let i = rawLen; i >= 1; i--) {
        for (let j = i - 1; j >= 1; j--) {
          transportPairs.push({ i, j });
        }
      }
      break;
    case "<>":
      for (let i = 1; i <= rawLen; i++) {
        for (let j = i + 1; j <= rawLen; j++) {
          transportPairs.push({ i, j });
          transportPairs.push({ i: j, j: i });
        }
      }
      break;
  }
  console.log(transportPairs);
  return { len: transportPairs.length, data: transportPairs };
};

export const getFilteredLength = (expr, names) => {
  const splitted = expr.split("(").map((part) => part.replace(")", ""));
  const listId = splitted[0];
  const columnId = splitted[1];

  const list = names.find((list) => list.listId === listId);
  if (list === undefined) {
    appendError(`Нет листа с ID ${listId}`);
    return;
  }

  let filteredPosition;
  list.headings.forEach((head, index) => {
    if (head.id !== undefined && head.id === columnId) {
      filteredPosition = index;
    }
  });
  if (filteredPosition === undefined) {
    appendError(`Нет колонки с ID ${columnId} в листе ${listId}`);
    return;
  }
  const len = list.names.filter((name) => name[filteredPosition] !== "").length;
  return len;
};

export const getLengthByBound = (position, bound, namesFromStore) => {
  const { names } = bound;
  if (
    names[0] === undefined ||
    names[1] === undefined ||
    names[1][0] === undefined
  ) {
    appendError(`Незаполнено данные для границы ${bound.id}`);
    return [];
  }
  const listId = names[position];
  if (listId === "1") return { type: "single", len: 1 };

  if (isFiltered(listId))
    return {
      type: "filtered",
      len: getFilteredLength(listId, namesFromStore),
    };
  const isTransportObj = isTransport(listId);
  if (isTransportObj.is)
    return {
      type: "transport",
      len: getTransportLength(isTransportObj.sign, listId, namesFromStore),
    };

  const list = namesFromStore.find((list) => list.listId === listId);
  if (list === undefined) {
    appendError(`Нет листа с именем ${listId}`);
    return [];
  }
  const len = list.names.length;
  return { type: "full", len };
};

export const getDataForShapeGeneration = (
  level,
  exprDataObject,
  firstLevelData,
  column,
  row,
  names,
  errors
) => {
  const { leftBound, topBound } = getBounds(
    firstLevelData,
    column,
    row,
    errors
  );
  const leftLen = getLengthByBound(level - 2, leftBound, names);
  const rightLen = getLengthByBound(level - 2, topBound, names);
  return Object.assign(exprDataObject, { left: leftLen }, { right: rightLen });
};

export const getDataForBorderShapeGeneration = (
  expr,
  row,
  column,
  namesFromStore,
  errors
) => {
  const listId = expr;

  if (listId === "1") return { type: "bound", len: 1 };

  if (isFiltered(listId))
    return {
      column: isColumn(column, row),
      type: "bound",
      len: getFilteredLength(listId, namesFromStore),
    };
  const isTransportObj = isTransport(listId);
  console.log(isTransportObj);
  if (isTransportObj.is)
    return {
      column: isColumn(column, row),
      type: "bound",
      subtype: "transport",
      len: getTransportLength(isTransportObj.sign, listId, namesFromStore),
    };
  const list = namesFromStore.find((list) => list.listId === listId);
  if (list === undefined) {
    appendError(`Нет листа с именем ${listId}`);
    return [];
  }
  const len = list.names.length;
  return {
    column: isColumn(column, row),
    type: "bound",
    len,
  };
};

export const generateShape = (dataObject, cellId) => {
  const { type, subtype, len, column } = dataObject;
  let result = [];
  if (type === "bound") {
    if (subtype === "transport")
      return {
        type: column ? "column" : "row",
        data: len.data.map((part) => `${cellId}${part.i}${part.j}`),
      };
    for (let i = 0; i < len; i++) {
      result.push(`${cellId}${i + 1}`);
    }
    return {
      type: column ? "column" : "row",
      data: result,
    };
  }

  const { operation, left, right: top } = dataObject;
  switch (operation) {
    case "=":
      if (left.len !== top.len) {
        appendError(
          `Для операции ${operation} строки и столбцы должны быть одинаковой длины: ${left.len}!==${top.len}`
        );
        return;
      }
      for (let i = 0; i < left.len; i++) {
        result.push([]);
        for (let j = 0; j < top.len; j++) {
          result[i].push(i === j ? `${cellId}${i}${j}` : "");
        }
      }
      return { type: "matrix", data: result };
    case "*":
      for (let i = 0; i < left.len; i++) {
        result.push([]);
        for (let j = 0; j < top.len; j++) {
          result[i].push(`${cellId}${i}${j}`);
        }
      }
      return { type: "matrix", data: result };
    case "|":
      if (top.type !== "transport") {
        appendError(
          "Верхняя матрица должна быть транспортного типа (<>, <, >)"
        );
        return;
      }
      for (let i = 0; i < left.len; i++) {
        result.push([]);
        for (let j = 0; j < top.len.len; j++) {
          const { i: pairsI, j: pairsJ } = top.len.data[j];
          i === pairsI - 1
            ? result[i].push(`${cellId}${pairsI}${pairsJ}`)
            : i === pairsJ - 1
            ? result[i].push(`${cellId}${pairsJ}${pairsI}`)
            : result[i].push(null);
        }
      }
      return { type: "matrix", data: result };
  }
};

export const getShapeFrom = (shape, fromId, id) => {
  console.log("-------------------");
  console.log(shape);
  console.log(fromId);
  console.log(id);
  if (!shape) return;
  return shape.map((level) =>
    Object.assign(level, {
      data: level.data.map((item) => item.replace(fromId, id)),
    })
  );
};

export const getShape = (column, row) => {
  setErrors([]);
  const columnDataObject = toJS(firstLevelData).find(
    (item) => item.column === column
  );
  if (columnDataObject === undefined) {
    appendError(`На первом уровне нет столбца с номером ${column}`);
    return;
  }
  const dataObject = columnDataObject.data[row];
  if (dataObject === undefined) {
    appendError(
      `На первом уровне в столбце ${column} нет строки с номером ${row}`
    );
    return;
  }
  if (dataObject.names === undefined) {
    appendError(`Размерности не определены для ячейки ${dataObject.id}`);
    return;
  }
  if (dataObject.names.length < 2) {
    appendError(`Незаполнены размероности для ячейки ${dataObject.id}`);
    return;
  }
  const cellId = dataObject.id;
  let [second, third] = dataObject.names;

  if (errors.length > 0) return;
  if (isBound(row, column)) {
    second = getDataForBorderShapeGeneration(second, row, column, toJS(names));
    if (errors.length > 0) return;

    third = getDataForBorderShapeGeneration(third, row, column, toJS(names));
    if (errors.length > 0) return;

    second = generateShape(second, cellId);
    third = generateShape(third, cellId);
    console.log(second, third);
    return [second, third];
  }

  second = parseDataSubexpression(second);
  if (errors.length > 0) return;

  third = parseDataSubexpression(third);
  if (errors.length > 0) return;

  second = getDataForShapeGeneration(
    2,
    second,
    toJS(firstLevelData),
    column,
    row,
    toJS(names)
  );
  if (errors.length > 0) return;

  third = getDataForShapeGeneration(
    3,
    third,
    toJS(firstLevelData),
    column,
    row,
    toJS(names)
  );
  if (errors.length > 0) return;

  second = generateShape(second, cellId);
  third = generateShape(third, cellId);
  console.log(second, third);
  return [second, third];
};

export default {
  isBound,
  parseDataExpression,
  parseDataSubexpression,
  getDataForShapeGeneration,
  getDataForBorderShapeGeneration,
  generateShape,
  getShape,
  getShapeFrom,
};
