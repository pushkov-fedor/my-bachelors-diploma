import React from "react";
import { inject, observer } from "mobx-react";

export const ExpressionInput = inject("rootStore")(
  observer(props => {
    const expression = props.rootStore.expStore.expression.get();
    const changeHandler = props.rootStore.expStore.setExpression;
    return (
      <div className="row">
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Input your expression
            </span>
          </div>
          <input
            value={expression}
            onChange={event => changeHandler(event.target.value)}
            type="text"
            className="form-control"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
          />
        </div>
      </div>
    );
  })
);
