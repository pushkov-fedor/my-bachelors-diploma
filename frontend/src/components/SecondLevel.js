import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import getNameHeadersForSecondLevel from "../utils/getNameHeadersForSecondLevel";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getSecondLevelModelView from "../utils/getSecondLevelModelView";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names } = props.rootStore;
    const firstLevelData = toJS(firstLevel.firstLevelData);
    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const namesArr = toJS(names.names);
    const col = upperLevel.firstLevelCol.get();
    const row = upperLevel.firstLevelRow.get();

    const { id } = firstLevelDataObject;
    const secondLevelShape = firstLevelDataObject.shape[0];

    const topSecondLevelName =
      firstLevelData[col].data[col === 0 ? 1 : 0].names[0];
    const topDataObject =
      firstLevelData[col].data[col === 0 ? 1 : 0].shape[0].data;
    const topSecondLevelNamesListId = topSecondLevelName.split("<")[0];

    const { names: listNames = [] } =
      namesArr.find((r) => r.listId === topSecondLevelNamesListId) || {};

    const [sideNameHeaders, topNameHeaders] = getNameHeadersForSecondLevel(
      listNames,
      topDataObject
    );

    const [
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    ] = getCurrentHeadersFomFirstLevel(row, col, firstLevelData);

    const content = getSecondLevelModelView(
      secondLevelShape,
      topSecondLevelName,
      id
    );

    const showTopNames =
      secondLevelShape.type === "row" || secondLevelShape.type === "matrix";
    const showLeftNames =
      secondLevelShape.type === "column" || secondLevelShape.type === "matrix";

    return (
      <div className="container">
        {secondLevelShape && (
          <div>
            <div className="row py-2">
              <div className="col-3 px-0"></div>
              <div className="col-9 px-0 px-4">{topHeaderFromFirstLevel}</div>
            </div>
            {showTopNames && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex">{topNameHeaders}</div>
              </div>
            )}
            <div className="row">
              <div className="col-3 px-0 d-flex align-items-start justify-content-center text-center">
                <div className="w-50">{sideHeaderFromFirstLevel}</div>
                {showLeftNames && (
                  <div className="w-50 d-flex flex-column align-items-end">
                    {sideNameHeaders}
                  </div>
                )}
              </div>
              <div className="col-9 px-0 d-flex justify-content-start">
                {content}
              </div>
            </div>
          </div>
        )}
        {!secondLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
