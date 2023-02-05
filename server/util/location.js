const axios = require("axios");
const ErrorHandler = require("../../server/models/error.js");

const API_KEY = "AIzaSyB2Z9Xq5bD4ypiSXbFnNvy15JHN0qEj_q4";

async function convertAddressToCoords(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new ErrorHandler(
      "Could not find the location with given address",
      422
    );
    throw error
  }

  const coordinates = data.results[0].geometry.location

  return coordinates
}

module.exports = convertAddressToCoords
