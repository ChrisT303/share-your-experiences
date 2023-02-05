const express = require("express");
const { check } = require("express-validator");

const {
  getUser,
  userSignup,
  userLogin,
} = require("../../server/controllers/user");

const router = express.Router();

router.get("/", getUser);

router.post("/signup", [check('name').not().isEmpty(), check('email').normalizeEmail().isEmail(), check('password').isLength({min: 8})],  userSignup);

router.post("/login", userLogin);

module.exports = router;
