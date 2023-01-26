import React from "react";
import { useParams } from "react-router-dom";
import PlacesList from "../components/PlacesList";

const PlaceHolderPlaces = [
  {
    id: "p1",
    title: "Mile High Stadium",
    description: "where the broncos play football",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Denver_Mile_High_Stadium_postcard_%28c._1970s-1980s%29.jpg",
    address: "1701 Bryant St, Denver, CO 80204",
    location: {
      lat: 39.7438936,
      lng: -105.0201094,
    },

    userFilter: "u1",
  },
  {
    id: "p2",
    title: "Broncos Stadium",
    description: "where the broncos play football",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Denver_Mile_High_Stadium_postcard_%28c._1970s-1980s%29.jpg",
    address: "1701 Bryant St, Denver, CO 80204",
    location: {
      lat: 39.7438936,
      lng: -105.0201094,
    },
    userFilter: "u2",
  },
];

const PlacesUser = () => {
  const userId = useParams().userId;
  const userPlaces = PlaceHolderPlaces.filter(place => place.userFilter === userId);
  return <PlacesList items={userPlaces} />;
};

export default PlacesUser;
