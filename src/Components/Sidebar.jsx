import React from "react";
import VenueList from "./VenueList";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      venues: []
    };
    this.textInput = React.createRef();
  }
  // filter venues based on search input
  handleFilterVenues = () => {
    if (this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };
  // controlled input
  handleChange = e => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isMatched) {
        marker.isVisible = true;
      } else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };
  render() {
    return (
      <div className='col-sm-12 col-md-4 mx-auto '>
        <div className="input-group mb-3">
          <input
            type="text"
            id="search"
            placeholder="Venues in Tirupati"
            onChange={this.handleChange}
            ref={this.textInput}
            className='form-control'
          />
          <div class="input-group-prepend">
            <div class="input-group-text"><i class="fa fa-search" aria-hidden="true"></i></div>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 mx-auto">
            <VenueList
              {...this.props}
              venues={this.handleFilterVenues()}
              handleListItemClick={this.props.handleListItemClick}
            />
        </div>
      </div>
    );
  }
}

export default Sidebar;
