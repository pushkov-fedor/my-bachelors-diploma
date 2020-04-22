import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import getView from "../utils/getSecondLevelView";

const bgLightGray = { backgroundColor: "rgba(0,0,0,.05)" };
const cursorPointer = { cursor: "pointer" };

export const SecondLevelItem = inject("rootStore")(
  observer((props) => {
    const { secondLevel, thirdLevel } = props.rootStore;

    const data = toJS(secondLevel.data);
    const [column = 0, row = 0] = toJS(secondLevel.selected);

    const item = data[column][row];
    const view = getView(item);
    const leftView = column === 0 ? "" : getView(data[0][row]);
    const topView = row === 0 ? "" : getView(data[column][0]);
    const cornerView = row === 0 || column === 0 ? "" : getView(data[0][0]);

    return (
      <div className="mt-2">
        <div className="d-flex">
          <div className="noselect" style={bgLightGray}>
            {cornerView}
          </div>
          <div className="noselect" style={bgLightGray}>
            {topView}
          </div>
        </div>
        <div className="d-flex">
          <div className="noselect" style={bgLightGray}>
            {leftView}
          </div>
          <div
            style={cursorPointer}
            onClick={(e) => thirdLevel.setSelected(e.target.innerHTML)}
          >
            {column + row !== 0 && view}
          </div>
        </div>
      </div>
    );
  })
);
