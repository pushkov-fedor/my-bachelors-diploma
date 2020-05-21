import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isTransport } from "../utils/modelStructureGenerator";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, uiStore, firstLevel } = props.rootStore;
    const firstLevelData = toJS(firstLevel.firstLevelData);
    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const { id } = firstLevelDataObject;
    const secondLevelShape = firstLevelDataObject.shape[0];
    const col = upperLevel.firstLevelCol.get();
    const row = upperLevel.firstLevelRow.get();
    const secondLevelName = firstLevelData[col].data[0].names[0];

    const sideHeaders = [
      "",
      "Объём потребления",
      "Границы",
      "Границы",
      "Границы",
    ];

    const topHeaders = firstLevelData.map(({ title }) => title);

    let content;
    if (secondLevelShape) {
      switch (secondLevelShape.type) {
        case "column":
          content = (
            <div
              className="d-flex flex-column"
              style={{ transform: "scale(0.95)" }}
            >
              {secondLevelShape.data.map((item) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "75px", height: "50px" }}
                  onClick={() => {
                    uiStore.setCurrentLevel(3);
                    upperLevel.setCurrentRegions(
                      isTransport(secondLevelName).is
                        ? [item.i, item.j]
                        : [item.i]
                    );
                  }}
                >
                  {`${id}${item.i}${item.j ? item.j : ""}`}
                </div>
              ))}
            </div>
          );
          break;
        case "row":
          content = (
            <div className="d-flex" style={{ transform: "scale(0.95)" }}>
              {secondLevelShape.data.map((item) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "75px", height: "50px" }}
                  onClick={() => {
                    uiStore.setCurrentLevel(3);
                    upperLevel.setCurrentRegions(
                      isTransport(secondLevelName).is
                        ? [item.i, item.j]
                        : [item.i]
                    );
                  }}
                >
                  {`${id}${item.i}${item.j ? item.j : ""}`}
                </div>
              ))}
            </div>
          );
          break;
        case "matrix":
          content = (
            <div className="d-flex flex-column">
              {secondLevelShape.data.map((item) => (
                <div className="d-flex">
                  {item.map((item) => (
                    <div
                      className="border d-flex align-items-center justify-content-center"
                      style={{ width: "75px", height: "50px" }}
                      onClick={() => {
                        uiStore.setCurrentLevel(3);
                        console.log(secondLevelName);
                        upperLevel.setCurrentRegions(
                          isTransport(secondLevelName).is
                            ? [item.i, item.j]
                            : [item.i]
                        );
                      }}
                    >
                      {item.i ? `${id}${item.i}${item.j}` : ""}
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
      <div className="container">
        {secondLevelShape && (
          <div>
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
        {!secondLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
