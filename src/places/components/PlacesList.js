import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlacesItem from "./PlacesItem";
import "./PlacesList.css";

const PlacesList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place_list center">
        <Card>No Places Found</Card>
        <button>Share Place</button>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlacesItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          userId={place.user}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
