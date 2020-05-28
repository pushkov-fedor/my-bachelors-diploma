import React from "react";

export default (thirdLevelShape) => {
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
      default:
        break;
    }
  }
  return content;
};
