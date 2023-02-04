const express = require("express");
const {
  getPlaceByID,
  getPlacesByUserID,
  createPost,
  updatePlace,
  deletePlace
} = require("../../server/controllers/places");

const router = express.Router();

router.get("/:placeID", getPlaceByID);
router.get("/user/:uid", getPlacesByUserID);
router.post("/", createPost);
router.patch("/:placeID", updatePlace);
router.delete("/:placeID", deletePlace);

module.exports = router;
