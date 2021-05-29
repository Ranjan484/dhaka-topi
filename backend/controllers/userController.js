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

const getUserProfile = catchAsync(async (req, res) => {
  const user = await User.findById();
});
