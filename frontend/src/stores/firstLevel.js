import { observable, action, autorun, reaction, toJS, computed } from "mobx";
import { firstLevelInputToSecondLevelStructure } from "../utils/ExpParser";
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
    names: "",
    extended: false,
    data: [
      { id: "", type: "empty" },
      { id: Y, type: "column" },
      { id: LESS, type: "single" },
      { id: OVER, type: "single" },
      { id: EQUAL, type: "single" },
    ],
  },
  {
    column: 1,
    title: "Объём производства внутри регионов",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: X, type: "row" },
      { id: A, type: "matrix" },
      { id: XU, type: "row" },
      { id: XL, type: "row" },
      { id: XE, type: "row" },
    ],
  },
  {
    column: 2,
    title: "Конечное потребление",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: Z, type: "single" },
      { id: P, type: "column" },
      { id: ZU, type: "single" },
      { id: ZL, type: "single" },
      { id: ZE, type: "single" },
    ],
  },
  {
    column: 3,
    title: "Межрегиональный ввоз/вывоз",
    type: "Transport",
    names: "",
    extended: false,
    data: [
      { id: T, type: "row" },
      { id: B, type: "matrix" },
      { id: TU, type: "row" },
      { id: TL, type: "row" },
      { id: TE, type: "row" },
    ],
  },
  {
    column: 4,
    title: "Импорт",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: I, type: "row" },
      { id: C, type: "matrix" },
      { id: IU, type: "row" },
      { id: IL, type: "row" },
      { id: IE, type: "row" },
    ],
  },
  {
    column: 5,
    title: "Экспорт",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: E, type: "row" },
      { id: D, type: "matrix" },
      { id: EU, type: "row" },
      { id: EL, type: "row" },
      { id: EE, type: "row" },
    ],
  },
  {
    column: 6,
    title: "Ограничения",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: LEO, type: "single" },
      { id: S, type: "column" },
    ],
  },
  {
    column: 7,
    title: "Ограничения",
    type: "Standart",
    names: "",
    extended: false,
    data: [
      { id: "", type: "empty" },
      { id: R, type: "column" },
    ],
  },
]);

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
};
