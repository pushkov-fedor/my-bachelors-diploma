import React from "react";
import { inject, observer } from "mobx-react";

export const Bounds = inject("rootStore")(
  observer(props => {
    const bounds = props.rootStore.expStore.bounds.get();
    const setBounds = props.rootStore.expStore.setBounds;

    return (
      <div className="input-group my-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Bounds</span>
        </div>
        <textarea
          className="form-control"
          aria-label="With textarea"
          rows="5"
          value={bounds}
          onChange={event => setBounds(event.target.value)}
        ></textarea>
      </div>
    );
  })
);
