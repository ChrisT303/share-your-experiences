const express = require("express");

const {
  getUser,
  userSignup,
  userLogin,
} = require("../../server/controllers/user");

const router = express.Router();

router.get("/", getUser);

router.post("/signup", userSignup);

router.post("/login", userLogin);

module.exports = router;
