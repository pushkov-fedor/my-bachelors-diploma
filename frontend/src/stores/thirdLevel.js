import { observable, action } from "mobx";

export const currentThirdLevelShapeObject = observable([]);
export const setCurrentThirdLevelShapeObject = action((current) => {
  while (currentThirdLevelShapeObject.length > 0)
    currentThirdLevelShapeObject.pop();
  currentThirdLevelShapeObject.push(current);
});

export default {
  currentThirdLevelShapeObject,
  setCurrentThirdLevelShapeObject,
};
