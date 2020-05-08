export default (firstLevelData, column, row) => {
    const {data} = firstLevelData.find(({column: c}) => c === column) || []
    if(column === 0 || row === 0) return { leftBound: null, topBound: null }
    return {leftBound: firstLevelData[0].data[row], topBound: data[0]}
}