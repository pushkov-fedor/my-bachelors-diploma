import React from "react";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

export const Solution = inject("rootStore")(
  observer((props) => {
    const [calculatedLeft, signs, calculatedRight] = toJS(
      props.rootStore.expStore.calculatedParts
    );
    const content =
      calculatedLeft === undefined &&
      calculatedRight === undefined &&
      signs === undefined ? (
        <div></div>
      ) : (
        <div>
          <label htmlFor="solution">Solution</label>
          <div className="row" id="solution">
            <div className="col-5 border-right">
              <p
                id="calculatedLeft"
                className="text-left"
                style={{ whiteSpace: "pre-line" }}
              >
                {calculatedLeft}
              </p>
            </div>
            <div className="col-2">
              <p
                id="signs"
                className="text-left"
                style={{ whiteSpace: "pre-line" }}
              >
                {signs}
              </p>
            </div>
            <div className="col-5 border-left">
              <p
                id="calculatedRight"
                className="text-left"
                style={{ whiteSpace: "pre-line" }}
              >
                {calculatedRight}
              </p>
            </div>
          </div>
        </div>
      );

    return content;
  })
);
