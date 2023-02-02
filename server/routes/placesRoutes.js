const express = require("express");

const router = express.Router();

const fillerPlaces = [
  {
    id: "p1",
    title: "Broncos Stadium",
    description: "where the Broncos play football",
    location: {
      lat: 39.7438936,
      lng: -105.0201094,
    },
    address: "1701 Bryant St, Denver, CO 80204",
    creator: "u1",
  },
];

router.get("/:placeID", (req, res) => {
  const placeIdentifier = req.params.placeID;
  const place = fillerPlaces.find((p) => {
    return p.id === placeIdentifier;
  });
  if (!place) {
    const error = new Error("No place found by given id");
    error.code = 404;
    throw error;
  }
  res.json({ place });
});

router.get("/user/:uid", (req, res) => {
  const userID = req.params.uid;
  const place = fillerPlaces.find((p) => {
    return (p.creator = userID);
  });
  if (!place) {
    const error = new Error("No place found by given user id");
    error.code = 404;
    throw error;
  }
  res.json({ place });
});

module.exports = router;
