import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import "./Cell.css";

export const Cell = inject("rootStore")(
  observer((props) => {
    const { id, structure } = props;
    let className,
      content = [];
    const { type, direction1, range1, direction2, range2 } =
      toJS(props.rootStore.modelStore.secondLevelStructure).find(
        (structure) => structure.id === id
      ) || {};
    if (type !== undefined) {
      if (type === "VECTOR") {
        className = `d-flex border ${
          direction1 === "-" ? "flex-row" : "flex-column"
        }`;
        const { start, end } = range1;
        for (let i = start; i <= end; i++)
          content.push(<div className="border cell">{`${id}${i}`}</div>);
      } else {
        const rows = [];
        const { start: startRows, end: endRows } = range2;
        const { start: startColumn, end: endColumn } = range1;
        for (let i = startRows; i <= endRows; i++) {
          const columns = [];
          for (let j = startColumn; j <= endColumn; j++) {
            columns.push(
              <div
                className="border cell"
                key={`col${i}${j}`}
              >{`${id}${i}${j}`}</div>
            );
          }
          rows.push(
            <div className="d-flex flex-row" key={`row${i}`}>
              {columns}
            </div>
          );
        }
        className = "d-flex flex-column";
        content = rows;
      }
    }

    return <div className={className}>{content}</div>;
  })
);
