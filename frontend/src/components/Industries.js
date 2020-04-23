import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { IndustryInput } from "./IndustryInput";

export const Industries = inject("rootStore")(
  observer((props) => {
    const { names } = props.rootStore;

    const industries = toJS(names.industries);

    const content = industries.map((_, index) => <IndustryInput id={index} />);

    return (
      <div>
        <table className="table w-50">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Отрасли</th>
              <th scope="col">Мнемоника</th>
              <th scope="col">Признак транспортабельности</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
        <button
          type="button"
          className="btn btn-primary my-3"
          onClick={() => names.addIndustry()}
        >
          Добавить отрасль
        </button>
      </div>
    );
  })
);
