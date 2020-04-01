export const matrixMultiplication = (matrix1, matrix2) => {
  try {
    let result = [];
    matrix1.forEach(row => result.push([]));

    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix2[0].length; j++) {
        let cell = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          cell += matrix1[i][k] * matrix2[k][j];
        }
        result[i][j] = cell;
      }
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const matrixSum = (matrix1, matrix2) => {
  return matrix1.map((item, i) =>
    item.map((item, j) => Number(item) + Number(matrix2[i][j]))
  );
};

export const matrixSumOnVariables = (matrix1, matrix2) => {
  return matrix1.map((item, i) =>
    item.map((item, j) => `${item}+${matrix2[i][j]}`)
  );
};

export const matrixMinus = (matrix1, matrix2) => {
  return matrix1.map((item, i) =>
    item.map((item, j) => Number(item) - Number(matrix2[i][j]))
  );
};

export const matrixMinusOnVariables = (matrix1, matrix2) => {
  return matrix1.map((item, i) =>
    item.map((item, j) => `${item}-${matrix2[i][j]}`)
  );
};

export const matrixMultiplicationOnVariables = (matrix1, matrix2) => {
  try {
    let result = [];
    matrix1.forEach(row => result.push([]));

    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix2[0].length; j++) {
        let cell = [];
        for (let k = 0; k < matrix1[0].length; k++) {
          cell.push(`${matrix1[i][k]}*${matrix2[k][j]}`);
        }
        result[i][j] = cell.join("+");
      }
    }
    return result;
  } catch (error) {
    console.error(error);
  }
};
