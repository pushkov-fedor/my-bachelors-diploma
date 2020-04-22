import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { InputK } from "../InputK/InputK";
import { TopHeader } from "./TopHeader";
import getView from "../../utils/getFirstLevelView";

export const FirstLevel = inject("rootStore")(
  observer((props) => {
    const { firstLevel, secondLevel } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const content = firstLevelData.map(({ column, data }) => {
      const columnContent =
        data.map((dataItem, row) => (
          <div
            key={`cell${column}:${row}`}
            className="border d-flex justify-content-center align-items-center f-cell"
            style={{ width: "150px", height: "100px" }}
            onClick={() => {
              secondLevel.setSelected([column, row]);
            }}
          >
            {getView(column, dataItem)}
          </div>
        )) || [];
      return (
        <div className="d-flex flex-column" key={`column${column}`}>
          {columnContent}
        </div>
      );
    });
    return (
      <div>
        <InputK />
        <button
          className="btn btn-primary mb-2"
          onClick={() => props.setShowFullSecondLevelTable((prev) => !prev)}
        >
          Показать весь второй уровень
        </button>
        <TopHeader />
        <div className="d-flex noselect" style={{ cursor: "pointer" }}>
          {content}
        </div>
      </div>
    );
  })
);
