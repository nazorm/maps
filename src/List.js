import React from "react";
import Item from "./Item";
import "./App.css";

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const location = this.props.places.map((d, id) => {
      return (
        <Item
          key = {id}
          image={d.photo}
          name={d.name}
          lat = {d.geometry.location.lat}
          long = {d.geometry.location.lng}
          address={d.vicinity}
          ratings={d.rating}
        />
      );
    });
    return (
      <div className="container">
      
       
        {location}
      </div>
    );
  }
}

export default List;
