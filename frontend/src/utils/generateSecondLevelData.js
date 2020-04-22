import create2dArray from "./create2dArray";

export default (item, columnType, k, transportPairs) => {
  const { id, type: dataType } = item;
  switch (dataType) {
    case "empty":
      return { type: dataType, data: null };
    case "column":
      const columnItems = [];
      for (let i = 1; i <= k; i++) columnItems.push({ id: `${id}${i}` });
      return { type: dataType, data: columnItems };
    case "single":
      return { type: dataType, data: { id: `${id}` } };
    case "row":
      const rowItems = [];
      switch (columnType) {
        case "Transport":
          // index + 1, потому что index начинается с 0
          transportPairs.forEach((_, index) =>
            rowItems.push({ id: `${id}${index + 1}` })
          );
          break;
        default:
          for (let i = 1; i <= k; i++) rowItems.push({ id: `${id}${i}` });
      }
      return { type: dataType, data: rowItems };
    case "matrix":
      let matrix = [];
      switch (columnType) {
        case "Transport":
          matrix = transportPairs.map((column) =>
            column.map(({ i = "", j = "" }) => ({ id: `${id}${i}${j}` }))
          );
          break;
        default:
          matrix = create2dArray(k);
          for (let i = 0; i < k; i++) {
            for (let j = 0; j < k; j++) matrix[i][j] = { id };
          }
          for (let i = 1; i <= k; i++)
            matrix[i - 1][i - 1] = { id: `${id}${i}${i}` };
      }
      return { type: dataType, data: matrix };
    default:
      return { type: dataType, data: null };
  }
};
