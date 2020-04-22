import { observable, action } from "mobx";

const selected = observable.box("");
const setSelected = action((s) => selected.set(s));

export default {
  selected,
  setSelected,
};
