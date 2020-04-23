import React, { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

export const RegionInput = inject("rootStore")(
  observer((props) => {
    const { id } = props;
    const { names } = props.rootStore;

    const region = toJS(names.regions).find((region) => region.id === id);

    const [regionName, setRegionName] = useState(region.regionName);
    const [regionNameShort, setRegionNameShort] = useState(
      region.regionNameShort
    );
    const [connections, setConnections] = useState(region.connections);

    useEffect(() => {
      names.updateRegions({ id, regionName, regionNameShort, connections });
    }, [regionName, regionNameShort, connections]);
    return (
      <tr>
        <th scope="row">{region.id}</th>
        <td>
          <input
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={regionNameShort}
            onChange={(e) => setRegionNameShort(e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={connections}
            onChange={(e) => setConnections(e.target.value)}
          />
        </td>
      </tr>
    );
  })
);
