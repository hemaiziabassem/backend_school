const {
  User,
  validationRegisterUser,
  validationLoginUser,
} = require("../models/user");
const asynchandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @description         register new user
 * @route               /user/register
 * @method              POST
 * @access              public
 */
const registerController = asynchandler(async (req, res) => {
  let data = req.body;

  const { error } = await validationRegisterUser(data);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const existingUser = await User.findOne({
    $or: [{ email: data.email }, { username: data.username }],
  });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const user = new User(data);
  const salt = await bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);
  await user.save();

  return res.status(201).json(user);
});

/**
 * @description         login user
 * @route               /user/login
 * @method              POST
 * @access              public
 */
const loginController = asynchandler(async (req, res) => {
  let data = req.body;
  const { error } = await validationLoginUser(data);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid username or password" });
  }
  const isMatchPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isMatchPassword) {
    return res.status(400).json({ message: "invalid username or password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET_KEY || "testMovieApi",
    { expiresIn: "24h" }
  );
  const { password, ...other } = user._doc;
  return res.status(200).json({ token });
});

module.exports = {
  registerController,
  loginController,
};
