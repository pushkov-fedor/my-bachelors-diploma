import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isTransport } from "../utils/modelStructureGenerator";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, uiStore, firstLevel, names } = props.rootStore;
    const firstLevelData = toJS(firstLevel.firstLevelData);
    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const { id } = firstLevelDataObject;
    const secondLevelShape = firstLevelDataObject.shape[0];
    const col = upperLevel.firstLevelCol.get();
    const row = upperLevel.firstLevelRow.get();
    const secondLevelName =
      firstLevelData[col].data[col === 0 ? 1 : 0].names[0];
    const topCell = firstLevelData[col].data[col === 0 ? 1 : 0].shape[0].data;

    const namesArr = toJS(names.names);
    const secondLevelNamesListId = firstLevelData[col].data[
      col === 0 ? 1 : 0
    ].names[0].split("<")[0];
    const { names: listNames = [] } =
      namesArr.find((r) => r.listId === secondLevelNamesListId) || {};

    const sideNameHeaders = listNames.map((name) => (
      <div
        style={{
          width: "100px",
          height: "50px",
          fontSize: "14px",
          backgroundColor: "#f4f4f4",
        }}
        className="border d-flex align-items-center justify-content-center text-center"
      >
        {name[0]}
      </div>
    ));
    const topNameHeaders =
      sideNameHeaders.length < topCell.length
        ? topCell.map(({ i, j }) => {
            const name1 = listNames[i - 1][0];
            const name2 = listNames[j - 1][0];
            return (
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "14px",
                  backgroundColor: "#f4f4f4",
                }}
                className="border d-flex align-items-center justify-content-center text-center"
              >
                {name1}
                <br />
                {name2}
              </div>
            );
          })
        : sideNameHeaders;

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
            <div className="d-flex flex-column">
              {secondLevelShape.data.map((item, index) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "100px", height: "50px" }}
                  onClick={() => {
                    uiStore.setCurrentLevel(3);
                    upperLevel.setCurrentRegions(
                      isTransport(secondLevelName).is
                        ? [item.i, item.j]
                        : [item.i]
                    );
                    upperLevel.setSecondLevelColAndRow(0, index);
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
                    uiStore.setCurrentLevel(3);
                    upperLevel.setCurrentRegions(
                      isTransport(secondLevelName).is
                        ? [item.i, item.j]
                        : [item.i]
                    );
                    upperLevel.setSecondLevelColAndRow(index, 0);
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
                        uiStore.setCurrentLevel(3);
                        console.log(secondLevelName);
                        upperLevel.setCurrentRegions(
                          isTransport(secondLevelName).is
                            ? [item.i, item.j]
                            : [item.i]
                        );
                        upperLevel.setSecondLevelColAndRow(row, col);
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
    const showTopNames =
      secondLevelShape.type === "row" || secondLevelShape.type === "matrix";

    const showLeftNames =
      secondLevelShape.type === "column" || secondLevelShape.type === "matrix";
    return (
      <div className="container">
        {secondLevelShape && (
          <div>
            <div className="row py-2">
              <div className="col-3 px-0"></div>
              <div className="col-9 px-0 px-4">{topHeaders[col]}</div>
            </div>
            {showTopNames && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex">{topNameHeaders}</div>
              </div>
            )}
            <div className="row">
              <div className="col-3 px-0 d-flex align-items-start justify-content-center text-center">
                <div className="w-50">{sideHeaders[row]}</div>
                {showLeftNames && (
                  <div className="w-50 d-flex flex-column align-items-end">
                    {sideNameHeaders}
                  </div>
                )}
              </div>
              <div className="col-9 px-0 d-flex justify-content-start">
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
