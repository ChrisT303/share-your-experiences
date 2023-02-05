const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");

const ErrorHandler = require("../../server/models/error.js");

const testUsers = [
  {
    id: "u1",
    name: "Chris Williams",
    email: "chris@msn.com",
    password: "hashedPW",
  },
];

const getUser = (req, res) => {
  res.json({ users: testUsers });
};

const userSignup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ErrorHandler("Invalid entry", 422);
    }
  const { name, email, password } = req.body;
  const userExists = testUsers.find((user) => user.email === email);

  if (userExists) {
    throw new ErrorHandler("Error! User already exists", 422);
  }

  const createNewUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  testUsers.push(createNewUser);

  res.status(201).json({ user: createNewUser });
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  const foundUser = testUsers.find((user) => user.email === email);

  if (!foundUser || foundUser.password !== password) {
    throw new ErrorHandler("Could not find user with this id", 401);
  }

  res.json({ message: "You are logged in!!!!" });
};

module.exports = { getUser, userSignup, userLogin };
