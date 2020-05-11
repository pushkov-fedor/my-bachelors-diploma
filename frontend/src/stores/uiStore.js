import { observable, action, toJS, autorun } from "mobx";

export const errors = observable([]);
export const setErrors = action((errs) => {
  while (errors.length > 0) errors.pop();
  errs.forEach((error) => errors.push(error));
});
export const appendError = (error) => {
  const copy = toJS(errors).slice();
  copy.push(error);
  setErrors(copy);
};

autorun(() => {
  const errosJS = toJS(errors);
  if (errosJS.length > 0) console.log(errosJS);
});

export default {
  errors,
  appendError,
};
