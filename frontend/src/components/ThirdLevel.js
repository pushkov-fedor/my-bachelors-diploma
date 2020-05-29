import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { toJS, set } from "mobx";
import { parseFirstLevelDataNamesFilter } from "../utils/ExpParser";
import getNameHeadersForThirdLevel from "../utils/getNameHeadersForThirdLevel";
import getCurrentHeadersFomFirstLevel from "../utils/getCurrentHeadersFomFirstLevel";
import getThirdLevelModelView from "../utils/getThirdLevelModelView";
import getNameHeadersFromSecondLevelForThirdLevel from "../utils/getNameHeadersFromSecondLevelForThirdLevel";

export const ThirdLevel = inject("rootStore")(
  observer((props) => {
    const { upperLevel, firstLevel, names } = props.rootStore;

    const firstLevelData = toJS(firstLevel.firstLevelData);

    const firstLevelDataObject = toJS(
      upperLevel.currentFirstLevelDataObject
    )[0];
    const firstLevelCol = upperLevel.firstLevelCol.get();
    const firstLevelRow = upperLevel.firstLevelRow.get();

    const secondLevelCol = upperLevel.secondLevelCol.get();
    const secondLevelRow = upperLevel.secondLevelRow.get();

    const thirdLevelShape = firstLevelDataObject.shape[1];
    const topShapeObject =
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].shape[0]
        .data;

    const namesArr = toJS(names.names);
    const secondLevelNamesListId = firstLevelData[firstLevelCol].data[
      firstLevelCol === 0 ? 1 : 0
    ].names[0].split("<")[0];
    const thirdLevelNamesListId = parseFirstLevelDataNamesFilter(
      firstLevelData[firstLevelCol].data[firstLevelCol === 0 ? 1 : 0].names[1]
    );

    const [
      fromSecondLevelSideName,
      fromSecondLevelTopName,
    ] = getNameHeadersFromSecondLevelForThirdLevel(
      namesArr,
      topShapeObject,
      secondLevelNamesListId,
      secondLevelRow,
      secondLevelCol
    );

    const [sideNameHeaders, topNameHeaders] = getNameHeadersForThirdLevel(
      namesArr,
      thirdLevelNamesListId
    );

    const [
      sideHeaderFromFirstLevel,
      topHeaderFromFirstLevel,
    ] = getCurrentHeadersFomFirstLevel(
      firstLevelRow,
      firstLevelCol,
      firstLevelData
    );

    const showTopNameHeaders =
      thirdLevelShape.type === "row" || thirdLevelShape.type === "matrix";
    const showSideNameHeaders =
      thirdLevelShape.type === "column" || thirdLevelShape.type === "matrix";

    const currentThirdLevelModel = toJS(upperLevel.currentThirdLevelModel)[0];
    const content = getThirdLevelModelView(currentThirdLevelModel);

    const [textAreaValue, setTextAreaValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const thirdLevelRowForEdit = upperLevel.thirdLevelRowForEdit.get();
    const thirdLevelColForEdit = upperLevel.thirdLevelColForEdit.get();

    return (
      <div className="">
        {thirdLevelShape && (
          <div>
            <div className="row py-2 d-flex justify-content-center">
              <div className="col-6 px-0">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="modal"
                  data-target="#inputThirdLevelData"
                >
                  Добавить данные
                </button>
                <div
                  className="modal fade"
                  id="inputThirdLevelData"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Добавление данных
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body" style={{ overflowX: "auto" }}>
                        {thirdLevelColForEdit === "" &&
                        thirdLevelRowForEdit === "" ? (
                          <textarea
                            className="w-100"
                            rows="10"
                            wrap="off"
                            value={textAreaValue}
                            onChange={(e) => {
                              setTextAreaValue(e.target.value);
                              upperLevel.updateThirdLevelModel(e.target.value);
                            }}
                          />
                        ) : (
                          <input
                            className="w-100"
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                              setInputValue(e.target.value);
                              upperLevel.updateThirdLevelModelByOne(
                                e.target.value,
                                thirdLevelRowForEdit,
                                thirdLevelColForEdit
                              );
                            }}
                          />
                        )}
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                          onClick={() => {
                            upperLevel.resetThirdLevelModel();
                            upperLevel.setThirdLevelRowAndColForEdit(
                              "-1",
                              "-1"
                            );
                            setTextAreaValue("");
                            setInputValue("");
                          }}
                        >
                          Закрыть
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          data-dismiss="modal"
                          onClick={() => {
                            setTextAreaValue("");
                            setInputValue("");
                            upperLevel.setThirdLevelRowAndColForEdit(
                              "-1",
                              "-1"
                            );
                          }}
                        >
                          Сохранить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-2">
              <div className="col-3 px-0"></div>
              <div className="col-9 px-0">{topHeaderFromFirstLevel}</div>
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
                <div className="col-9 px-0 d-flex">{topNameHeaders}</div>
              </div>
            )}
            <div className="row">
              <div className="col-3 px-0 d-flex align-items-start justify-content-center text-center">
                <div className="w-50 ml-3 mt-4">
                  {sideHeaderFromFirstLevel}
                  {showSideNameHeaders && (
                    <p className="text-success">{fromSecondLevelSideName}</p>
                  )}
                </div>
                {showSideNameHeaders && (
                  <div className="w-50">
                    <div className="d-flex flex-column align-items-end">
                      {sideNameHeaders}
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
