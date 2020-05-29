import React from "react";
import { setThirdLevelRowAndColForEdit } from "../stores/upperLevel";

export default (modelData) => {
  let content;
  if (modelData) {
    switch (modelData.type) {
      case "column":
        content = (
          <div className="d-flex flex-column">
            {modelData.data.map((item, index) => (
              <div
                className="border d-flex align-items-center justify-content-center"
                style={{ width: "110px", height: "100px" }}
                data-toggle="modal"
                data-target="#inputThirdLevelData"
                onClick={() => setThirdLevelRowAndColForEdit(index, -1)}
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
            {modelData.data.map((item, index) => (
              <div
                className="border d-flex align-items-center justify-content-center"
                style={{ width: "110px", height: "100px" }}
                data-toggle="modal"
                data-target="#inputThirdLevelData"
                onClick={() => setThirdLevelRowAndColForEdit(-1, index)}
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
            {modelData.data.map((item, row) => (
              <div className="d-flex">
                {item.map((item, col) => (
                  <div
                    className="border d-flex align-items-center justify-content-center"
                    style={{ width: "110px", height: "100px" }}
                    data-toggle="modal"
                    data-target="#inputThirdLevelData"
                    onClick={() => setThirdLevelRowAndColForEdit(row, col)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
        break;
      default:
        break;
    }
  }
  return content;
};
