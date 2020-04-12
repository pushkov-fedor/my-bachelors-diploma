import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const TopHeader = inject("rootStore")(
  observer((props) => {
    const { firstLevel } = props.rootStore;
    const firstLevelData = toJS(firstLevel.firstLevelData);
    const updateFirstLevelDataColumnType =
      firstLevel.updateFirstLevelDataColumnType;
    const headers = firstLevelData.map(({ column, title, type }) => {
      return (
        <div
          style={{ minWidth: "150px", maxWidth: "150px" }}
          className="d-flex flex-column justify-content-end border"
        >
          <p>{title}</p>
          <div className="input-group d-flex flex-column border-top p-1">
            <label htmlFor="columnType" className="border-bottom mb-0">
              Тип столбца
            </label>
            <select
              className="custom-select border-0 bg-light m-0"
              id="columnType"
              value={type}
              onChange={(e) =>
                updateFirstLevelDataColumnType(column, e.target.value)
              }
            >
              <option value="Standart">Стандартный</option>
              <option value="Transport">Транспортный</option>
            </select>
          </div>
        </div>
      );
    });
    return <div className="d-flex">{headers}</div>;
  })
);
