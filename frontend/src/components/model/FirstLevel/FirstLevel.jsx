import React from "react";
import { inject, observer } from "mobx-react";
import { TableHeader } from "./TableHeader/TableHeader";
import { Input } from "./Input/Input";

export const FirstLevel = inject("rootStore")(
  observer(() => {
    return (
      <div>
        <table className="table table-bordered">
          <TableHeader />
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td>
                <Input id="X" />
              </td>
              <td>
                <Input id="Z" />
              </td>
              <td>
                <Input id="T" />
              </td>
              <td>
                <Input id="I" />
              </td>
              <td>
                <Input id="E" />
              </td>
              <td>{"<=>"}</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row">Объем потребления</th>
              <td>
                <Input id="Y" />
              </td>
              <td>
                <Input id="A" />
              </td>
              <td>
                <Input id="P" />
              </td>
              <td>
                <Input id="B" />
              </td>
              <td>
                <Input id="C" />
              </td>
              <td>
                <Input id="D" />
              </td>
              <td>
                <Input id="S" />
              </td>
              <td>
                <Input id="R" />
              </td>
            </tr>
            <tr>
              <th scope="row" rowSpan="4">
                Границы
              </th>
              <td>{"<"}</td>
              <td>
                <Input id="XГ" />
              </td>
              <td>
                <Input id="ZГ" />
              </td>
              <td>
                <Input id="ТГ" />
              </td>
              <td>
                <Input id="IГ" />
              </td>
              <td>
                <Input id="ЕГ" />
              </td>
            </tr>
            <tr>
              <td>{">"}</td>
              <td>
                <Input id="ХL" />
              </td>
              <td>
                <Input id="ZL" />
              </td>
              <td>
                <Input id="ТL" />
              </td>
              <td>
                <Input id="IL" />
              </td>
              <td>
                <Input id="ЕL" />
              </td>
            </tr>
            <tr>
              <td>{"="}</td>
              <td>
                <Input id="ХE" />
              </td>
              <td>
                <Input id="ZE" />
              </td>
              <td>
                <Input id="ТE" />
              </td>
              <td>
                <Input id="IE" />
              </td>
              <td>
                <Input id="ЕE" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  })
);
