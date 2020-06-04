export default (data, index) => {
  const arr = data.flat();
  const dataItem = arr[index];
  if (dataItem && dataItem.type && dataItem.type !== "empty") return dataItem;
};
