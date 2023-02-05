const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const ErrorHandler = require("../../server/models/error.js");
const getAddressCoords = require('../../server/util/location.js');

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

const getPlacesByUserID = (req, res) => {
  try {
    const userID = req.params.uuid;
    const places = fillerPlaces.filter((p) => {
      return (p.creator = userID);
    });
    if (!places || places.length === 0) {
      throw new ErrorHandler("No place found by given user id", 404);
    }
    res.json({ places });
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 500).json({
      message: error.message || "An unknown error occurred!",
    });
  }
};

const createPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next (new ErrorHandler("Invalid entry", 422));
  }

  const { title, description, address, creator } = req.body;
 
  let coordinates;
  try {
    
    coordinates = await getAddressCoords(address)
  }catch(error){
   return next(error)
  }
  


  const createPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };
  fillerPlaces.push(createPlace);

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
  if(fillerPlaces.find(p => p.id === placeID )) {
    throw new ErrorHandler('No place found with this id')
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
