import React, { Component } from "react";
// eslint-disable-next-line
import logo from "./logo.svg";
import "./App.css";
import Maps from "./Components/Maps";
import * as LocationsAPI from "./API/Locations";
import Sidebar from "./Components/Sidebar";
import ErrorBoundary from "./Components/ErrorBoundary";
import Footer from "./Components/FooterComponent";
import Header from "./Components/HeaderComponent";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: (obj) => {
        this.setState({ obj });
      },
    };
  }

  // Handling marker close
  closeAllMarkers = () => {
    const markers = this.state.markers.map((marker) => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  };

  // Handling marker click
  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find((venue) => venue.id === marker.id);
    LocationsAPI.getVenues(marker.id).then((res) => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
    });
  };

  // Handling ListItem click

  handleListItemClick = (venue) => {
    const marker = this.state.markers.find((marker) => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

  // Checkign for Google Maps API error

  gm_authFailure() {
    window.alert("Google Maps error!");
  }

  componentDidMount() {
    // Calling google maps error checking function

    window.gm_authFailure = () => this.gm_authFailure();

    // Getting data from Foursquare API
    LocationsAPI.getVenues()
      .then((result) => {
        const { venues } = result.response;
        const { center } = result.response.geocode.feature.geometry.center;
        const markers = venues.map((venue) => {
          return {
            lat: venue.location.lat,
            lng: venue.location.lng,
            isOpen: false,
            isVisible: true,
            id: venue.id,
          };
        });

        this.setState({ venues, center, markers });
      })
      .catch((err) => alert(err));
  }
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <ErrorBoundary>
          <div className="row mt-4">
            <Sidebar
              {...this.state}
              handleListItemClick={this.handleListItemClick}
            />
            <Maps
              {...this.state}
              handleMarkerClick={this.handleMarkerClick}
              role="application"
              aria-hidden="true"
            />
          </div>
        </ErrorBoundary>
        <Footer />
      </div>
    );
  }
}

export default App;
