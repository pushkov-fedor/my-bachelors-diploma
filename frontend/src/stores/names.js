import { observable, action, autorun, toJS, when } from "mobx";

const names = observable([]);
const setNames = action((n) => {
  while (names.length > 0) names.pop();
  n.forEach((name) => names.push(name));
  localStorage.setItem("names", JSON.stringify(toJS(names)));
});
when(
  () => names.length === 0,
  () => {
    const names = JSON.parse(localStorage.getItem("names"));
    if (names === null) return;
    setNames(names);
  }
);

const saveList = (list) => {
  const copy = toJS(names).slice();
  const listFromStore = copy.find((lfs) => lfs.listName === list.listName);
  if (listFromStore === undefined) {
    copy.push(list);
  } else {
    Object.assign(listFromStore, list);
  }
  setNames(copy);
};

export default {
  names,
  saveList,
  setNames,
};
