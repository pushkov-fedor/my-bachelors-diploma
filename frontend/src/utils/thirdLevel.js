export const combineDataWithHeaders = (
  data,
  namesArr,
  thirdLevelNamesListId,
  type
) => {
  let { names: nameHeadersList = [], headings = [] } =
    namesArr.find((r) => r.listId === thirdLevelNamesListId[0]) || {};
  const filterIndex = headings.findIndex(
    ({ id = "" }) => id === thirdLevelNamesListId[1]
  );
  if (filterIndex !== -1) {
    nameHeadersList = nameHeadersList.filter(
      (name) => name[filterIndex] === "1"
    );
  }
  const topNameHeaders = nameHeadersList.map((name) => ({
    value: name[0],
    readOnly: true,
  }));
  const sideNameHeaders = [...topNameHeaders];
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

export const getDataHeaders = (namesArr, thirdLevelNamesListId) => {
  let { names: nameHeadersList = [], headings = [] } =
    namesArr.find((r) => r.listId === thirdLevelNamesListId[0]) || {};
  const filterIndex = headings.findIndex(
    ({ id = "" }) => id === thirdLevelNamesListId[1]
  );
  if (filterIndex !== -1) {
    nameHeadersList = nameHeadersList.filter(
      (name) => name[filterIndex] === "1"
    );
  }
  const topNameHeaders = nameHeadersList.map((name) => ({
    value: name[0],
    readOnly: true,
  }));
  const sideNameHeaders = topNameHeaders.map((header) => [header]);
  return [sideNameHeaders, [topNameHeaders]];
};
