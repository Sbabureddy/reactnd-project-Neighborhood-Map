import React from "react";
import ListItem from "./ListItem";

class VenueList extends React.Component {
  state = {};
  render() {
    return (
      // eslint-disable-next-line
      <ol className="list-unstyled list-group d-none d-sm-block mw-100 mh-100" role="list">
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
