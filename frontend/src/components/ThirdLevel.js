import React, { useState, cloneElement } from "react";
import { inject, observer } from "mobx-react";
import { toJS, set } from "mobx";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import getNameHeadersForThirdLevel from "../utils/getNameHeadersForThirdLevel";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getThirdLevelModelView from "../utils/getThirdLevelModelView";
import getNameHeadersFromSecondLevelForThirdLevel from "../utils/getNameHeadersFromSecondLevelForThirdLevel";
import ReactDataSheet from "react-datasheet";
import { combineDataWithHeaders } from "../utils/thirdLevel";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const firstLevelCol = upperLevel.firstLevelCol.get();
    const firstLevelRow = upperLevel.firstLevelRow.get();

    const secondLevelCol = upperLevel.secondLevelCol.get();
    const secondLevelRow = upperLevel.secondLevelRow.get();

    const thirdLevelShape = firstLevelDataObject.shape[1];
    const topShapeObject =
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].shape[0]
        .data;

    const namesArr = toJS(names.names);
    const secondLevelNamesListId = firstLevelData[firstLevelCol].data[
      firstLevelCol === 0 ? 1 : 0
    ].names[0].split("<")[0];
    const thirdLevelNamesListId = parseFirstLevelDataNamesFilter(
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].names[1]
    );

    const [
      fromSecondLevelSideName,
      fromSecondLevelTopName,
    ] = getNameHeadersFromSecondLevelForThirdLevel(
      namesArr,
      topShapeObject,
      secondLevelNamesListId,
      secondLevelRow,
      secondLevelCol
    );

    const [sideNameHeaders, topNameHeaders] = getNameHeadersForThirdLevel(
      namesArr,
      thirdLevelNamesListId
    );

    const [
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    ] = getCurrentHeadersFomFirstLevel(
      firstLevelRow,
      firstLevelCol,
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

    const showTopNameHeaders =
      thirdLevelShape.type === "row" || thirdLevelShape.type === "matrix";
    const showSideNameHeaders =
      thirdLevelShape.type === "column" || thirdLevelShape.type === "matrix";

    const currentThirdLevelModel = toJS(upperLevel.currentThirdLevelModel)[0];
    const content = getThirdLevelModelView(currentThirdLevelModel);

    const [textAreaValue, setTextAreaValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const thirdLevelRowForEdit = upperLevel.thirdLevelRowForEdit.get();
    const thirdLevelColForEdit = upperLevel.thirdLevelColForEdit.get();

    return (
      <div className="">
        {thirdLevelShape && (
          <ReactDataSheet
            data={result}
            valueRenderer={(cell) => cell.value}
            overflow={"wrap"}
          />
        )}
        {!thirdLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
