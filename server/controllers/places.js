
const { validationResult } = require("express-validator");

const ErrorHandler = require("../models/error.js");
const getAddressCoords = require("../util/location.js");
const Place = require("../models/place.js");

let fillerPlaces = [
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

const getPlaceByID = async (req, res, next) => {
  const placeIdentifier = req.params.placeID;

  let place;
  try {
    place = await Place.findById(placeIdentifier);
  } catch (err) {
    const error = new ErrorHandler(
      "An error occurred, could not find place",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new ErrorHandler("No place found by given id", 404);
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserID = async (req, res, next) => {
  const userID = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: userID });
  } catch (err) {
    const error = new ErrorHandler(
      "Error finding places, please try again",
      500
    );
    return next(error);
  }
  if (!places || places.length === 0) {
    return next(new ErrorHandler("No place found by given user id", 404));
  }
  res.json({ places: places.map((p) => p.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler("Invalid entry", 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getAddressCoords(address);
  } catch (error) {
    return next(error);
  }

  const createPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://www.denverpost.com/wp-content/uploads/2018/06/GettyImages-161361450.jpg?w=620",
    creator,
  });

  try {
    await createPlace.save();
  } catch (err) {
    const error = new ErrorHandler("Post failed. Please try again", 500);
    return next(error);
  }

  res.status(201).json({ place: createPlace });
};

const updatePlace = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ErrorHandler("Invalid entry", 422);
  }
  const { title, description } = req.body;
  const placeID = req.params.placeID;

  const updatePlace = { ...fillerPlaces.find((p) => p.id === placeID) };
  const placeIndex = fillerPlaces.findIndex((p) => p.id === placeID);
  updatePlace.title = title;
  updatePlace.description = description;

  fillerPlaces[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlace = (req, res) => {
  if (fillerPlaces.find((p) => p.id === placeIdentifier)) {
    throw new ErrorHandler("No place found with this id");
  }
  const placeIdentifier = req.params.placeID;
  fillerPlaces = fillerPlaces.filter((p) => p.id !== placeIdentifier);
  res.status(200).json({ message: "Post has been deleted" });
};

module.exports = {
  getPlaceByID,
  getPlacesByUserID,
  createPost,
  updatePlace,
  deletePlace,
};
