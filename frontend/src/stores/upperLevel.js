import { observable, action, when, toJS, reaction, autorun } from "mobx";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getNameHeadersFromSecondLevelForThirdLevel from "../utils/getNameHeadersFromSecondLevelForThirdLevel";
import { combineDataWithHeaders, getDataHeaders } from "../utils/thirdLevel";
import { names } from "./names";
import { currentLevel } from "./uiStore";
import { firstLevelData as firstLevelDataArr } from "./firstLevel";
import { splitTransportExpr } from "../utils/secondLevel";

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

export const modelData = observable([]);
export const setModelData = action((data) => {
  while (modelData.length > 0) modelData.pop();
  data.forEach((data) => modelData.push(data));
});
export const saveModelInStorage = (model) => {
  const firstLevelColValue = firstLevelCol.get();
  const firstLevelRowValue = firstLevelRow.get();
  const secondLevelColValue = secondLevelCol.get();
  const secondLevelRowValue = secondLevelRow.get();
  const copy = toJS(modelData);

  const currentIndex = copy.findIndex(
    ({ firstLevelCol, firstLevelRow, secondLevelCol, secondLevelRow }) =>
      firstLevelCol === firstLevelColValue &&
      firstLevelRow === firstLevelRowValue &&
      secondLevelCol === secondLevelColValue &&
      secondLevelRow === secondLevelRowValue
  );
  if (currentIndex !== -1) {
    copy[currentIndex] = model;
  } else {
    copy.push(model);
  }
  setModelData(copy);
  localStorage.setItem("modelData", JSON.stringify(copy));
};
when(
  () => modelData.length === 0,
  () => {
    const modelDataFromStorage = JSON.parse(localStorage.getItem("modelData"));
    if (modelDataFromStorage) setModelData(modelDataFromStorage);
  }
);

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

export const secondLevelData = observable([]);
export const setSecondLevelData = action((data) => {
  secondLevelData.pop();
  secondLevelData.push(data);
});

export const thirdLevelData = observable([]);
export const setThirdLevelData = action((data) => {
  thirdLevelData.pop();
  thirdLevelData.push(data);
});

export const updateThirdLevelDataData = action((changes) => {
  const [thirdLevelDataObject] = toJS(thirdLevelData);
  const { data } = thirdLevelDataObject;
  changes.forEach((change) => {
    const { row, col, value } = change;
    data[row][col].value = value;
  });
  setThirdLevelData(thirdLevelDataObject);
  saveModelInStorage(thirdLevelDataObject);
});

reaction(
  () => [
    firstLevelCol.get(),
    firstLevelRow.get(),
    secondLevelCol.get(),
    secondLevelRow.get(),
    currentLevel.get(),
  ],
  ([
    firstLevelCol,
    firstLevelRow,
    secondLevelCol,
    secondLevelRow,
    currentLevel,
  ]) => {
    if (currentLevel === 1) return;
    const firstLevelData = toJS(firstLevelDataArr);
    const currentFirstLevelDataObjectCopy = toJS(currentFirstLevelDataObject);

    const [firstLevelDataObject] = currentFirstLevelDataObjectCopy;

    const firstLevelColValue = firstLevelCol;
    const firstLevelRowValue = firstLevelRow;

    const secondLevelColValue = secondLevelCol;
    const secondLevelRowValue = secondLevelRow;

    const modelDataFromStorage = toJS(modelData);

    const thirdLevelModel = modelDataFromStorage.find(
      ({ firstLevelCol, firstLevelRow, secondLevelCol, secondLevelRow }) =>
        firstLevelCol === firstLevelColValue &&
        firstLevelRow === firstLevelRowValue &&
        secondLevelCol === secondLevelColValue &&
        secondLevelRow === secondLevelRowValue
    );
    if (thirdLevelModel) {
      setThirdLevelData(thirdLevelModel);
      return;
    }

    const thirdLevelShape = firstLevelDataObject.shape[1];
    const topShapeObject =
      firstLevelData[firstLevelColValue].data[firstLevelColValue === 0 ? 1 : 0]
        .shape[0].data;

    const namesArr = toJS(names);
    const secondLevelNamesListId = splitTransportExpr(
      firstLevelData[firstLevelColValue].data[firstLevelColValue === 0 ? 1 : 0]
        .names[0]
    )[0];
    const thirdLevelNamesListId = parseFirstLevelDataNamesFilter(
      firstLevelData[firstLevelColValue].data[firstLevelColValue === 0 ? 1 : 0]
        .names[1]
    );

    const showTopNameHeaders =
      thirdLevelShape.type === "row" || thirdLevelShape.type === "matrix";
    const showSideNameHeaders =
      thirdLevelShape.type === "column" || thirdLevelShape.type === "matrix";

    const [
      fromSecondLevelSideName,
      fromSecondLevelTopName,
    ] = getNameHeadersFromSecondLevelForThirdLevel(
      namesArr,
      topShapeObject,
      secondLevelNamesListId,
      secondLevelRowValue,
      secondLevelColValue
    );
    const [
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    ] = getCurrentHeadersFomFirstLevel(
      firstLevelRowValue,
      firstLevelColValue,
      firstLevelData
    );

    const data =
      thirdLevelShape.type === "matrix"
        ? thirdLevelShape.data.map((row) =>
            row.map(({ i, j }) => ({ value: "" }))
          )
        : thirdLevelShape.type === "row"
        ? [thirdLevelShape.data.map(({ i, j }) => ({ value: "" }))]
        : thirdLevelShape.data.map(({ i, j }) => [{ value: "" }]);

    const result = combineDataWithHeaders(
      data,
      namesArr,
      thirdLevelNamesListId,
      thirdLevelShape.type
    );

    setThirdLevelData({
      firstLevelCol: firstLevelColValue,
      firstLevelRow: firstLevelRowValue,
      secondLevelCol: secondLevelColValue,
      secondLevelRow: secondLevelRowValue,
      data: result,
      headers: {
        showTopNameHeaders,
        showSideNameHeaders,
        fromSecondLevelSideName,
        fromSecondLevelTopName,
        sideHeaderFromFirstLevel,
        topHeaderFromFirstLevel,
      },
    });
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
  thirdLevelColForEdit,
  thirdLevelRowForEdit,
  setThirdLevelRowAndColForEdit,
  thirdLevelData,
  updateThirdLevelDataData,
  secondLevelData,
  setSecondLevelData,
};
