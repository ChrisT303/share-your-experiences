const { validationResult } = require("express-validator");

const ErrorHandler = require("../models/error.js");
const User = require("../models/user.js");

const getUser = async (req, res) => {
  let findUser;

  try {
    findUser = await User.find({}, "-password");
  } catch (err) {
    const error = new ErrorHandler(
      "An error ocurred finding users. Please try again",
      500
    );
    return next(error);
  }
  res.json({findUser: findUser.map(u => u.toObject({getters: true}))})
};

const userSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ErrorHandler("Invalid entry", 422));
  }
  const { name, email, password } = req.body;

  let userExists;
  try {
    userExists = await User.findOne({ email: email });
  } catch (err) {
    const error = new ErrorHandler(
      "An error ocurred during signup. Please try again",
      500
    );
    return next(error);
  }

  if (userExists) {
    const error = new ErrorHandler("User already exists", 422);
    return next(error);
  }

  const createNewUser = new User({
    name,
    email,
    image:
      "https://www.denverpost.com/wp-content/uploads/2018/06/GettyImages-161361450.jpg?w=620",
    password,
    places: [],
  });

  try {
    await createNewUser.save();
  } catch (err) {
    const error = new ErrorHandler("Signup Failed. Please try again", 500);
    return next(error);
  }

  res.status(201).json({ user: createNewUser.toObject({ getters: true }) });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    userExists = await User.findOne({ email: email });
  } catch (err) {
    const error = new ErrorHandler(
      "An error ocurred during login. Please try again",
      500
    );
    return next(error);
  }

  if (!userExists || userExists.password !== password) {
    const error = new ErrorHandler("Invalid attempt. Could not login", 401);
    return next(error);
  }
  res.json({ message: "You are logged in!!!!" });
};

module.exports = { getUser, userSignup, userLogin };
