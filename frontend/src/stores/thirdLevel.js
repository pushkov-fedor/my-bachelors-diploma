import { observable, action } from "mobx";

export const currentFirstLevelDataObject = observable([]);
export const setCurrentFirstLevelDataObject = action((current) => {
  while (currentFirstLevelDataObject.length > 0)
    currentFirstLevelDataObject.pop();
  currentFirstLevelDataObject.push(current);
});

export default {
  currentFirstLevelDataObject,
  setCurrentFirstLevelDataObject,
};
