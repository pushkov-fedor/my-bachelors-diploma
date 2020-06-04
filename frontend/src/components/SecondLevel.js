import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import getNameHeadersForSecondLevel from "../utils/getNameHeadersForSecondLevel";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getSecondLevelModelView from "../utils/getSecondLevelModelView";
import {
  combineDataWithHeaders,
  getColRowByShapeItem,
} from "../utils/secondLevel";
import { isTransport } from "../utils/modelStructureGenerator";
import ReactDataSheet from "react-datasheet";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names, uiStore } = props.rootStore;
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

    const [
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    ] = getCurrentHeadersFomFirstLevel(row, col, firstLevelData);

    const data =
      secondLevelShape.type === "matrix"
        ? secondLevelShape.data.map((row) =>
            row.map(({ i, j }) => ({ value: i ? `${id}${i}${j}` : "", i, j }))
          )
        : secondLevelShape.type === "row"
        ? [
            secondLevelShape.data.map(({ i, j }) => ({
              value: `${id}${i}${j ? j : ""}`,
              i,
              j,
            })),
          ]
        : secondLevelShape.data.map(({ i, j }) => [
            { value: `${id}${i}${j ? j : ""}`, i, j },
          ]);
    const result = combineDataWithHeaders(
      data,
      listNames,
      topDataObject,
      secondLevelShape.type
    );

    setTimeout(() => {
      Array.from(document.getElementsByClassName("cell")).forEach((el, index) =>
        el.addEventListener("click", (event) => {
          if (event.ctrlKey) {
            const flat = result.flat();
            const shapeItem = flat[index];
            if (!shapeItem.i && !shapeItem.j) return;
            const { i, j } = shapeItem;
            const [col, row] = getColRowByShapeItem(data, shapeItem);

            upperLevel.setCurrentRegions(
              isTransport(topSecondLevelName).is ? [i, j] : [i]
            );
            upperLevel.setSecondLevelColAndRow(col, row);
            uiStore.setCurrentLevel(3);
          }
        })
      );
    }, 500);

    return (
      <div className="p-3">
        {secondLevelShape && (
          <div>
            <div className="row">
              <div className="col-1"></div>
              <div className="col-11">{topHeaderFromFirstLevel}</div>
            </div>
            <div className="row">
              <div className="col-1 text-center">
                {sideHeaderFromFirstLevel}
              </div>
              <div className="col-11">
                <ReactDataSheet
                  data={result}
                  valueRenderer={(cell) => cell.value}
                />
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
