import React from "react";
import { inject, observer } from "mobx-react";

export const SelectAllButton = inject("rootStore")(
  observer((props) => {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "inset",
          position: "fixed",
          bottom: "50px",
          right: "160px",
          width: "110px",
          height: "110px",
        }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "40px",
            height: "40px",
            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
            cursor: "pointer",
            backgroundColor: "white",
          }}
          onClick={props.selectAll}
        >
          <i class="fas fa-object-ungroup"></i>
        </div>
      </div>
    );
  })
);
