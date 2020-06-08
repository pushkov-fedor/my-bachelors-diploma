import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { isTransport } from "../utils/modelStructureGenerator";

export const NavigationCircle = inject("rootStore")(
  observer((props) => {
    const { upperLevel, uiStore, firstLevel } = props.rootStore;
    const firstLevelCol = upperLevel.firstLevelCol.get();
    const secondLevelCol = upperLevel.secondLevelCol.get();
    const secondLevelRow = upperLevel.secondLevelRow.get();
    const [secondLevelData] = toJS(upperLevel.secondLevelData);
    const firstLevelData = toJS(firstLevel.firstLevelData);

    const goUp = () => {
      if (secondLevelData[secondLevelRow - 1] === undefined) return;

      const shapeItem = secondLevelData[secondLevelRow - 1][secondLevelCol];
      if (!shapeItem.i && !shapeItem.j) return;

      const topSecondLevelName =
        firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0]
          .names[0];
      const { i, j } = shapeItem;

      upperLevel.setCurrentRegions(
        isTransport(topSecondLevelName).is ? [i, j] : [i]
      );
      upperLevel.setSecondLevelColAndRow(secondLevelCol, secondLevelRow - 1);
      uiStore.setCurrentLevel(3);
    };

    const goDown = () => {
      if (secondLevelData[secondLevelRow + 1] === undefined) return;

      const shapeItem = secondLevelData[secondLevelRow + 1][secondLevelCol];
      if (!shapeItem.i && !shapeItem.j) return;

      const topSecondLevelName =
        firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0]
          .names[0];
      const { i, j } = shapeItem;

      upperLevel.setCurrentRegions(
        isTransport(topSecondLevelName).is ? [i, j] : [i]
      );
      upperLevel.setSecondLevelColAndRow(secondLevelCol, secondLevelRow + 1);
      uiStore.setCurrentLevel(3);
    };

    const goRight = () => {
      if (secondLevelData[secondLevelRow][secondLevelCol + 1] === undefined)
        return;

      const shapeItem = secondLevelData[secondLevelRow][secondLevelCol + 1];
      if (!shapeItem.i && !shapeItem.j) return;

      const topSecondLevelName =
        firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0]
          .names[0];
      const { i, j } = shapeItem;

      upperLevel.setCurrentRegions(
        isTransport(topSecondLevelName).is ? [i, j] : [i]
      );
      upperLevel.setSecondLevelColAndRow(secondLevelCol + 1, secondLevelRow);
      uiStore.setCurrentLevel(3);
    };

    const goLeft = () => {
      if (secondLevelData[secondLevelRow][secondLevelCol - 1] === undefined)
        return;

      const shapeItem = secondLevelData[secondLevelRow][secondLevelCol - 1];
      if (!shapeItem.i && !shapeItem.j) return;

      const topSecondLevelName =
        firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0]
          .names[0];
      const { i, j } = shapeItem;

      upperLevel.setCurrentRegions(
        isTransport(topSecondLevelName).is ? [i, j] : [i]
      );
      upperLevel.setSecondLevelColAndRow(secondLevelCol - 1, secondLevelRow);
      uiStore.setCurrentLevel(3);
    };

    return (
      <div
        style={{
          width: "110px",
          height: "110px",
          backgroundColor: "inset",
          position: "fixed",
          bottom: "50px",
          right: "50px",
        }}
      >
        <div className="position-relative w-100 h-100">
          <div
            className="rounded-circle position-absolute bg-white d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              top: 0,
              left: "35px",
              right: "35px",
              boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              cursor: "pointer",
            }}
            onClick={goUp}
          >
            <i className="fas fa-chevron-up"></i>
          </div>
          <div
            className="rounded-circle position-absolute bg-white d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              right: 0,
              top: "35px",
              bottom: "35px",
              boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              cursor: "pointer",
            }}
            onClick={goRight}
          >
            <i className="fas fa-chevron-right"></i>
          </div>
          <div
            className="rounded-circle position-absolute bg-white d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              bottom: 0,
              left: "35px",
              right: "35px",
              boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              cursor: "pointer",
            }}
            onClick={goDown}
          >
            <i className="fas fa-chevron-down"></i>
          </div>
          <div
            className="rounded-circle position-absolute bg-white d-flex justify-content-center align-items-center"
            style={{
              width: "40px",
              height: "40px",
              left: 0,
              top: "35px",
              bottom: "35px",
              boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              cursor: "pointer",
            }}
            onClick={goLeft}
          >
            <i className="fas fa-chevron-left"></i>
          </div>
        </div>
      </div>
    );
  })
);
