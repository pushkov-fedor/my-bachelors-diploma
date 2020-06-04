import React, { useState } from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { Names } from "../Names";
import getShapeView from "../../utils/getShapeView";
import { firstLevelDataDataNamesArrayToString } from "../../utils/ExpParser";
import translateDataFromColsToRows from "../../utils/translateDataFromColsToRows";
import combineDataWithHeaders from "../../utils/combineDataWithHeaders";
import getDataItemFromMatrixByIndex from "../../utils/getDataItemFromMatrixByIndex";
import ReactDataSheet from "react-datasheet";

export const FirstLevel = inject("rootStore")(
  observer((props) => {
    const { firstLevel, upperLevel, uiStore } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const data = translateDataFromColsToRows(firstLevelData);
    const topHeaders = firstLevelData.map(({ title }) => title);
    const sideHeaders = [
      "",
      "",
      "Объём потребления",
      "Границы",
      "Границы",
      "Границы",
    ];
    const result = combineDataWithHeaders(data, topHeaders, sideHeaders);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipXY, setTooltipXY] = useState(["0", "0"]);
    const [tooltipContent, setTooltipContent] = useState(null);
    setTimeout(
      () =>
        Array.from(document.getElementsByClassName("cell")).forEach(
          (el, index) => {
            el.addEventListener("mouseleave", () => setShowTooltip(false));
            el.addEventListener("click", (event) => {
              if (event.ctrlKey) {
                const dataItem = getDataItemFromMatrixByIndex(result, index);
                dataItem && console.log(dataItem);
                if (dataItem && dataItem.shape) {
                  upperLevel.setCurrentFirstLevelDataObject(dataItem);
                  const [col, row] = firstLevel.getColAndRowByDataItem(
                    dataItem
                  );
                  upperLevel.setFirstLevelColAndRow(col, row);
                  uiStore.setCurrentLevel(2);
                }
              }
            });
          }
        ),
      500
    );
    return (
      <div className="position-relative">
        <Names noButton />
        <ReactDataSheet
          data={result}
          valueRenderer={(dataItem) =>
            `${dataItem.id}${
              dataItem.names && dataItem.names.length !== 0
                ? `(${firstLevelDataDataNamesArrayToString(dataItem.names)})`
                : ""
            }`
          }
          onCellsChanged={(changes) => {
            const { value, row, col } = changes[0];
            firstLevel.updateFirstLevelDataDataField(
              col - 1,
              row - 1,
              "rawNames",
              value
            );
          }}
          onContextMenu={(event, cell, i, j) => {
            event.preventDefault();
            setTooltipContent(cell.shape && getShapeView(cell.shape));
            setTooltipXY([event.clientX, event.clientY - 50]);
            setShowTooltip(true);
          }}
          dataRenderer={(dataItem) => dataItem.rawNames}
          overflow={"wrap"}
        />
        {showTooltip && (
          <div
            className={`animate__animated animate__fadeInRight animate__faster position-absolute p-3`}
            style={{
              top: tooltipXY[1],
              left: tooltipXY[0],
              height: "150px",
              width: "250px",
              zIndex: 100,
              borderRadius: "5px",
              backgroundColor: "rgba(255,255,255,.9)",
              color: "black",
              border: "1px solid rgba(0,0,0,.4)",
              boxShadow: "0 4px 4px rgba(0,0,0,.15)",
            }}
          >
            {tooltipContent}
          </div>
        )}
      </div>
    );
  })
);
