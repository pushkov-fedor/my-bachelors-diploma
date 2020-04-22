import {
  k,
  getFirstLevelDataColumn,
  transportPairs,
} from "../stores/firstLevel";

export default (column, { id, type }) => {
  const end = k.get();
  let view = "";
  if (end !== "") {
    const { type: columnType } = getFirstLevelDataColumn(column);
    switch (type) {
      case "row":
        if (columnType === "Transport") {
          const pairs = transportPairs.get();
          view = `${id}:1-${pairs.length}`;
        } else {
          view = `${id}:1-${end}`;
        }
        break;
      case "column":
        view = `${id}:1|${end}`;
        break;
      case "single":
        view = `${id}`;
        break;
      case "matrix":
        if (columnType === "Transport") {
          const pairs = transportPairs.get();
          view = `${id}:1-${pairs.length}:1|${k.get()}`;
        } else {
          view = `${id}:1-${end}:1|${end}`;
        }
        break;
    }
  } else {
    view = id;
  }
  return view;
};
