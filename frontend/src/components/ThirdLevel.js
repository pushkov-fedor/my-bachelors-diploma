import React from "react";
import { inject, observer } from "mobx-react";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import { toJS } from "mobx";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const secondLevelShape = firstLevelDataObject.shape[0];
    const thirdLevelShape = firstLevelDataObject.shape[1];
    const firstLevelCol = upperLevel.firstLevelCol.get();
    const firstLevelRow = upperLevel.firstLevelRow.get();

    const secondLevelCol = upperLevel.secondLevelCol.get();
    const secondLevelRow = upperLevel.secondLevelRow.get();
    const regions = toJS(upperLevel.currentRegions);

    const topCell =
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].shape[0]
        .data;

    const namesArr = toJS(names.names);
    const secondLevelNamesListId = firstLevelData[firstLevelCol].data[
      firstLevelCol === 0 ? 1 : 0
    ].names[0].split("<")[0];
    const thirdLevelNamesListId = parseFirstLevelDataNamesFilter(
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].names[1]
    );

    const { names: listNames = [], listName = "" } =
      namesArr.find((r) => r.listId === secondLevelNamesListId) || {};

    const secondLevelSideNames = listNames.map((name) => name[0]);
    const secondLevelTopNames =
      secondLevelSideNames.length < topCell.length
        ? topCell.map(({ i, j }) => {
            const name1 = listNames[i - 1][0];
            const name2 = listNames[j - 1][0];
            return [name1, name2];
          })
        : secondLevelSideNames;
    const fromSecondLevelSideName = secondLevelSideNames[secondLevelRow];
    const fromSecondLevelTopName = secondLevelTopNames[secondLevelCol];

    let { names: nameHeadersList = [], headings = [] } =
      namesArr.find((r) => r.listId === thirdLevelNamesListId[0]) || {};
    const filterIndex = headings.findIndex(
      ({ id = "" }) => id === thirdLevelNamesListId[1]
    );
    if (filterIndex !== -1) {
      nameHeadersList = nameHeadersList.filter(
        (name) => name[filterIndex] === "1"
      );
    }

    let currentRegions = regions.map(
      (region) => listNames[Number(region) - 1][0]
    );

    const nameHeaders = (
      <div className="d-flex">
        {nameHeadersList.map((name) => (
          <div
            className="border d-flex align-items-center justify-content-center text-center"
            style={{
              width: "110px",
              height: "100px",
              backgroundColor: "#f4f4f4",
              fontSize: "14px",
              wordWrap: "break-word",
              textOverflow: "ellipsis",
            }}
          >
            {name[0]}
          </div>
        ))}
      </div>
    );

    const sideHeaders = [
      "",
      "Объём потребления",
      "Границы",
      "Границы",
      "Границы",
    ];
    const topHeaders = firstLevelData.map(({ title }) => title);

    const showTopNameHeaders =
      thirdLevelShape.type === "row" || thirdLevelShape.type === "matrix";
    const showSideNameHeaders =
      thirdLevelShape.type === "column" || thirdLevelShape.type === "matrix";
    console.log(nameHeadersList);

    let content;
    if (thirdLevelShape) {
      switch (thirdLevelShape.type) {
        case "column":
          content = (
            <div className="d-flex flex-column">
              {thirdLevelShape.data.map((item) => (
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{ width: "110px", height: "100px" }}
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
                  style={{ width: "110px", height: "100px" }}
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
                      style={{ width: "110px", height: "100px" }}
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
      <div className="">
        {thirdLevelShape && (
          <div>
            <div className="row py-2">
              <div className="col-3 px-0"></div>
              <div className="col-9 px-0">{topHeaders[firstLevelCol]}</div>
            </div>
            {showTopNameHeaders && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex text-success">
                  {Array.isArray(fromSecondLevelTopName)
                    ? fromSecondLevelTopName.join(" ")
                    : fromSecondLevelTopName}
                </div>
              </div>
            )}
            {showTopNameHeaders && (
              <div className="row py-0">
                <div className="col-3 px-0"></div>
                <div className="col-9 px-0 d-flex">{nameHeaders}</div>
              </div>
            )}
            <div className="row">
              <div className="col-3 px-0 d-flex align-items-start justify-content-center text-center">
                <div className="w-50 ml-3 mt-4">
                  {sideHeaders[firstLevelRow]}
                  {showSideNameHeaders && (
                    <p className="text-success">{fromSecondLevelSideName}</p>
                  )}
                </div>
                {showSideNameHeaders && (
                  <div className="w-50">
                    <div className="d-flex flex-column align-items-end">
                      {nameHeadersList.map((name) => (
                        <div
                          className="border d-flex align-items-center justify-content-center text-center"
                          style={{
                            width: "110px",
                            height: "100px",
                            backgroundColor: "#f4f4f4",
                            fontSize: "14px",
                            wordWrap: "break-word",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {name[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="col-9 px-0 d-flex justify-content-start">
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
