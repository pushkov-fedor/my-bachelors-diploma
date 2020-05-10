import getBounds from "./getBounds";

export const parseDataExpression = (expr, errors) => {
  const result = expr.split(";");
  if (result.length != 2) {
    errors.push(
      "Ошибка при парсинге выражения вида Y=X;Y*X, слишком много или слишком мало ';'"
    );
    return [];
  }
  return result;
};

export const parseDataSubexpression = (expr, errors) => {
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
    errors.push(
      `Ошибка при парсинге подвыражения, доступные операции: ${symbols}`
    );
  }
  return parseResult;
};

export const isFiltered = (expr) => {
  const splitted = expr.split("(").map((part) => part.replace(")", ""));
  return splitted.length === 2;
};

export const isTransport = (expr) => {
  const splitted = expr.split("<>");
  return splitted.length === 2;
};

export const getTransportLength = (expr, names, errors) => {
  const [left, right] = expr.split("<>");
  if (left !== right) {
    errors.push(
      `ID для листов транспортных пар должны совпадать ${left}!==${right}`
    );
    return;
  }
  const listId = left;
  const list = names.find((list) => list.listId === listId);
  if (list === undefined) {
    errors.push(`Нет листа с ID ${listId}`);
    return;
  }
  const rawLen = list.names.length;
  const transportPairs = [];
  for (let i = 1; i <= rawLen; i++) {
    for (let j = i + 1; j <= rawLen; j++) {
      transportPairs.push({ i, j });
    }
  }
  return transportPairs.length;
};

export const getFilteredLength = (expr, names, errors) => {
  const splitted = expr.split("(").map((part) => part.replace(")", ""));
  const listId = splitted[0];
  const columnId = splitted[1];

  const list = names.find((list) => list.listId === listId);
  if (list === undefined) {
    errors.push(`Нет листа с ID ${listId}`);
    return;
  }

  let filteredPosition;
  list.headings.forEach((head, index) => {
    if (head.id !== undefined && head.id === columnId) {
      filteredPosition = index;
    }
  });
  if (filteredPosition === undefined) {
    errors.push(`Нет колонки с ID ${columnId} в листе ${listId}`);
    return;
  }
  const len = list.names.filter((name) => name[filteredPosition] !== "").length;
  return len;
};

export const getLengthByBound = (position, bound, namesFromStore, errors) => {
  const { names } = bound;
  if (
    names[0] === undefined ||
    names[1] === undefined ||
    names[1][0] === undefined
  ) {
    errors.push(`Незаполнено данные для границы ${bound.id}`);
    return [];
  }
  const listId = names[position];
  if (listId === "1") return { type: "single", len: 1 };

  if (isFiltered(listId))
    return {
      type: "filtered",
      len: getFilteredLength(listId, namesFromStore, errors),
    };
  if (isTransport(listId))
    return {
      type: "transport",
      len: getTransportLength(listId, namesFromStore, errors),
    };

  const list = namesFromStore.find((list) => list.listId === listId);
  if (list === undefined) {
    errors.push(`Нет листа с именем ${listId}`);
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
  const leftLen = getLengthByBound(level - 2, leftBound, names, errors);
  const rightLen = getLengthByBound(level - 2, topBound, names, errors);
  return Object.assign(exprDataObject, { left: leftLen }, { right: rightLen });
};

export default {
  parseDataExpression,
  parseDataSubexpression,
  getDataForShapeGeneration,
};
