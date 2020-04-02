import React from "react";
import { inject, observer } from "mobx-react";

export const ExpressionInput = inject("rootStore")(
  observer(props => {
    const { valueField, changeHandlerField, title } = props;
    const value = props.rootStore.expStore[valueField].get();
    const changeHandler = props.rootStore.expStore[changeHandlerField];
    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            {title}
          </span>
        </div>
        <input
          value={value}
          onChange={event => changeHandler(event.target.value)}
          type="text"
          className="form-control"
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
    );
  })
);
