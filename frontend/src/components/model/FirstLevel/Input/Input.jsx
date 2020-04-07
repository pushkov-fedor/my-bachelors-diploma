import React from "react";
import { inject, observer } from "mobx-react";

export const Input = inject("rootStore")(
  observer((props) => {
    const { id } = props;
    const value = props.rootStore.modelStore.getInputValue(id);
    const changeHandler = props.rootStore.modelStore.updateFirstLevelInputs;
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder={`${id}:1-8`}
          aria-label="Username"
          value={value}
          onChange={(event) => changeHandler(event.target.value, id)}
        />
      </div>
    );
  })
);
