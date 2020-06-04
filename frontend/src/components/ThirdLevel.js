import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ReactDataSheet from "react-datasheet";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel } = props.rootStore;

    const [thirdLevelData] = toJS(upperLevel.thirdLevelData);
    const { data, headers } = thirdLevelData;
    const {
      showTopNameHeaders,
      showSideNameHeaders,
      fromSecondLevelSideName,
      fromSecondLevelTopName,
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    } = headers;

    return (
      <div className="">
        {showTopNameHeaders && (
          <div className="row">
            <div className="col-1"></div>
            <div className="col-11">
              {topHeaderFromFirstLevel}
              <br />
              <span className="text-success">{fromSecondLevelTopName}</span>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-1 text-center">
            {showSideNameHeaders && (
              <div>
                {sideHeaderFromFirstLevel}
                <br />
                <span className="text-success">{fromSecondLevelSideName}</span>
              </div>
            )}
          </div>
          <div className="col-11">
            <ReactDataSheet
              data={data}
              valueRenderer={(cell) => cell.value}
              overflow={"wrap"}
              onCellsChanged={(changes) => {
                const [first] = changes;
                const { row, col, value } = first;
                upperLevel.updateThirdLevelDataData(row, col, value);
              }}
            />
          </div>
        </div>
      </div>
    );
  })
);
