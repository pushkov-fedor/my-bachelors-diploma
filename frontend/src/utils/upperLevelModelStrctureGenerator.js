export const generateCurrentThirdLevelModelTemplate = (thirdLevelShape) => {
  let data;
  if (thirdLevelShape) {
    switch (thirdLevelShape.type) {
      case "column":
      case "row":
        data = thirdLevelShape.data.map((_) => "");
        break;
      case "matrix":
        data = thirdLevelShape.data.map((item) => item.map((_) => ""));
        break;
      default:
        break;
    }
  }
  return { type: thirdLevelShape.type, data };
};
