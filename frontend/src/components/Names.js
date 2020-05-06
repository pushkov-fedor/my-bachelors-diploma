import React from "react";
import { Link } from "react-router-dom";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

export const Names = inject("rootStore")(
  observer((props) => {
    const { names } = props.rootStore;
    const namesList = toJS(names.names);

    const content = namesList.map((list) => (
      <Link to={`/names/${list.listName}`}>
        <span style={{ color: "green" }}>[{list.listId}] </span>
        {list.listName}
      </Link>
    ));
    return (
      <div className="d-flex flex-column">
        <h4>Список всех сохраненных имен</h4>
        {content}
        <Link to="/addNames" className="btn btn-primary w-25 my-3">
          Добавить список
        </Link>
      </div>
    );
  })
);
