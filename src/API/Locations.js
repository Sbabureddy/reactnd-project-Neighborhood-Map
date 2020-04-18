import { CLIENT_ID, CLIENT_SECRET } from "../config_keys";
const v = 20181120;

export const getVenues = async () =>
  fetch(
    `https://api.foursquare.com/v2/venues/search?cat=food&near=tirupati&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${v}&limit=10`
  ).then((response) => response.json());
