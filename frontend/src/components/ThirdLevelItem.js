import React from "react";
import { inject, observer } from "mobx-react";

export const ThirdLevelItem = inject("rootStore")(
  observer((props) => {
    const { thirdLevel } = props.rootStore;

    const selected = thirdLevel.selected.get();

    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{selected}</span>
        </div>
        <textarea
          className="form-control"
          aria-label="With textarea"
          rows="9"
        ></textarea>
      </div>
    );
  })
);
