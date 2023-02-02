const ErrorHandler = require("../../server/models/error.js");

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

const getPlaceByID = (req, res) => {
  try {
    const placeIdentifier = req.params.placeID;
    const place = fillerPlaces.find((p) => {
      return p.id === placeIdentifier;
    });
    if (!place) {
      throw new ErrorHandler("No place found by given id", 404);
    }
    res.json({ place });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "An unknown error occurred!",
    });
  }
};

const getByUserID = (req, res) => {
  try {
    const userID = req.params.uid;
    const place = fillerPlaces.find((p) => {
      return (p.creator = userID);
    });
    if (!place) {
      throw new ErrorHandler("No place found by given id", 404);
    }
    res.json({ place });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "An unknown error occurred!",
    });
  }
};

exports.getPlaceByID = getPlaceByID;
exports.getByUserID = getByUserID;
