import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

export const MatrixInput = inject("rootStore")(
  observer(props => {
    const { id } = props;
    const { value } = toJS(props.rootStore.expStore.matrixDataSubjectParts)
      .flat()
      .find(md => md.id === id);
    const updateMatrixData = toJS(
      props.rootStore.expStore.updateMatrixDataSubjectParts
    );

    return (
      <div className="form-group">
        <label htmlFor={`matrixTextArea${id}`}>
          Matrix {id === "&" ? "SIGN" : id}
        </label>
        <textarea
          className="form-control"
          id={`matrixTextArea${id}`}
          rows="3"
          value={value}
          onChange={event => updateMatrixData(id, event.target.value)}
        ></textarea>
      </div>
    );
  })
);
