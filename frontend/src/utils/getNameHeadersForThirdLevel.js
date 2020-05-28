import React from "react";

export default (namesArr, thirdLevelNamesListId) => {
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
  const topNameHeaders = (
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
  const sideNameHeaders = (
    <div className="d-flex flex-column">
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
  return [sideNameHeaders, topNameHeaders];
};
