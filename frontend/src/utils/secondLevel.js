export const combineDataWithHeaders = (
  data,
  listNames,
  topDataObject,
  type
) => {
  const sideNameHeaders = listNames.map((name) => ({
    value: name[0],
    readOnly: true,
  }));
  const topNameHeaders =
    sideNameHeaders.length < topDataObject.length
      ? topDataObject.map(({ i, j }) => {
          const name1 = listNames[i - 1][0];
          const name2 = listNames[j - 1][0];
          return {
            value: `${name1}
${name2}`,
            readOnly: true,
          };
        })
      : [...sideNameHeaders];
  let result;
  switch (type) {
    case "row":
      result = data.map((data) => data);
      result.unshift(topNameHeaders);
      break;
    case "column":
      result = data.map((data) => data.map((data) => data));
      result.forEach((row, index) => row.unshift(sideNameHeaders[index]));
      break;
    default:
      result = data.map((data) => data.map((data) => data));
      result.unshift(topNameHeaders);
      sideNameHeaders.unshift({ value: "", readOnly: true });
      result.forEach((row, index) => row.unshift(sideNameHeaders[index]));
      break;
  }
  return result;
};

export const getColRowByShapeItem = (data, shapeItem) => {
  let col, row;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j].value === shapeItem.value) {
        row = i;
        col = j;
        break;
      }
    }
  }
  return [col, row];
};
