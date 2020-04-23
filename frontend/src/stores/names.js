import { observable, action, autorun, toJS } from "mobx";

const industries = observable([]);
const setIndustries = action((ins) => {
  while (industries.length > 0) industries.pop();
  ins.forEach((industry) => {
    industries.push(industry);
  });
});
const updateIndustries = action((industry) => {
  const industriesCopy = toJS(industries).slice();
  const industryToUpdate = industriesCopy.find((ind) => ind.id === industry.id);
  industryToUpdate.industryName = industry.industryName;
  industryToUpdate.industryNameShort = industry.industryNameShort;
  industryToUpdate.isTransportability = industry.isTransportability;
  setIndustries(industriesCopy);
});
const addIndustry = action(() => {
  const industriesCopy = toJS(industries).slice();
  industriesCopy.push({
    id: industriesCopy.length,
    industryName: "",
    industryNameShort: "",
    isTransportability: false,
  });
  setIndustries(industriesCopy);
});

const regions = observable([]);
const setRegions = action((rs) => {
  while (regions.length > 0) regions.pop();
  rs.forEach((region) => regions.push(region));
});
autorun(() => console.log(toJS(regions)));
const updateRegions = action((region) => {
  const regionsCopy = toJS(regions);
  const regionToUpdate = regionsCopy.find((r) => r.id === region.id);
  regionToUpdate.regionName = region.regionName;
  regionToUpdate.regionNameShort = region.regionNameShort;
  regionToUpdate.connections = region.connections;
  setRegions(regionsCopy);
});
const addRegion = action(() => {
  const regionsCopy = toJS(regions).slice();
  regionsCopy.push({
    id: regionsCopy.length,
    regionName: "",
    regionNameShort: "",
    connections: "",
  });
  setRegions(regionsCopy);
});

export default {
  industries,
  regions,
  updateIndustries,
  updateRegions,
  addIndustry,
  addRegion,
  setIndustries,
  setRegions,
};
