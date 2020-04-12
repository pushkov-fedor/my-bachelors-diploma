import React from "react";
import { inject, observer } from "mobx-react";
import { Objective } from "./components/Objective/Objective";
import { SubjectTo } from "./components/SubjectTo/SubjectTo";
import { Bounds } from "./components/Bounds/Bounds";
import { FirstLevel } from "./components/FirstLevel/FirstLevel";
import "./App.css";
import { SecondLevel } from "./components/SecondLevel/SecondLevel";

export const App = inject("rootStore")(
  observer((props) => {
    const createLP = props.rootStore.expStore.createLP;
    return (
      <div className="App">
        <div className="p-5">
          {/* <Objective />
          <SubjectTo />
          <Bounds />
          <button type="button" className="btn btn-primary" onClick={createLP}>
            Create LP
          </button> */}
          <FirstLevel />
          <SecondLevel />
        </div>
      </div>
    );
  })
);
