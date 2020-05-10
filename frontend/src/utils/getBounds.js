export default (firstLevelData, column, row, errors) => {
  const { data } = firstLevelData.find(({ column: c }) => c === column) || [];
  if (column === 0 || row === 0) {
    errors.push("Попытка получния границ для элементов 0 столбца или 0 строки");
    return { leftBound: null, topBound: null };
  }
  return { leftBound: firstLevelData[0].data[row], topBound: data[0] };
};
