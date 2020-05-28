import React from "react";

export default (listNames, topDataObject) => {
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
    sideNameHeaders.length < topDataObject.length
      ? topDataObject.map(({ i, j }) => {
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
  return [sideNameHeaders, topNameHeaders];
};
