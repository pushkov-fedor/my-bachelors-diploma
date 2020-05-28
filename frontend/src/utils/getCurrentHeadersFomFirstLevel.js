export default (row, col, firstLevelData) => {
  const sideHeaders = [
    "",
    "Объём потребления",
    "Границы",
    "Границы",
    "Границы",
  ];
  const topHeaders = firstLevelData.map(({ title }) => title);

  return [sideHeaders[row], topHeaders[col]];
};
