export default (
  namesArr,
  topShapeObject,
  secondLevelNamesListId,
  secondLevelRow,
  secondLevelCol
) => {
  const { names: secondLevelNamesList = [] } =
    namesArr.find((r) => r.listId === secondLevelNamesListId) || {};

  const secondLevelSideNames = secondLevelNamesList.map((name) => name[0]);
  const secondLevelTopNames =
    secondLevelSideNames.length < topShapeObject.length
      ? topShapeObject.map(({ i, j }) => {
          const name1 = secondLevelNamesList[i - 1][0];
          const name2 = secondLevelNamesList[j - 1][0];
          return [name1, name2];
        })
      : secondLevelSideNames;
  const fromSecondLevelSideName = secondLevelSideNames[secondLevelRow];
  const fromSecondLevelTopName = secondLevelTopNames[secondLevelCol];
  return [fromSecondLevelSideName, fromSecondLevelTopName];
};
