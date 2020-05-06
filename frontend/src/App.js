import React, { useState, useEffect } from "react";
import "./App.css";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Objective } from "./components/Objective/Objective";
import { SubjectTo } from "./components/SubjectTo/SubjectTo";
import { Bounds } from "./components/Bounds/Bounds";
import { FirstLevel } from "./components/FirstLevel/FirstLevel";
import { SecondLevel } from "./components/SecondLevel/SecondLevel";
import { SecondLevelItem } from "./components/SecondLevelItem";
import { ThirdLevelItem } from "./components/ThirdLevelItem";
import Navbar from "./components/Navbar";
import { NamesList } from "./components/NamesList";
import { Names } from "./components/Names";

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
      <Router>
        <div className="App">
          <Navbar />
          <div className="p-2">
            {/* <Objective />
          <SubjectTo />
          <Bounds />
          <button type="button" className="btn btn-primary" onClick={createLP}>
            Create LP
          </button> */}
            <Switch>
              <Route exact path="/">
                <FirstLevel
                  setShowFullSecondLevelTable={setShowFullSecondLevelTable}
                />
                {showFullSecondLevelTable && k !== "" && <SecondLevel />}
                {k !== "" && <SecondLevelItem />}
                {selectedThird !== "" && <ThirdLevelItem />}
              </Route>
              <Route exact path="/names">
                <Names />
                {/* <Regions /> */}
              </Route>
              <Route path="/names/:listName">
                <NamesList />
              </Route>
              <Route path="/addNames">
                <NamesList />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  })
);
