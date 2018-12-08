import React from "react";

class ListItem extends React.Component {
  render() {
    return (
      <li
        className="listItem"
        onClick={() => this.props.handleListItemClick(this.props)}
        tabIndex={1}
      >
        <img
          src={
            this.props.categories[0].icon.prefix +
            32 +
            this.props.categories[0].icon.suffix
          }
          alt={this.props.categories[0].name}
        />
        {this.props.name}
      </li>
    );
  }
}

export default ListItem;
