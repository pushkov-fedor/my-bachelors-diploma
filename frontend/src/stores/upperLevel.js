import { observable, action, when, toJS, reaction, autorun } from "mobx";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getNameHeadersFromSecondLevelForThirdLevel from "../utils/getNameHeadersFromSecondLevelForThirdLevel";
import { combineDataWithHeaders } from "../utils/thirdLevel";
import { names } from "./names";
import { firstLevelData as firstLevelDataArr } from "./firstLevel";

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

export const thirdLevelData = observable([]);
export const setThirdLevelData = action((data) => {
  thirdLevelData.pop();
  thirdLevelData.push(data);
});

export const updateThirdLevelDataData = action((row, col, value) => {
  const [thirdLevelDataObject] = toJS(thirdLevelData);
  const { data } = thirdLevelDataObject;
  data[row][col].value = value;
  setThirdLevelData(thirdLevelDataObject);
});

reaction(
  () => [secondLevelCol.get(), secondLevelRow.get()],
  ([secondLevelCol, secondLevelRow]) => {
    const firstLevelData = toJS(firstLevelDataArr);
    const currentFirstLevelDataObjectCopy = toJS(currentFirstLevelDataObject);

    const [firstLevelDataObject] = currentFirstLevelDataObjectCopy;

    const firstLevelColValue = firstLevelCol.get();
    const firstLevelRowValue = firstLevelRow.get();

    const secondLevelColValue = secondLevelCol;
    const secondLevelRowValue = secondLevelRow;

    const thirdLevelShape = firstLevelDataObject.shape[1];
    const topShapeObject =
      firstLevelData[firstLevelColValue].data[firstLevelColValue === 0 ? 1 : 0]
        .shape[0].data;

    const namesArr = toJS(names);
    const secondLevelNamesListId = firstLevelData[firstLevelColValue].data[
      firstLevelColValue === 0 ? 1 : 0
    ].names[0].split("<")[0];
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
};
