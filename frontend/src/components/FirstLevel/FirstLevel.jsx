import React, { useState, useEffect } from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { TopHeader } from "./TopHeader";
import { SideHeader } from "./SideHeader";
import { Names } from "../Names";
import getShapeView from "../../utils/getShapeView";
import modelStructureGenerator from "../../utils/modelStructureGenerator";
import {
  parseFirstLevelDataDataNamesInput,
  firstLevelDataDataNamesArrayToString,
} from "../../utils/ExpParser";

export const FirstLevel = inject("rootStore")(
  observer((props) => {
    const { firstLevel, secondLevel, uiStore } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const [displayTooltip, setDisplayTooltip] = useState(null);

    const content = firstLevelData.map(({ column, data }) => {
      const columnContent =
        data.map((dataItem, row) => (
          <div
            className="position-relative"
            onMouseEnter={() => {
              if (dataItem.names !== undefined) setDisplayTooltip(dataItem.id);
            }}
            onMouseLeave={() => setDisplayTooltip(null)}
          >
            <div
              key={`cell${column}:${row}`}
              className="border d-flex flex-column justify-content-center align-items-center f-cell"
              style={{ width: "150px", height: "100px" }}
              onClick={(e) => {
                if (dataItem.shape) {
                  uiStore.setCurrentLevel(2);
                  secondLevel.setCurrentSecondLevelShapeObject(
                    dataItem.shape[0]
                  );
                }
              }}
            >
              {`${dataItem.id}${
                dataItem.names && dataItem.names.length !== 0
                  ? `(${firstLevelDataDataNamesArrayToString(dataItem.names)})`
                  : ""
              }`}
              {dataItem.names !== undefined && (
                <input
                  type="text"
                  className="first-level-item-input border px-1"
                  style={{ width: "90%" }}
                  placeholder="Размерность"
                  onChange={(e) => {
                    firstLevel.updateFirstLevelDataDataField(
                      column,
                      row,
                      "rawNames",
                      e.target.value
                    );
                  }}
                  value={dataItem.rawNames}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            <div
              className={`animate__animated animate__fadeInRight animate__faster position-absolute p-3 ${
                displayTooltip === dataItem.id ? "d-block" : "d-none"
              }`}
              style={{
                top: "-30px",
                right: "-260px",
                height: "150px",
                width: "250px",
                zIndex: 100,
                borderRadius: "5px",
                backgroundColor: "rgba(255,255,255,.9)",
                color: "black",
                border: "1px solid rgba(0,0,0,.4)",
                boxShadow: "0 4px 4px rgba(0,0,0,.15)",
              }}
              onMouseEnter={() => setDisplayTooltip(null)}
            >
              {dataItem.shape && getShapeView(dataItem.shape)}
            </div>
          </div>
        )) || [];
      return (
        <div className="d-flex flex-column" key={`column${column}`}>
          {columnContent}
        </div>
      );
    });
    return (
      <div style={{ transform: "scale(0.95)" }}>
        <Names noButton />
        {/* <button
          className="btn btn-primary mb-2"
          onClick={() => props.setShowFullSecondLevelTable((prev) => !prev)}
        >
          Показать весь второй уровень
        </button> */}
        <TopHeader />
        <div className="d-flex">
          <SideHeader />
          <div
            className="d-flex noselect"
            style={{ cursor: "pointer", fontSize: "20px" }}
          >
            {content}
          </div>
        </div>
      </div>
    );
  })
);
