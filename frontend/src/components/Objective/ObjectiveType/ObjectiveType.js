import React from "react";
import { inject, observer } from "mobx-react";

export const ObjectiveType = inject("rootStore")(
  observer(props => {
    const objectiveType = props.rootStore.expStore.objectiveType.get();
    const setObjectiveType = props.rootStore.expStore.setObjectiveType;
    return (
      <div className="input-group input-group-sm mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="objectiveType">
            Type
          </label>
        </div>
        <select
          className="custom-select"
          id="objectiveType"
          value={objectiveType}
          onChange={event => setObjectiveType(event.target.value)}
        >
          <option value="Maximize">Maximize</option>
          <option value="Minimize">Minimize</option>
        </select>
      </div>
    );
  })
);
