import React from "react";
import { inject, observer } from "mobx-react";

export const LevelNavigation = inject("rootStore")(
  observer((props) => {
    const { uiStore } = props.rootStore;
    const currentLevel = uiStore.currentLevel.get();
    return (
      <div className="d-flex">
        <div
          className="rounded-circle bg-dark"
          style={{
            width: "20px",
            height: "20px",
            opacity: currentLevel === 1 ? 1 : 0.4,
          }}
          onClick={() => uiStore.setCurrentLevel(1)}
        ></div>
        <div
          className="rounded-circle bg-dark"
          style={{
            width: "20px",
            height: "20px",
            opacity: currentLevel === 2 ? 1 : 0.4,
          }}
          onClick={() => uiStore.setCurrentLevel(2)}
        ></div>
        <div
          className="rounded-circle bg-dark"
          style={{
            width: "20px",
            height: "20px",
            opacity: currentLevel === 3 ? 1 : 0.4,
          }}
          onClick={() => uiStore.setCurrentLevel(3)}
        ></div>
      </div>
    );
  })
);
