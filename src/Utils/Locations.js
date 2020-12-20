const {REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET, REACT_APP_VERSION} = process.env;


  const getVenues =   async () => await fetch(
    `https://api.foursquare.com/v2/venues/search?cat=food&near=tirupati&client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&v=${REACT_APP_VERSION}&limit=10`
  ).then(res => res.json())

  export default getVenues;