import React from "react";

export const ColumnAndRowHeadersInfo = (props) => {
  const { selected, data } = props;
  const { start, end } = selected;
  if (start === null || end === null) return null;
  const { i: startI, j: startJ } = start;
  const { i: endI, j: endJ } = end;
  if (startI !== endI && startJ !== endJ) return null;
  const left = data[startI][0];
  const top = data[0][startJ];
  if (!left.readOnly || !top.readOnly) return null;
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center p-2 text-center animate__animated animate__fadeIn"
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 16px rgba(0,0,0,.15)",
        position: "fixed",
        bottom: "180px",
        right: "50px",
        width: "200px",
        height: "160px",
      }}
    >
      <p className="border-bottom pb-3 w-100">
        {top.readOnly ? top.value : ""}
      </p>
      <p className="w-100">{left.readOnly ? left.value : ""}</p>
    </div>
  );
};
