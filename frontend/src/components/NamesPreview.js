import React from "react";

export function NamesPreview(props) {
  const { names = [], headings = [] } = props;

  const contentHeadings = headings.flat().map((h) => (
    <th scope="col d-flex flex-column">
      <div>{h.name}</div>
      <div style={{ color: "green" }}>
        {h.id !== undefined ? `ID: ${h.id}` : ""}
      </div>
    </th>
  ));

  const contentNames = names.map((row, index) => {
    const th = <th scope="row">{index + 1}</th>;
    const dataRow = row.map((item) => <td>{item}</td>);
    return <tr>{[th, ...dataRow]}</tr>;
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          {contentHeadings}
        </tr>
      </thead>
      <tbody>{contentNames}</tbody>
    </table>
  );
}
