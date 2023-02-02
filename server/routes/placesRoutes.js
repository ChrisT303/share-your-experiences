const express = require("express");

const placeControllers = require('../../server/controllers/places')

const router = express.Router();



router.get("/:placeID", placeControllers.getPlaceByID)

router.get("/user/:uid", placeControllers.getByUserID)

module.exports = router;
