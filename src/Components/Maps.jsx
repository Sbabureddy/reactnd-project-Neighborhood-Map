import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => (
    <GoogleMap
      defaultZoom={8}
      zoom={props.zoom}
      defaultCenter={{ lat: 13.6288, lng: 79.4192 }}
      // center={props.center}
    >
      {props.markers &&
        props.markers
          .filter((marker) => marker.isVisible)
          .map((marker, idx, arr) => {
            const venueInfo = props.venues.find(
              (venue) => venue.id === marker.id
            );
            return (
              <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => props.handleMarkerClick(marker)}
                animation={
                  arr.lenth === 1
                    ? window.google.maps.Animation.BOUNCE
                    : window.google.maps.Animation.DROP
                }
              >
                {marker.isOpen && (
                  <InfoWindow>
                    <div>
                      <p>{venueInfo.name}</p>
                      <br />
                      <p>{venueInfo.location.formattedAddress}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
    </GoogleMap>
  ))
);

class Maps extends React.Component {
  render() {
    return (
      <div className="col-sm-12 col-md-8">
        <MyMapComponent
          {...this.props}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=${
            process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          }`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Maps;
