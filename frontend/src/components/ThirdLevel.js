import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const thirdLevelShape = firstLevelDataObject.shape[1];
    const col = upperLevel.firstLevelCol.get();
    const row = upperLevel.firstLevelRow.get();
    const regions = toJS(upperLevel.currentRegions);

    const namesArr = toJS(names.names);
    const secondLevelNamesListId = firstLevelData[col].data[0].names[0].split(
      "<"
    )[0];

    const { names: listNames = [], listName = "" } =
      namesArr.find((r) => r.listId === secondLevelNamesListId) || {};

    let currentRegions = regions.map(
      (region) => listNames[Number(region) - 1][0]
    );

    console.log(namesArr);

    const sideHeaders = [
      "",
      "Объём потребления",
      "Границы",
      "Границы",
      "Границы",
    ];
    const topHeaders = firstLevelData.map(({ title }) => title);

    let content;
    if (thirdLevelShape) {
      switch (thirdLevelShape.type) {
        case "column":
          content = (
            <div className="d-flex flex-column">
              {thirdLevelShape.data.map((item) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "75px", height: "50px" }}
                >
                  {}
                </div>
              ))}
            </div>
          );
          break;
        case "row":
          content = (
            <div className="d-flex">
              {thirdLevelShape.data.map((item) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "75px", height: "50px" }}
                >
                  {}
                </div>
              ))}
            </div>
          );
          break;
        case "matrix":
          content = (
            <div className="d-flex flex-column">
              {thirdLevelShape.data.map((item) => (
                <div className="d-flex">
                  {item.map((item) => (
                    <div
                      className="border d-flex align-items-center justify-content-center"
                      style={{ width: "75px", height: "50px" }}
                    >
                      {}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
          break;
      }
    }
    return (
      <div className="px-5" style={{ overflowX: "auto" }}>
        {thirdLevelShape && (
          <div>
            <div className="py-2">
              {listName}:{" "}
              <span className="text-success">{currentRegions.join("; ")}</span>
            </div>
            <div className="row py-2">
              <div className="col-2"></div>
              <div className="col-10 px-4">{topHeaders[col]}</div>
            </div>
            <div className="row">
              <div className="col-2 d-flex align-items-start justify-content-center text-center">
                {sideHeaders[row]}
              </div>
              <div className="col-10 d-flex justify-content-start">
                {content}
              </div>
            </div>
          </div>
        )}
        {!thirdLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
