import React, { useState } from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { InputK } from "../InputK/InputK";
import { TopHeader } from "./TopHeader";
import { SideHeader } from "./SideHeader";
import getView from "../../utils/getFirstLevelView";
import {
  parseFirstLevelDataDataNamesInput,
  firstLevelDataDataNamesArrayToString,
} from "../../utils/ExpParser";

export const FirstLevel = inject("rootStore")(
  observer((props) => {
    const { firstLevel, secondLevel } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    console.log(
      firstLevelDataDataNamesArrayToString(firstLevelData[0].data[1].names)
    );

    const content = firstLevelData.map(({ column, data }) => {
      const columnContent =
        data.map((dataItem, row) => (
          <div
            key={`cell${column}:${row}`}
            className="border d-flex flex-column justify-content-center align-items-center f-cell"
            style={{ width: "150px", height: "100px" }}
            // onClick={() => {
            //   secondLevel.setSelected([column, row]);
            // }}
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
                placeholder="Задайте имена"
                onChange={(e) => {
                  firstLevel.updateFirstLevelDataDataField(
                    column,
                    dataItem.id,
                    "names",
                    parseFirstLevelDataDataNamesInput(e.target.value)
                  );
                }}
              />
            )}
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
        <InputK />
        <button
          className="btn btn-primary mb-2"
          onClick={() => props.setShowFullSecondLevelTable((prev) => !prev)}
        >
          Показать весь второй уровень
        </button>
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
