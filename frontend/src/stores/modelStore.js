import { observable, action, autorun, reaction, toJS } from "mobx";
import { firstLevelInputToSecondLevelStructure } from "../utils/ExpParser";

const firstLevelInputs = observable([
  { id: "X", value: "" },
  { id: "Z", value: "" },
  { id: "Z", value: "" },
  { id: "T", value: "" },
  { id: "I", value: "" },
  { id: "E", value: "" },

  { id: "Y", value: "" },
  { id: "A", value: "" },
  { id: "P", value: "" },
  { id: "B", value: "" },
  { id: "C", value: "" },
  { id: "D", value: "" },
  { id: "S", value: "" },
  { id: "R", value: "" },

  { id: "XГ", value: "" },
  { id: "ZГ", value: "" },
  { id: "TГ", value: "" },
  { id: "IГ", value: "" },
  { id: "EГ", value: "" },

  { id: "XL", value: "" },
  { id: "ZL", value: "" },
  { id: "TL", value: "" },
  { id: "IL", value: "" },
  { id: "EL", value: "" },

  { id: "XE", value: "" },
  { id: "ZE", value: "" },
  { id: "TE", value: "" },
  { id: "IE", value: "" },
  { id: "EE", value: "" },
]);
const getInputValue = (id) => {
  return toJS(firstLevelInputs).filter((input) => input.id === id).value;
};
const setFirstLevelInput = action((inputs) => {
  while (firstLevelInputs.length > 0) firstLevelInputs.pop();
  inputs.forEach((input) => firstLevelInputs.push(input));
});
const updateFirstLevelInputs = action((value, id) => {
  const inputCopy = toJS(firstLevelInputs).slice();
  const inputChanged = inputCopy.find((input) => input.id === id);
  if (inputChanged !== undefined) {
    inputChanged.value = value;
    setFirstLevelInput(inputCopy);
  }
});

const secondLevelStructure = observable([]);
const setSecondLevelStructure = action((structure) => {
  while (secondLevelStructure.length > 0) secondLevelStructure.pop();
  structure.forEach((part) => secondLevelStructure.push(part));
});

reaction(
  () => toJS(firstLevelInputs),
  (inputs) => {
    const secondLevelStructure = inputs.map((input) =>
      firstLevelInputToSecondLevelStructure(input)
    );
    setSecondLevelStructure(secondLevelStructure);
  }
);

export const modelStore = {
  firstLevelInputs,
  getInputValue,
  updateFirstLevelInputs,
  secondLevelStructure,
};
