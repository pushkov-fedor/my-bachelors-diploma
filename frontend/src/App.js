import React, { useState, useEffect } from "react";
import "./App.css";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { Objective } from "./components/Objective/Objective";
import { SubjectTo } from "./components/SubjectTo/SubjectTo";
import { Bounds } from "./components/Bounds/Bounds";
import { FirstLevel } from "./components/FirstLevel/FirstLevel";
import { SecondLevel } from "./components/SecondLevel/SecondLevel";
import { SecondLevelItem } from "./components/SecondLevelItem";
import { ThirdLevelItem } from "./components/ThirdLevelItem";

export const App = inject("rootStore")(
  observer((props) => {
    const { expStore, firstLevel, thirdLevel } = props.rootStore;

    const createLP = expStore.createLP;
    const k = firstLevel.k.get();
    const selectedThird = thirdLevel.selected.get();

    const [showFullSecondLevelTable, setShowFullSecondLevelTable] = useState(
      false
    );
    return (
      <div className="App">
        <div className="p-5">
          {/* <Objective />
          <SubjectTo />
          <Bounds />
          <button type="button" className="btn btn-primary" onClick={createLP}>
            Create LP
          </button> */}
          <FirstLevel
            setShowFullSecondLevelTable={setShowFullSecondLevelTable}
          />
          {showFullSecondLevelTable && k !== "" && <SecondLevel />}
          {k !== "" && <SecondLevelItem />}
          {selectedThird !== "" && <ThirdLevelItem />}
        </div>
      </div>
    );
  })
);
