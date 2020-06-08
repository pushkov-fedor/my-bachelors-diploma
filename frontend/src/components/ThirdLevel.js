import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ReactDataSheet from "react-datasheet";
import { NavigationCircle } from "./NavigationCircle";
import { SelectAllButton } from "./SelectAllButton";

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

    const [selected, setSelected] = useState({
      start: null,
      end: null,
    });

    const selectAll = () => {
      const end = { i: data.length - 1, j: data[0].length - 1 };
      const start = {
        i: showTopNameHeaders ? 1 : 0,
        j: showSideNameHeaders ? 1 : 0,
      };
      setSelected({ start, end });
    };

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
                upperLevel.updateThirdLevelDataData(changes);
              }}
              parsePaste={(paste) => {
                return paste
                  .split("\n")
                  .filter((row) => row !== "")
                  .map((row) => row.split("\t"));
              }}
              selected={selected}
              onSelect={(selected) => setSelected(selected)}
            />
          </div>
        </div>
        <NavigationCircle />
        <SelectAllButton selectAll={selectAll} />
      </div>
    );
  })
);
