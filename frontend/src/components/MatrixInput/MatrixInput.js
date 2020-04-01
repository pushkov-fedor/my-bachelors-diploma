import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

export const MatrixInput = inject("rootStore")(
  observer(props => {
    const { id } = props;
    const value = toJS(props.rootStore.expStore.matrixData).find(
      md => md.id == id
    ).value;
    const updateMatrixData = props.rootStore.expStore.updateMatrixData;

    return (
      <div className="col-4">
        <div className="form-group">
          <label htmlFor={`matrixTextArea${id}`}>Matrix {id}</label>
          <textarea
            className="form-control"
            id={`matrixTextArea${id}`}
            rows="3"
            value={value}
            onChange={event => updateMatrixData(id, event.target.value)}
          ></textarea>
        </div>
      </div>
    );
  })
);
