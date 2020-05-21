import { observable, action } from "mobx";

export const firstLevelCol = observable.box(-1);
export const firstLevelRow = observable.box(-1);

export const setFirstLevelColAndRow = action((col, row) => {
  firstLevelCol.set(col);
  firstLevelRow.set(row);
});

export const currentFirstLevelDataObject = observable([]);
export const setCurrentFirstLevelDataObject = action((current) => {
  while (currentFirstLevelDataObject.length > 0)
    currentFirstLevelDataObject.pop();
  currentFirstLevelDataObject.push(current);
});

export const currentRegions = observable([]);
export const setCurrentRegions = action((regions) => {
  while (currentRegions.length > 0) currentRegions.pop();
  regions.forEach((region) => currentRegions.push(region));
});

export default {
  firstLevelCol,
  firstLevelRow,
  setFirstLevelColAndRow,
  currentFirstLevelDataObject,
  setCurrentFirstLevelDataObject,
  currentRegions,
  setCurrentRegions,
};
