import React from "react";
import { inject, observer } from "mobx-react";

export const InputK = inject("rootStore")(
  observer((props) => {
    const value = props.rootStore.firstLevel.k.get();
    const changeHandler = props.rootStore.firstLevel.setK;
    return (
      <div className="form-group my-2 border p-2" style={{ width: "150px" }}>
        <label htmlFor="inputK" className="text-left w-100">
          Введите k
        </label>
        <input
          type="number"
          className="form-control"
          min="1"
          id="inputK"
          value={value}
          onChange={(event) => changeHandler(event.target.value)}
        />
      </div>
    );
  })
);
