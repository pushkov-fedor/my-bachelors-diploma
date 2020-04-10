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

const k = observable.box("");
const setK = action((value) => {
  if (value === "" || value > 0) {
    k.set(value);
  }
});

const transportPairs = computed(() => {
  const pairs = [];
  if (k.get() === "") return pairs;
  for (let i = 1; i <= k.get(); i++) {
    for (let j = i + 1; j <= k.get(); j++) {
      pairs.push({ i, j });
    }
  }
  return pairs;
});

const firstLevelData = observable([
  {
    column: 1,
    title: "",
    type: "Standart",
    data: [
      { id: "", type: "empty" },
      { id: Y, type: "column" },
      { id: LESS, type: "row" },
      { id: OVER, type: "row" },
      { id: EQUAL, type: "row" },
    ],
  },
  {
    column: 2,
    title: "Объём производства внутри регионов",
    type: "Standart",
    data: [
      { id: X, type: "row" },
      { id: A, type: "matrix" },
      { id: XU, type: "row" },
      { id: XL, type: "row" },
      { id: XE, type: "row" },
    ],
  },
  {
    column: 3,
    title: "Конечное потребление",
    type: "Standart",
    data: [
      { id: Z, type: "single" },
      { id: P, type: "column" },
      { id: ZU, type: "row" },
      { id: ZL, type: "row" },

      { id: ZE, type: "row" },
    ],
  },
  {
    column: 4,
    title: "Межрегиональный ввоз/вывоз",
    type: "Transport",
    data: [
      { id: T, type: "row" },
      { id: B, type: "matrix" },
      { id: TU, type: "row" },
      { id: TL, type: "row" },
      { id: TE, type: "row" },
    ],
  },
  {
    column: 5,
    title: "Импорт",
    type: "Standart",
    data: [
      { id: I, type: "row" },
      { id: C, type: "matrix" },
      { id: IU, type: "row" },
      { id: IL, type: "row" },
      { id: IE, type: "row" },
    ],
  },
  {
    column: 6,
    title: "Экспорт",
    type: "Standart",
    data: [
      { id: E, type: "row" },
      { id: D, type: "matrix" },
      { id: EU, type: "row" },
      { id: EL, type: "row" },
      { id: EE, type: "row" },
    ],
  },
  {
    column: 7,
    title: "Ограничения",
    type: "Standart",
    data: [
      [
        { id: LEO, type: "column" },
        { id: "", type: "hidden" },
      ],
      [
        { id: S, type: "column" },
        { id: R, type: "column" },
      ],
    ],
  },
]);

const setFirstLevelData = action((data) => {
  while (firstLevelData.length > 0) firstLevelData.pop();
  data.forEach((d) => firstLevelData.push(d));
});

const updateFirstLevelDataColumnType = (column, type) => {
  const copy = toJS(firstLevelData).slice();
  const toUpdate = copy.find((col) => col.column === column);
  if (toUpdate === undefined) return;
  toUpdate.type = type;
  setFirstLevelData(copy);
};

const getFirstLevelDataColumn = (column) => {
  return toJS(firstLevelData).find((c) => c.column === column) || {};
};

const getView = (column, { id, type }) => {
  const end = k.get();
  let view = "";
  if (end !== "") {
    const { type: columnType } = getFirstLevelDataColumn(column);
    switch (type) {
      case "row":
        if (columnType === "Transport") {
          const pairs = transportPairs.get();
          view = `${id}:1-${pairs.length}`;
        } else {
          view = `${id}:1-${end}`;
        }
        break;
      case "column":
        view = `${id}:1|${end}`;
        break;
      case "single":
        view = `${id}`;
        break;
      case "matrix":
        if (columnType === "Transport") {
          const pairs = transportPairs.get();
          view = `${id}:1-${pairs.length}:1|${pairs.length}`;
        } else {
          view = `${id}:1-${end}:1|${end}`;
        }
        break;
    }
  } else {
    view = id;
  }
  return view;
};

export const modelStore = {
  k,
  setK,
  transportPairs,
  firstLevelData,
  setFirstLevelData,
  updateFirstLevelDataColumnType,
  getFirstLevelDataColumn,
  getView,
};
