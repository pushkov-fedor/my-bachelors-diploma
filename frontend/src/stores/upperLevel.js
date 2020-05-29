import { observable, action, when, toJS, reaction } from "mobx";
import { generateCurrentThirdLevelModelTemplate } from "../utils/upperLevelModelStrctureGenerator";

export const firstLevelCol = observable.box(-1);
export const firstLevelRow = observable.box(-1);

export const setFirstLevelColAndRow = action((col, row) => {
  firstLevelCol.set(col);
  firstLevelRow.set(row);
});

export const secondLevelCol = observable.box(-1);
export const secondLevelRow = observable.box(-1);

export const setSecondLevelColAndRow = action((col, row) => {
  secondLevelCol.set(col);
  secondLevelRow.set(row);
});

export const currentFirstLevelDataObject = observable([]);
export const setCurrentFirstLevelDataObject = action((current) => {
  while (currentFirstLevelDataObject.length > 0)
    currentFirstLevelDataObject.pop();
  currentFirstLevelDataObject.push(current);
});

export const currentRegions = observable([]);
export const setCurrentRegions = action((regions) => {
  while (currentRegions.length > 0) currentRegions.pop();
  regions.forEach((region) => currentRegions.push(region));
});

export const currentThirdLevelModel = observable([]);
export const setCurrentThirdLevelModel = action(([model]) => {
  currentThirdLevelModel.pop();
  currentThirdLevelModel.push(model);
});

export const updateThirdLevelModelByOne = (value, row, col) => {
  const { type, data } = toJS(currentThirdLevelModel)[0];
  if (row == "-1") {
    data[col] = value;
    setCurrentThirdLevelModel([{ type, data }]);
    return;
  }
  if (col == "-1") {
    data[row] = value;
    setCurrentThirdLevelModel([{ type, data }]);
    return;
  }
  data[row][col] = value;
  setCurrentThirdLevelModel([{ type, data }]);
};

export const updateThirdLevelModel = (rawInput) => {
  let parsed = rawInput.split("\n").map((row) => row.split("\t"));
  const { type, data } = toJS(currentThirdLevelModel)[0];
  const newData = [...data];
  switch (type) {
    case "column":
      const rowColLimitForCol = data.length;
      if (Array.isArray(parsed[0])) {
        for (let i = 0; i < parsed.length; i++) {
          if (i < rowColLimitForCol) {
            parsed[i] = parsed[i][0];
          } else break;
        }
      } else {
        parsed = [parsed[0]];
      }
      for (let i = 0; i < parsed.length; i++) {
        if (i < rowColLimitForCol) {
          newData[i] = parsed[i];
        } else break;
      }
      break;
    case "row":
      if (Array.isArray(parsed[0])) parsed = parsed[0];
      const rowColLimit = data.length;
      for (let i = 0; i < parsed.length; i++) {
        if (i < rowColLimit) {
          newData[i] = parsed[i];
        } else break;
      }
      break;
    case "matrix":
      const rowLimit = data.length;
      const colLimit = data[0].length;
      for (let i = 0; i < parsed.length; i++) {
        if (i < rowLimit) {
          for (let j = 0; j < parsed[i].length; j++) {
            if (j < colLimit) {
              newData[i][j] = parsed[i][j];
            } else break;
          }
        } else break;
      }
      break;
    default:
      break;
  }
  setCurrentThirdLevelModel([{ type, data: newData }]);
};

export const resetThirdLevelModel = () => {
  const thirdLevelShape = toJS(currentFirstLevelDataObject)[0].shape[1];
  const currentThirdLevelModel = generateCurrentThirdLevelModelTemplate(
    thirdLevelShape
  );
  setCurrentThirdLevelModel([currentThirdLevelModel]);
};

reaction(
  () => toJS(currentFirstLevelDataObject),
  (currentFirstLevelDataObject) => {
    const thirdLevelShape = currentFirstLevelDataObject[0].shape[1];
    const currentThirdLevelModel = generateCurrentThirdLevelModelTemplate(
      thirdLevelShape
    );
    setCurrentThirdLevelModel([currentThirdLevelModel]);
  }
);

const thirdLevelColForEdit = observable.box("");
const thirdLevelRowForEdit = observable.box("");
export const setThirdLevelRowAndColForEdit = action((row, col) => {
  thirdLevelRowForEdit.set(row);
  thirdLevelColForEdit.set(col);
});

export default {
  firstLevelCol,
  firstLevelRow,
  setFirstLevelColAndRow,
  secondLevelCol,
  secondLevelRow,
  setSecondLevelColAndRow,
  currentFirstLevelDataObject,
  setCurrentFirstLevelDataObject,
  currentRegions,
  setCurrentRegions,
  currentThirdLevelModel,
  updateThirdLevelModel,
  resetThirdLevelModel,
  thirdLevelColForEdit,
  thirdLevelRowForEdit,
  setThirdLevelRowAndColForEdit,
  updateThirdLevelModelByOne,
};
