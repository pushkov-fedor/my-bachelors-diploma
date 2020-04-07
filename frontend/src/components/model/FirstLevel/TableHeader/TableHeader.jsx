import React from "react";

export const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">Объем производства внутри региона</th>
        <th scope="col">Конечное потребление</th>
        <th scope="col">Максимальный ввоз/вывоз</th>
        <th scope="col">Импорт</th>
        <th scope="col">Экспорт</th>
        <th scope="col" colSpan="2">
          Ограничения
        </th>
      </tr>
    </thead>
  );
};
