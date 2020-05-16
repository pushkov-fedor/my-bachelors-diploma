import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { thirdLevel, uiStore } = props.rootStore;
    const thirdLevelShape = toJS(thirdLevel.currentThirdLevelShapeObject)[0];
    console.log(toJS(thirdLevel.currentThirdLevelShapeObject));
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
                  {item}
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
                  {item}
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
                      {item}
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
        {thirdLevelShape && content}
        {!thirdLevelShape && (
          <div className="text-center pt-4">
            Размерности для этой клетке пока не заполнены :(
          </div>
        )}
      </div>
    );
  })
);
