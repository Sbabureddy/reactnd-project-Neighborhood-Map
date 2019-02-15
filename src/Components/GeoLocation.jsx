const getGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(
        "Latitude: " +
          position.coords.latitude +
          "<br>Longitude: " +
          position.coords.longitude
      );
      this.setState({
        Longitude: position.coords.longitude,
        Latitude: position.coords.latitude
      });
    }, this.showError);
  } else {
    console.log('"Geolocation is not supported by this browser."');
  }
};

const showError = error => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      this.setState({
        Longitude: this.state.Longitude + 3,
        Latitude: this.state.Latitude + 3
      });
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
};
