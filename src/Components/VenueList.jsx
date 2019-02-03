import React from "react";
import ListItem from "./ListItem";

class VenueList extends React.Component {
  state = {};
  render() {
    return (
      // eslint-disable-next-line
      <ol className="list-unstyled" role="list">
        {this.props.venues &&
          this.props.venues.map((venue, idx) => (
            <ListItem
              key={idx}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ol>
    );
  }
}

export default VenueList;
