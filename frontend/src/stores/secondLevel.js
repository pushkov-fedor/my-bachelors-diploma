import firstLevel from "./firstLevel";
import { observable, action, reaction, autorun, when, toJS } from "mobx";
import create2dArray from "../utils/create2dArray";

const { k, firstLevelData, transportPairs } = firstLevel;

const secondLevelData = observable([]);
const setSecondLevelData = action((data) => {
  while (secondLevelData.length > 0) secondLevelData.pop();
  data.forEach((d) => secondLevelData.push(d));
});

const getView = (columnType, d) => {
  const [start, end] = [1, Number(k.get())];
  const { id, type } = d;
  switch (type) {
    case "empty":
      return { id: "" };
    case "single":
      return { id: `${id}` };
    case "column":
      const col = create2dArray(end);
      for (let i = start - 1; i < end; i++) {
        col[i].push({
          id: `${id}${i + 1}`,
        });
      }
      return col;
    case "row":
      const row = create2dArray(1);
      switch (columnType) {
        case "Transport":
          const pairs = transportPairs.get();
          for (let i = 0; i < pairs.length; i++) {
            const { i: iT, j: jT } = pairs[i];
            row[0].push({ id: `${id}${iT}${jT}` });
          }
          break;
        default:
          for (let i = start; i <= end; i++) row[0].push({ id: `${id}${i}` });
      }
      return row;
    case "matrix":
      const matrix = create2dArray(end);
      switch (columnType) {
        case "Transport":
          const pairs = transportPairs.get();
          for (let i = start - 1; i < end; i++) {
            for (let j = start - 1; j < pairs.length; j++) {
              matrix[i].push({});
            }
          }
          pairs.forEach(({ i, j }) => {
            matrix[i - 1][j - 1] = { id: `${id}${i}${j}` };
            matrix[j - 1][i - 1] = { id: `${id}${j}${i}` };
          });
          return matrix;
        default:
          for (let i = start - 1; i < end; i++) {
            for (let j = start - 1; j < end; j++) {
              const data =
                i === j
                  ? {
                      id: `${id}:${i + 1}${j + 1}`,
                    }
                  : {};
              matrix[i].push(data);
            }
          }
          return matrix;
      }
  }
};

autorun(() => {
  const end = Number(k.get());
  if (end === 0) return;

  const firstLevelDataJS = toJS(firstLevelData);
  const secondLevelDataGenerated = firstLevelDataJS.map(
    ({ type: columnType, extended, data }) => {
      const secondLevelColumn = data.map((d) => {
        if (Array.isArray(d)) {
          const row = d.map((data) => getView(columnType, data));
          return row;
        } else {
          return getView(columnType, d);
        }
      });
      return { extended, data: secondLevelColumn };
    }
  );
  setSecondLevelData(secondLevelDataGenerated);
});

export default {
  secondLevelData,
};
