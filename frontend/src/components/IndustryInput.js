import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const IndustryInput = inject("rootStore")(
  observer((props) => {
    const { id } = props;
    const { names } = props.rootStore;

    const industry = toJS(names.industries).find(
      (industry) => industry.id === id
    );

    const [industryName, setIndustryName] = useState(industry.industryName);
    const [industryNameShort, setIndustryNameShort] = useState(
      industry.industryNameShort
    );
    const [isTransportability, setIsTransportability] = useState(
      industry.isTransportability
    );
    useEffect(() => {
      names.updateIndustries({
        id,
        industryName,
        industryNameShort,
        isTransportability,
      });
    }, [industryName, industryNameShort, isTransportability]);
    return (
      <tr>
        <th scope="row">{industry.id}</th>
        <td>
          <input
            type="text"
            value={industryName}
            onChange={(e) => setIndustryName(e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={industryNameShort}
            style={{ width: "100px" }}
            onChange={(e) => setIndustryNameShort(e.target.value)}
          />
        </td>
        <td>
          <input
            type="checkbox"
            value={isTransportability}
            onChange={(e) => setIsTransportability(e.target.value)}
          />
        </td>
      </tr>
    );
  })
);
