import React, { useState, useEffect } from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { ExpressionInput } from "./components/ExpressionInput/ExpressionInput";
import { MatrixInput } from "./components/MatrixInput/MatrixInput";
import { Solution } from "./components/Solution/Solution";
import "./App.css";

import {
  matrixMultiplication,
  matrixMultiplicationOnVariables,
  matrixSum,
  matrixSumOnVariables,
  matrixMinus,
  matrixMinusOnVariables
} from "./utils/Math";
import {
  parseStringToMatrix,
  parseMatrixToString,
  parseSubjectTo
} from "./utils/ExpParser";

export const App = inject("rootStore")(
  observer(props => {
    const matrixInputComponents = toJS(
      props.rootStore.expStore.matrixInputComponents
    );
    const { calculate } = props.rootStore.expStore;

    return (
      <div className="App">
        <div className="container">
          <ExpressionInput />
          <div className="row">{matrixInputComponents}</div>
          <button type="button" className="btn btn-primary" onClick={calculate}>
            Calculate
          </button>
          <Solution />
        </div>
      </div>
    );
  })
);
