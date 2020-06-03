export default (data, topHeaders, sideHeaders) => {
  const result = [...data];
  result.unshift(topHeaders.map((header) => ({ id: header, readOnly: true })));
  result.forEach((row, index) => {
    row.unshift({ id: sideHeaders[index], readOnly: true });
  });
  return result;
};
