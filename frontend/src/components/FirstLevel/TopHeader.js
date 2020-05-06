import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const TopHeader = inject("rootStore")(
  observer((props) => {
    const { firstLevel } = props.rootStore;
    const firstLevelData = toJS(firstLevel.firstLevelData);
    firstLevelData.unshift({ column: "empty", title: "" });
    const headers = firstLevelData.map(({ column, title }) => {
      return (
        <div
          style={{
            minWidth: "150px",
            maxWidth: "150px",
          }}
          className="d-flex flex-column align-items-center justify-content-center border"
          key={`header${column}`}
        >
          <p className="text-center mb-0">{title}</p>
        </div>
      );
    });
    return <div className="d-flex">{headers}</div>;
  })
);
