import React from "react";
import "./App.css";
import { inject, observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Objective } from "./components/Objective/Objective";
// import { SubjectTo } from "./components/SubjectTo/SubjectTo";
// import { Bounds } from "./components/Bounds/Bounds";
import { FirstLevel } from "./components/FirstLevel/FirstLevel";
import { SecondLevel } from "./components/SecondLevel";
import { ThirdLevel } from "./components/ThirdLevel";
import { LevelNavigation } from "./components/LevelNavigation";
import Navbar from "./components/Navbar";
import { NamesList } from "./components/NamesList";
import { Names } from "./components/Names";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const App = inject("rootStore")(
  observer((props) => {
    const { uiStore } = props.rootStore;

    const currentLevel = uiStore.currentLevel.get();

    // const createLP = expStore.createLP;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="p-2 pt-5 mt-5">
            {/* <Objective />
          <SubjectTo />
          <Bounds />
          <button type="button" className="btn btn-primary" onClick={createLP}>
            Create LP
          </button> */}
            <Switch>
              <Route exact path="/">
                <div
                  className="d-flex align-items-center justify-content-center p-2"
                  style={{ width: "100vw" }}
                >
                  <LevelNavigation />
                </div>
                <TransitionGroup>
                  {currentLevel === 1 && (
                    <CSSTransition
                      key={"firstLevel"}
                      timeout={200}
                      classNames="fade"
                      in={currentLevel === 1}
                      unmountOnExit
                    >
                      <div>
                        <FirstLevel />
                      </div>
                    </CSSTransition>
                  )}
                  {currentLevel === 2 && (
                    <CSSTransition
                      key={"secondLevel"}
                      timeout={200}
                      classNames="fade"
                      in={currentLevel === 2}
                      unmountOnExit
                    >
                      <div>
                        <SecondLevel />
                      </div>
                    </CSSTransition>
                  )}
                  {currentLevel === 3 && (
                    <CSSTransition
                      key={"thirdLevel"}
                      timeout={200}
                      classNames="fade"
                      in={currentLevel === 3}
                      unmountOnExit
                    >
                      <div>
                        <ThirdLevel />
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </Route>
              <Route exact path="/names">
                <Names />
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
