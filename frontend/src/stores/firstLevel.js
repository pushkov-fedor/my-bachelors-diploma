import { observable, action, toJS, computed, when } from "mobx";
import lodash from "lodash";

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
      { id: "", type: "empty", readOnly: true },
      { id: Y, type: "column", names: [], rawNames: "", shape: null },
      { id: LESS, type: "single", readOnly: true },
      { id: OVER, type: "single", readOnly: true },
      { id: EQUAL, type: "single", readOnly: true },
    ],
  },
  {
    column: 1,
    title: "Объём производства внутри регионов",
    type: "Standart",
    extended: false,
    data: [
      { id: X, type: "row", names: [], rawNames: "", shape: null },
      { id: A, type: "matrix", names: [], rawNames: "", shape: null },
      { id: XU, type: "row", readOnly: true },
      { id: XL, type: "row", readOnly: true },
      { id: XE, type: "row", readOnly: true },
    ],
  },
  {
    column: 2,
    title: "Конечное потребление",
    type: "Standart",
    extended: false,
    data: [
      { id: Z, type: "single", names: [], rawNames: "", shape: null },
      { id: P, type: "column", names: [], rawNames: "", shape: null },
      { id: ZU, type: "single", readOnly: true },
      { id: ZL, type: "single", readOnly: true },
      { id: ZE, type: "single", readOnly: true },
    ],
  },
  {
    column: 3,
    title: "Межрегиональный ввоз/вывоз",
    type: "Transport",
    extended: false,
    data: [
      { id: T, type: "row", names: [], rawNames: "", shape: null },
      { id: B, type: "matrix", names: [], rawNames: "", shape: null },
      { id: TU, type: "row", readOnly: true },
      { id: TL, type: "row", readOnly: true },
      { id: TE, type: "row", readOnly: true },
    ],
  },
  {
    column: 4,
    title: "Импорт",
    type: "Standart",
    extended: false,
    data: [
      { id: I, type: "row", names: [], rawNames: "", shape: null },
      { id: C, type: "matrix", names: [], rawNames: "", shape: null },
      { id: IU, type: "row", readOnly: true },
      { id: IL, type: "row", readOnly: true },
      { id: IE, type: "row", readOnly: true },
    ],
  },
  {
    column: 5,
    title: "Экспорт",
    type: "Standart",
    extended: false,
    data: [
      { id: E, type: "row", names: [], rawNames: "", shape: null },
      { id: D, type: "matrix", names: [], rawNames: "", shape: null },
      { id: EU, type: "row", readOnly: true },
      { id: EL, type: "row", readOnly: true },
      { id: EE, type: "row", readOnly: true },
    ],
  },
  {
    column: 6,
    title: "Тип ограничения",
    type: "Standart",
    extended: false,
    data: [
      { id: LEO, type: "single", readOnly: true },
      { id: S, type: "column", readOnly: true },
    ],
  },
  {
    column: 7,
    title: "Знаки правых частей",
    type: "Standart",
    extended: false,
    data: [
      { id: "", type: "empty", readOnly: true },
      { id: R, type: "column", readOnly: true },
    ],
  },
]);

const setFirstLevelData = action((data) => {
  while (firstLevelData.length > 0) firstLevelData.pop();
  data.forEach((d) => firstLevelData.push(d));
  localStorage.setItem("firstLevelData", JSON.stringify(data));
});
const updateFirstLevelDataField = (title, field, value) => {
  const copy = toJS(firstLevelData).slice();
  const toUpdate = copy.find((col) => col.title === title);
  if (toUpdate === undefined || toUpdate[field] === undefined) return;
  toUpdate[field] = value;
  setFirstLevelData(copy);
};

export const calculateShape = (data, toUpdate, copy, row, column) => {
  data.shape = modelStructureGenerator.getShape(column, row);
  if ((row === 0 || (column === 0 && row === 1)) && data.shape) {
    toUpdate.data = toUpdate.data.map((d, index) =>
      d.names && index >= row
        ? d
        : Object.assign({}, d, {
            shape: [...data.shape],
          })
    );
  }
  setFirstLevelData(copy);
};

const throttled = lodash.throttle(calculateShape, 500);

const updateFirstLevelDataDataField = (column, row, field, value) => {
  console.log(column, row);
  const copy = toJS(firstLevelData).slice();
  const toUpdate = copy.find((col) => col.column === column);
  if (toUpdate === undefined) return;
  const data = toUpdate.data[row];
  console.log(data);
  if (data === undefined || data[field] === undefined) return;
  data[field] = value;
  if (field === "rawNames") {
    data.names = modelStructureGenerator.parseDataExpression(value);
  }
  setFirstLevelData(copy);
  if (field === "rawNames") {
    throttled(data, toUpdate, copy, row, column);
  }
};

export const recalculateShapes = () => {
  const data = toJS(firstLevelData).map((part) => {
    const newData = part.data.map((data, index) =>
      data.names
        ? Object.assign(data, {
            shape: modelStructureGenerator.getShape(part.column, index),
          })
        : data
    );
    return Object.assign(part, { data: newData });
  });
  setFirstLevelData(data);
};
export const getFirstLevelDataColumn = (column) => {
  return toJS(firstLevelData).find((c) => c.column === column) || {};
};

when(
  () => true,
  () => {
    const data = JSON.parse(localStorage.getItem("firstLevelData"));
    if (data) {
      setFirstLevelData(data);
    }
  }
);

export default {
  k,
  setK,
  transportPairs,
  firstLevelData,
  setFirstLevelData,
  updateFirstLevelDataField,
  updateFirstLevelDataDataField,
};
