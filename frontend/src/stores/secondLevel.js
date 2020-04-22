import { observable, action, autorun, toJS } from "mobx";
import { k, firstLevelData, transportPairs } from "./firstLevel";
import generateData from "../utils/generateSecondLevelData";

const data = observable([]);
const setData = action((d) => {
  while (data.length > 0) data.pop();
  d.forEach((item) => data.push(item));
});

const selected = observable([]);
const setSelected = action((s) => {
  while (selected.length > 0) selected.pop();
  s.forEach((item) => selected.push(item));
});

autorun(() => {
  const kJS = k.get();
  const transportPairsJS = transportPairs.get();
  const firstLevelDataJS = toJS(firstLevelData);
  const generatedData = firstLevelDataJS.map((column) => {
    const { data, type } = column;
    return data.map((item) => generateData(item, type, kJS, transportPairsJS));
  });
  setData(generatedData);
});

export default {
  data,
  selected,
  setSelected,
};
