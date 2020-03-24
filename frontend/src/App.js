import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/mps/rows/get")
      .then(response => response.json())
      .then(response => setRows(response))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/mps/columns/get")
      .then(response => response.json())
      .then(response => setColumns(response))
      .catch(error => console.error(error));
  }, []);

  const columnEls = columns.map(column => <th scope="col">{column}</th>);
  console.log(columns);

  const rowsEls = rows.map(row => (
    <tr>
      <th scope="row">{row}</th>
    </tr>
  ));

  return (
    <div className="App">
      <div className="container"></div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col"></th>
            {columnEls}
          </tr>
        </thead>
        <tbody>{rowsEls}</tbody>
      </table>
    </div>
  );
}

export default App;
