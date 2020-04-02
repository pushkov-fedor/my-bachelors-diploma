import React from "react";
import { inject, observer } from "mobx-react";
import { ExpressionInput } from "../ExpressionInput/ExpressionInput";
import { ObjectiveType } from "./ObjectiveType/ObjectiveType";

export const Objective = inject("rootStore")(
  observer(props => {
    return (
      <div>
        <div className="row">
          <div className="col-8">
            <ExpressionInput
              valueField="objective"
              changeHandlerField="setObjective"
              title="Objective"
            />
          </div>
          <div className="col-4">
            <ObjectiveType />
          </div>
        </div>
      </div>
    );
  })
);
