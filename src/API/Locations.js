const client_id = "YNLVQCFTSTPGGQ5RWTODM44K0LVRJGZKDFDGLRCXIAZBHHBZ";
const client_secret = "1Z0VDGRFB2AON2LGX2IGA0VWD143QUDQD44Q24MSKU5J4P5M";
const v = 20181120;
export const getVenues = () => {
  return fetch(
    `https://api.foursquare.com/v2/venues/search?cat=food&near=tirupati&client_id=${client_id}&client_secret=${client_secret}&v=${v}&limit=10`
  )
    .then(resp => resp.json())
    .then(result => result);
};
