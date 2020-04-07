import React from "react";
import { inject, observer } from "mobx-react";
import { Cell } from "./Cell/Cell";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    return (
      <div>
        <div className="row">
          <Cell id="Y" />
          <Cell id="A" />
          <Cell id="P" />
          <Cell id="B" />
          <Cell id="C" />
          <Cell id="D" />
          <Cell id="S" />
          <Cell id="R" />
        </div>
      </div>
    );
  })
);
