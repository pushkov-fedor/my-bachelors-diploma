import React from "react";
import { setCurrentLevel } from "../stores/uiStore";
import {
  setCurrentRegions,
  setSecondLevelColAndRow,
} from "../stores/upperLevel";
import { isTransport } from "./modelStructureGenerator";

export default (secondLevelShape, secondLevelName, id) => {
  let content;
  if (secondLevelShape) {
    switch (secondLevelShape.type) {
      case "column":
        content = (
          <div className="d-flex flex-column">
            {secondLevelShape.data.map((item, index) => (
              <div
                className="border d-flex align-items-center justify-content-center"
                style={{ width: "100px", height: "50px" }}
                onClick={() => {
                  setCurrentLevel(3);
                  setCurrentRegions(
                    isTransport(secondLevelName).is
                      ? [item.i, item.j]
                      : [item.i]
                  );
                  setSecondLevelColAndRow(0, index);
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
          <div className="d-flex">
            {secondLevelShape.data.map((item, index) => (
              <div
                className="border d-flex align-items-center justify-content-center"
                style={{ width: "100px", height: "50px" }}
                onClick={() => {
                  setCurrentLevel(3);
                  setCurrentRegions(
                    isTransport(secondLevelName).is
                      ? [item.i, item.j]
                      : [item.i]
                  );
                  setSecondLevelColAndRow(index, 0);
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
            {secondLevelShape.data.map((item, col) => (
              <div className="d-flex">
                {item.map((item, row) => (
                  <div
                    className="border d-flex align-items-center justify-content-center"
                    style={{ width: "100px", height: "50px" }}
                    onClick={() => {
                      setCurrentLevel(3);
                      setCurrentRegions(
                        isTransport(secondLevelName).is
                          ? [item.i, item.j]
                          : [item.i]
                      );
                      setSecondLevelColAndRow(row, col);
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
      default:
        break;
    }
  }
  return content;
};
