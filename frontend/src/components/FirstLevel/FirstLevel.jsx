import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { InputK } from "../InputK/InputK";
import { TopHeader } from "./TopHeader";

export const FirstLevel = inject("rootStore")(
  observer((props) => {
    const firstLevelData = toJS(props.rootStore.firstLevel.firstLevelData);
    const content = [];
    firstLevelData.forEach(({ column, data }) => {
      const columnContent = [];
      data.forEach((dataItem) => {
        let content = "";
        let view;
        if (Array.isArray(dataItem)) {
          view = dataItem.map((item) => {
            const view = props.rootStore.firstLevel.getView(column, item);
            return <div>{view}</div>;
          });
        } else {
          view = props.rootStore.firstLevel.getView(column, dataItem);
        }
        content = (
          <div
            className="border d-flex justify-content-center align-items-center"
            style={{ width: "150px", height: "100px" }}
          >
            {view}
          </div>
        );
        columnContent.push(content);
      });
      content.push(<div className="d-flex flex-column">{columnContent}</div>);
    });
    return (
      <div>
        <InputK />
        <TopHeader />
        <div className="d-flex">{content}</div>
      </div>
    );
  })
);
