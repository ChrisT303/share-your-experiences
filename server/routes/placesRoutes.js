const express = require("express");
const { check } = require("express-validator");
const {
  getPlaceByID,
  getPlacesByUserID,
  createPost,
  updatePlace,
  deletePlace,
} = require("../../server/controllers/places");

const router = express.Router();

router.get("/:placeID", getPlaceByID);
router.get("/user/:uid", getPlacesByUserID);
router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  createPost
);
router.patch(
  "/:placeID",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  updatePlace
);
router.delete("/:placeID", deletePlace);

module.exports = router;
