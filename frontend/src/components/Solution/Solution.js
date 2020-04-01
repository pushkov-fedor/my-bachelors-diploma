import React from "react";
import { inject, observer } from "mobx-react";

export const Solution = inject("rootStore")(
  observer(props => {
    const solution = props.rootStore.expStore.solution.get();
    const content =
      solution == "" ? (
        <div></div>
      ) : (
        <div>
          <label htmlFor="solution">Solution</label>
          <p
            id="solution"
            className="text-left"
            style={{ whiteSpace: "pre-line" }}
          >
            {solution}
          </p>
        </div>
      );

    return content;
  })
);
