const UserModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const promisify = require("util").promisify;

const JWT_SECRET = "mysecretkey";
const promisifyJwtSign = promisify(jwt.sign);





const signController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // FIXED CHECK
    if (!password || !confirmPassword || password !== confirmPassword) {
      return res.status(400).json({
        error_msg: "Passwords do not match"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created",
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error_msg: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error_msg: "Invalid email or password" });
    }

    
    const token = await promisifyJwtSign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      jwt_token: token,
      message: "Login successful"
    });

  } catch (err) {
    res.status(500).json({
      error_msg: err.message
    });
  }
};

module.exports = {
  signController,
  loginController
};
