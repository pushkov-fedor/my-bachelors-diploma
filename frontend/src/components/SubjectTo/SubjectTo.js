import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { ExpressionInput } from "../ExpressionInput/ExpressionInput";
import { Solution } from "../Solution/Solution";

export const SubjectTo = inject("rootStore")(
  observer(props => {
    let [
      matrixInputLeft = [],
      matrixInputSign = [],
      matrixInputRight = []
    ] = toJS(props.rootStore.expStore.matrixInputSubjectParts);

    matrixInputLeft = matrixInputLeft.map(component => (
      <div className="col-6">{component}</div>
    ));
    matrixInputRight = matrixInputRight.map(component => (
      <div className="col-6">{component}</div>
    ));
    matrixInputSign = matrixInputSign.map(component => (
      <div className="col-12">{component}</div>
    ));

    const { calculate } = props.rootStore.expStore;

    return (
      <div>
        <ExpressionInput
          valueField="subjectTo"
          changeHandlerField="setSubjectTo"
          title="Input subject to"
        />
        <div className="row my-3">
          <div className="col-5 border-right">
            <div className="row">{matrixInputLeft}</div>
          </div>
          <div className="col-2">
            <div className="row">{matrixInputSign}</div>
          </div>
          <div className="col-5 border-left">
            <div className="row">{matrixInputRight}</div>
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={calculate}>
          Calculate
        </button>
        <Solution />
      </div>
    );
  })
);
