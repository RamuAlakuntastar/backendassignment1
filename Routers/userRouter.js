const express = require("express");
const { getAllUsers, createUser, getUserById, deleteUserById } =
  require("../Controllers/userController");

const {
  signController,
  loginController,
} = require("../Controllers/authController");

const userRouter = express.Router();


const checkInput = function (req, res, next) {
  if (req.method === "POST") {
    const isEmpty = Object.keys(req.body).length === 0;
    if (isEmpty) {
      return res.status(400).json({
        status: "failure",
        message: "Request body cannot be empty",
      });
    }
  }
  next();
};


userRouter.post("/signup", checkInput, signController);
userRouter.post("/login", checkInput, loginController);


userRouter.get("/", getAllUsers);
userRouter.post("/", checkInput, createUser);
userRouter.get("/:userId", getUserById);
userRouter.delete("/:userId", deleteUserById);

module.exports = userRouter;
