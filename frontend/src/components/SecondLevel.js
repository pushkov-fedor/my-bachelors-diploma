import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { secondLevel, uiStore } = props.rootStore;
    const firstLevelDataObject = toJS(
      secondLevel.currentFirstLevelDataObject
    )[0];
    const { id } = firstLevelDataObject;
    const secondLevelShape = firstLevelDataObject.shape[0];
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
                  onClick={() => uiStore.setCurrentLevel(3)}
                >
                  {`${id}${item.i}`}
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
                  onClick={() => uiStore.setCurrentLevel(3)}
                >
                  {`${id}${item.i}`}
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
                      onClick={() => uiStore.setCurrentLevel(3)}
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
        {secondLevelShape && content}
        {!secondLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
