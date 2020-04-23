import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import getView from "../../utils/getSecondLevelView";

export const SecondLevel = inject("rootStore")(
  observer((props) => {
    const { secondLevel } = props.rootStore;

    const data = toJS(secondLevel.data);
    console.log(data)

    const cols = data.map((col) => {
      const items = col.map((item) => getView(item));
      return <div className="d-flex flex-column">{items}</div>;
    });

    return <div className="d-flex">{cols}</div>;
  })
);
