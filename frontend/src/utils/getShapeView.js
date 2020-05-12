import React from "react";

export default (shapeObject) => {
  const [second, third] = shapeObject;
  let secondType, secondShape, thirdType, thirdShape;
  switch (second.type) {
    case "row":
      secondType = "Строка";
      secondShape = `1-${second.data.length}`;
      break;
    case "column":
      secondType = "Столбец";
      secondShape = `1|${second.data.length}`;
      break;
    case "matrix":
      secondType = "Матрица";
      secondShape = `1|${second.data.length}:1-${second.data[0].length}`;
      break;
    default:
      secondType = "Unknown";
      secondShape = "???";
      break;
  }
  switch (third.type) {
    case "row":
      thirdType = "Строка";
      thirdShape = `1-${third.data.length}`;
      break;
    case "column":
      thirdType = "Столбец";
      thirdShape = `1|${third.data.length}`;
      break;
    case "matrix":
      thirdType = "Матрица";
      thirdShape = `1|${third.data.length}:1-${third.data[0].length}`;
      break;
    default:
      thirdType = "Unknown";
      thirdShape = "???";
      break;
  }
  return (
    <div className="row h-100" style={{ fontSize: "14px" }}>
      <div className="col-6 d-flex flex-column justify-content-center align-items-center border-right">
        <label className="border-bottom text-center">Второй уровень</label>
        <label className="border-bottom text-center">{secondType}</label>
        <label className="text-center">{secondShape}</label>
      </div>
      <div className="col-6 d-flex flex-column justify-content-center align-items-center">
        <label className="border-bottom text-center">Третий уровень</label>
        <label className="border-bottom text-center">{thirdType}</label>
        <label className="text-center">{thirdShape}</label>
      </div>
    </div>
  );
};
