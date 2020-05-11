import { observable, action, autorun, reaction, toJS, computed } from "mobx";
import { names } from "./names";

import { generateShape } from "../utils/generateShape";
import getBound from "../utils/getBounds";

import modelStructureGenerator from "../utils/modelStructureGenerator";

import {
  X,
  Z,
  T,
  I,
  E,
  LEO,
  Y,
  A,
  P,
  B,
  C,
  D,
  S,
  R,
  LESS,
  XU,
  ZU,
  TU,
  IU,
  EU,
  OVER,
  XL,
  ZL,
  TL,
  IL,
  EL,
  EQUAL,
  XE,
  ZE,
  TE,
  IE,
  EE,
} from "../constants";
import getBounds from "../utils/getBounds";

export const k = observable.box("");
const setK = action((value) => {
  if (value === "" || value > 0) {
    k.set(value);
  }
});

export const transportPairs = computed(() => {
  if (k.get() === "") return [];
  const pairsMatrix = [];
  const pairs = [];
  for (let i = 1; i <= k.get(); i++) {
    for (let j = i + 1; j <= k.get(); j++) {
      pairs.push({ i, j });
    }
  }
  for (let i = 0; i < pairs.length; i++) {
    pairsMatrix.push([]);
    for (let j = 0; j < k.get(); j++) {
      pairsMatrix[i][j] = {};
    }
  }
  pairs.forEach((pair, index) => {
    const { i, j } = pair;
    // i,j=1...k, поэтому i - 1, j - 1
    pairsMatrix[index][i - 1] = { i, j: index + 1 };
    pairsMatrix[index][j - 1] = { i: j, j: index + 1 };
  });

  return pairsMatrix;
});

export const firstLevelData = observable([
  {
    column: 0,
    title: "",
    type: "Standart",
    extended: false,
    data: [
      { id: "", type: "empty" },
      { id: Y, type: "column", names: [] },
      { id: LESS, type: "single" },
      { id: OVER, type: "single" },
      { id: EQUAL, type: "single" },
    ],
  },
  {
    column: 1,
    title: "Объём производства внутри регионов",
    type: "Standart",
    extended: false,
    data: [
      { id: X, type: "row", names: [] },
      { id: A, type: "matrix", names: [] },
      { id: XU, type: "row", names: [] },
      { id: XL, type: "row", names: [] },
      { id: XE, type: "row", names: [] },
    ],
  },
  {
    column: 2,
    title: "Конечное потребление",
    type: "Standart",
    extended: false,
    data: [
      { id: Z, type: "single", names: [] },
      { id: P, type: "column", names: [] },
      { id: ZU, type: "single" },
      { id: ZL, type: "single" },
      { id: ZE, type: "single" },
    ],
  },
  {
    column: 3,
    title: "Межрегиональный ввоз/вывоз",
    type: "Transport",
    extended: false,
    data: [
      { id: T, type: "row", names: [] },
      { id: B, type: "matrix", names: [] },
      { id: TU, type: "row" },
      { id: TL, type: "row" },
      { id: TE, type: "row" },
    ],
  },
  {
    column: 4,
    title: "Импорт",
    type: "Standart",
    extended: false,
    data: [
      { id: I, type: "row", names: [] },
      { id: C, type: "matrix", names: [] },
      { id: IU, type: "row" },
      { id: IL, type: "row" },
      { id: IE, type: "row" },
    ],
  },
  {
    column: 5,
    title: "Экспорт",
    type: "Standart",
    extended: false,
    data: [
      { id: E, type: "row", names: [] },
      { id: D, type: "matrix", names: [] },
      { id: EU, type: "row" },
      { id: EL, type: "row" },
      { id: EE, type: "row" },
    ],
  },
  {
    column: 6,
    title: "Тип ограничения",
    type: "Standart",
    extended: false,
    data: [
      { id: LEO, type: "single" },
      { id: S, type: "column" },
    ],
  },
  {
    column: 7,
    title: "Знаки правых частей",
    type: "Standart",
    extended: false,
    data: [
      { id: "", type: "empty" },
      { id: R, type: "column" },
    ],
  },
]);

autorun(() => {
  const expr = "Y=T1|Y=T2;Y*T";
  const cellId = "A";
  const column = 1;
  const row = 1;
  const errors = [];

  let [second, third] = modelStructureGenerator.parseDataExpression(
    expr,
    errors
  );
  if (errors.length > 0) return;

  if (modelStructureGenerator.isBound(row, column)) {
    second = modelStructureGenerator.getDataForBorderShapeGeneration(
      second,
      row,
      column,
      toJS(names),
      errors
    );
    if (errors.length > 0) return;

    third = modelStructureGenerator.getDataForBorderShapeGeneration(
      third,
      row,
      column,
      toJS(names),
      errors
    );
    if (errors.length > 0) return;

    console.log("------------------");
    console.log(modelStructureGenerator.generateShape(second, cellId, errors));
    // console.log(third);
    console.log(errors);
    return;
  }

  second = modelStructureGenerator.parseDataSubexpression(second, errors);
  if (errors.length > 0) return;

  third = modelStructureGenerator.parseDataSubexpression(third, errors);
  if (errors.length > 0) return;

  second = modelStructureGenerator.getDataForShapeGeneration(
    2,
    second,
    toJS(firstLevelData),
    column,
    row,
    toJS(names),
    errors
  );
  if (errors.length > 0) return;

  third = modelStructureGenerator.getDataForShapeGeneration(
    3,
    third,
    toJS(firstLevelData),
    column,
    row,
    toJS(names),
    errors
  );
  if (errors.length > 0) return;

  console.log("------------------");
  console.log(modelStructureGenerator.generateShape(second, cellId, errors));
  console.log(modelStructureGenerator.generateShape(third, cellId, errors));
  console.log(errors);
});

const setFirstLevelData = action((data) => {
  while (firstLevelData.length > 0) firstLevelData.pop();
  data.forEach((d) => firstLevelData.push(d));
});
const updateFirstLevelDataField = (title, field, value) => {
  const copy = toJS(firstLevelData).slice();
  const toUpdate = copy.find((col) => col.title === title);
  if (toUpdate === undefined || toUpdate[field] === undefined) return;
  toUpdate[field] = value;
  setFirstLevelData(copy);
};
const updateFirstLevelDataDataField = (column, id, field, value) => {
  const copy = toJS(firstLevelData).slice();
  const toUpdate = copy.find((col) => col.column === column);
  if (toUpdate === undefined) return;
  const data = toUpdate.data.find((d) => d.id === id);
  if (data === undefined || data[field] === undefined) return;
  data[field] = value;
  setFirstLevelData(copy);
};
export const getFirstLevelDataColumn = (column) => {
  return toJS(firstLevelData).find((c) => c.column === column) || {};
};

export default {
  k,
  setK,
  transportPairs,
  firstLevelData,
  setFirstLevelData,
  updateFirstLevelDataField,
  updateFirstLevelDataDataField,
};
