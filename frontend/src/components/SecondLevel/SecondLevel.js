import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const getEl = (item) => {
  if (Array.isArray(item)) {
    // rows, cols and matrix
    const rows = item.map((item) => {
      const cols = item.map((item) => (
        <div
          style={{ width: "50px", height: "50px" }}
          className="d-flex justify-content-center align-items-center border"
        >
          {item.id}
        </div>
      ));
      return <div className="d-flex">{cols}</div>;
    });
    return <div className="d-flex flex-column">{rows}</div>;
  } else {
    // single and empty
    return (
      <div
        style={{ width: "50px", height: "50px" }}
        className="d-flex justify-content-center align-items-center border"
      >
        {item.id}
      </div>
    );
  }
};

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { secondLevel } = props.rootStore;
    const secondLevelData = toJS(secondLevel.secondLevelData);
    const cols = secondLevelData.map(({ extended, data: col }) => {
      if (extended) {
        const rows = col.map((item) => {
          const rows = item.map((rowCol) => getEl(rowCol));
          return <div className="d-flex">{rows}</div>;
        });
        return <div className="d-flex flex-column">{rows}</div>;
      } else {
        const block = col.map((rowCol) => getEl(rowCol));
        return <div className="d-flex flex-column">{block}</div>;
      }
    });
    return <div className="d-flex">{cols}</div>;
  })
);
