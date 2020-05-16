import { observable, action, autorun, toJS } from "mobx";

export const currentSecondLevelShapeObject = observable([]);
export const setCurrentSecondLevelShapeObject = action((current) => {
  while (currentSecondLevelShapeObject.length > 0)
    currentSecondLevelShapeObject.pop();
  currentSecondLevelShapeObject.push(current);
});

export default {
  currentSecondLevelShapeObject,
  setCurrentSecondLevelShapeObject,
};
