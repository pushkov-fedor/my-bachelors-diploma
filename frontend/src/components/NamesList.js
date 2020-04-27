import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";
import { NamesPreview } from "./NamesPreview";
import { NamesInputHeadings } from "./NamesInputHeadings";

export const NamesList = inject("rootStore")(
  observer((props) => {
    const { listName: listNameRouteParam } = useParams();
    const history = useHistory();

    const [listName, setListName] = useState("");
    const [listId, setListId] = useState("");
    const [rawNames, setRawNames] = useState("");
    const [hasHeadings, setHasHeadings] = useState(false);
    const [names, setNames] = useState([]);
    const [headings, setHeadings] = useState([]);

    const saveList = () => {
      props.rootStore.names.saveList({
        listName,
        listId,
        names,
        headings,
      });
    };

    useEffect(() => {
      if (listNameRouteParam === undefined) return;
      const list = toJS(props.rootStore.names.names).find(
        (list) => list.listName === listNameRouteParam
      );
      if (list === undefined) return;
      setListName(list.listName);
      setListId(list.listId);
      const hasHeadings = list.headings.length > 0;
      if (hasHeadings) {
        setRawNames(
          [
            list.headings.map((h) =>
              h.id === undefined ? h.name : `${h.id}:${h.name}`
            ),
            ...list.names,
          ]
            .map((item) => item.join("\t"))
            .join("\n")
        );
        setHasHeadings(hasHeadings);
      } else {
        setRawNames(list.names.map((item) => item.join("\t")).join("\n"));
      }
    }, []);

    useEffect(() => {
      const data = rawNames
        .split("\n")
        .filter((row) => row !== "")
        .map((row) => row.split("\t"));
      if (hasHeadings) {
        const headings = (data.slice(0, 1)[0] || []).map((heading) => {
          const [left, right] = heading.split(":");
          return right === undefined
            ? { id: undefined, name: left.replace(/\s/g, "") }
            : { id: left, name: right.replace(/\s/g, "") };
        });
        setHeadings(headings);
        setNames(data.slice(1));
      } else {
        setHeadings([]);
        setNames(data);
      }
    }, [rawNames, hasHeadings]);
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="input-group d-flex flex-column">
              <label>Введите название списка</label>
              <input
                type="text"
                className="form-control"
                placeholder="Например, отрасли"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
              />
            </div>
            <div className="input-group d-flex flex-column mt-3">
              <label>Введите ID списка</label>
              <input
                type="text"
                className="form-control"
                placeholder="Например, O"
                value={listId}
                onChange={(e) => setListId(e.target.value)}
              />
            </div>
            <div className="input-group d-flex flex-column my-2">
              <label>Вставьте данные</label>
              <textarea
                className="form-control"
                rows="10"
                value={rawNames}
                onChange={(e) => setRawNames(e.target.value)}
              ></textarea>
            </div>
            <div className="input-group d-flex align-items-center my-2">
              <input
                className="mr-3"
                type="checkbox"
                value={hasHeadings}
                checked={hasHeadings}
                onChange={(e) => setHasHeadings((prev) => !prev)}
              />
              <label className="mb-0">
                В первой строке содержатся заголовки
              </label>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={
                listName === "" ||
                listId === "" ||
                names.length === 0 ||
                headings.length === 0
              }
              onClick={() => {
                saveList();
                history.push("/names");
              }}
            >
              Добавить список
            </button>
          </div>
          <div className="col-6">
            <NamesInputHeadings setHeadings={setHeadings} headings={headings} />
            <NamesPreview names={names} headings={headings} />
          </div>
        </div>
      </div>
    );
  })
);
