export default (firstLevelData) => {
  let maxHeight = 0;
  firstLevelData.forEach((col) => {
    const height = col.data.length;
    if (height > maxHeight) maxHeight = height;
  });
  const data = [];
  for (let i = 0; i < maxHeight; i++) {
    data.push([]);
    firstLevelData.forEach((col, index) => {
      if (col.data[i]) data[i][index] = col.data[i];
    });
  }
  return data;
};
