import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import getNameHeadersForThirdLevel from "../utils/getNameHeadersForThirdLevel";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getThirdLevelModelView from "../utils/getThirdLevelModelView";
import getNameHeadersFromSecondLevelForThirdLevel from "../utils/getNameHeadersFromSecondLevelForThirdLevel";

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

    const showTopNameHeaders =
      thirdLevelShape.type === "row" || thirdLevelShape.type === "matrix";
    const showSideNameHeaders =
      thirdLevelShape.type === "column" || thirdLevelShape.type === "matrix";

    const content = getThirdLevelModelView(thirdLevelShape);

    return (
      <div className="">
        {thirdLevelShape && (
          <div>
            <div className="row py-2">
              <div className="col-3 px-0"></div>
              <div className="col-9 px-0">{topHeaderFromFirstLevel}</div>
            </div>
            {showTopNameHeaders && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex text-success">
                  {Array.isArray(fromSecondLevelTopName)
                    ? fromSecondLevelTopName.join(" ")
                    : fromSecondLevelTopName}
                </div>
              </div>
            )}
            {showTopNameHeaders && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex">{topNameHeaders}</div>
              </div>
            )}
            <div className="row">
              <div className="col-3 px-0 d-flex align-items-start justify-content-center text-center">
                <div className="w-50 ml-3 mt-4">
                  {sideHeaderFromFirstLevel}
                  {showSideNameHeaders && (
                    <p className="text-success">{fromSecondLevelSideName}</p>
                  )}
                </div>
                {showSideNameHeaders && (
                  <div className="w-50">
                    <div className="d-flex flex-column align-items-end">
                      {sideNameHeaders}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-9 px-0 d-flex justify-content-start">
                {content}
              </div>
            </div>
          </div>
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
