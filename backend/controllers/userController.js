import User from "../models/userModel.js";
import catchAsync from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//Auth User and Get Token
// POST /api/users/login
// public

export const authUser = catchAsync(async (req, res) => {
  //pasre data from req body
  const { email, password } = req.body;
  // console.log(req.body);

  //find user if it exist in database
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //user is vailed so log him in

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      toke: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("invaild email or password");
  }
});

// GET USER PROFILE
// GET  /api/user/profile
// private

export const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User no longer exist");
  }
});

//Update User Profile
// PUT /api/user/profile
// private

export const updateUserProfile = catchAsync(async (req, res) => {
  //Check if user exist on database

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.passeword = req.body.password;
    }
    const updateduser = await user.save();
    res.json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User No Longer Exist");
  }
});

// Register a new user
// POST  /api/users
// public

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invaild User Data");
  }
});
