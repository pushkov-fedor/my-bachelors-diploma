import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { RegionInput } from "./RegionInput";

export const Regions = inject("rootStore")(
  observer((props) => {
    const { names } = props.rootStore;

    const regions = toJS(names.regions);

    const content = regions.map((_, index) => <RegionInput id={index} />);

    return (
      <div>
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Регион</th>
              <th scope="col">Мнемоника</th>
              <th scope="col">Связь с другими регионами</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={() => names.addRegion()}
        >
          Добавить регион
        </button>
      </div>
    );
  })
);
