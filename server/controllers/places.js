const { validationResult } = require("express-validator");

const ErrorHandler = require("../models/error.js");
const getAddressCoords = require("../util/location.js");
const Place = require("../models/place.js");



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

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ErrorHandler("Invalid entry", 422);
  }
  const { title, description } = req.body;
  const placeID = req.params.placeID;

  let place;
  try {
    place = await Place.findById(placeID);
  } catch (err) {
    const error = new ErrorHandler(
      "An error occurred, could not find. Please try again",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new ErrorHandler(
      "An error occurred, could not update. Please try again",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeIdentifier = req.params.placeID;

  let place;
  try {
    place = await Place.findById(placeIdentifier);
  } catch (err) {
    const error = new ErrorHandler(
      '"An error occurred, could not delete. Please try again"',
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new ErrorHandler(
      "An error occurred, could not delete. Please try again",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Post has been deleted" });
};

module.exports = {
  getPlaceByID,
  getPlacesByUserID,
  createPost,
  updatePlace,
  deletePlace,
};
