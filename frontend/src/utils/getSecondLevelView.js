import React from "react";

const center = " d-flex align-items-center justify-content-center";
const border = " border";

export default (item) => {
  const { type, data } = item;
  switch (type) {
    case "empty":
      return (
        <div className={border} style={{ width: "50px", height: "50px" }}></div>
      );
    case "column":
      const columnItems = data.map((item) => (
        <div
          className={center + border}
          style={{ width: "50px", height: "50px" }}
          key={item.id}
        >
          {item.id}
        </div>
      ));
      return <div className="d-flex flex-column">{columnItems}</div>;
    case "single":
      return (
        <div
          className={center + border}
          style={{ width: "50px", height: "50px" }}
        >
          {data.id}
        </div>
      );
    case "row":
      const rowItems = data.map((item) => (
        <div
          className={center + border}
          style={{ width: "50px", height: "50px" }}
          key={item.id}
        >
          {item.id}
        </div>
      ));
      return <div className="d-flex">{rowItems}</div>;
    case "matrix":
      const matrixColumns = data.map((column, colInd) => {
        const columnItems = column.map((item, itemInd) => (
          <div
            className={center + border}
            style={{ width: "50px", height: "50px" }}
            key={
              item.id.length === 1
                ? `${item.id}${colInd}${itemInd}EMPTY`
                : item.id
            }
          >
            {item.id.length === 1 ? "" : item.id}
          </div>
        ));
        return (
          <div className="d-flex flex-column" key={`col${colInd}`}>
            {columnItems}
          </div>
        );
      });
      return <div className="d-flex">{matrixColumns}</div>;

    default:
      return (
        <div className={border} style={{ width: "50px", height: "50px" }}></div>
      );
  }
};
