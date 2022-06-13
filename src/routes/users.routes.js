import { Router } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/Users.js";
import bcrypt from "bcryptjs";
import TOKEN_SECRET from "../config/config.js";
import { verifyToken } from "./middelwares/validateToken.js";

const usersRoutes = Router();

export default usersRoutes;

//Login user
usersRoutes.post("/users/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      //Genero el Token con los datos del usuario que vienen desde la base de datos
      const token = jwt.sign(
        {
          username: foundUser.username,
          email: foundUser.email,
          _id: foundUser._id,
          role: foundUser.role,
        },
        TOKEN_SECRET.TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      res
        .status(200)
        .json({ message: "You are now authenticated", token: token });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

//Get all users ADMIN
usersRoutes.get(`/users/allUsers`, verifyToken, async (req, res) => {
  const { limit, skip, names, emails } = req.query;

  let allUsers = await userModel
    .find({})
    .limit(limit)
    .sort({ field: "asc", test: -1 });
  //check all users y solo digo que muestre uncamente los names //ademas orden asd
  if (names) {
    allUsers = await userModel
      .find({}, { username: 1 })
      .limit(limit)
      .sort({ field: "asc", test: -1 });
  }
  //check all users y solo digo que muestre los emails //ademas orden asd
  if (emails) {
    allUsers = await userModel
      .find({}, { email: 1 })
      .limit(limit)
      .sort({ field: "asc", test: -1 });
  }

  const respuestaAllUsers = allUsers.map((user) => {
    const { username, email, _id } = user;
    return { username, email, _id };
  });

  res.status(200).send(respuestaAllUsers);
});

//Get One User for email ADMIN
usersRoutes.get(`/users/oneUser`, verifyToken, async (req, res) => {
  const { email } = req.query;
  console.log(req.params);
  const oneUser = await userModel.findOne({ email: email });
  if (oneUser) {
    res.status(200).send(oneUser);
  } else if (!oneUser) {
    res.status(400).send({
      userNotFound: `User with email: ${email} not found`,
    });
  }
});

//Get One User for Id ADMIN
usersRoutes.get(`/users/id/:param`, verifyToken, async (req, res) => {
  const params = req.params;
  const { param: userId } = params;
  try {
    const findUser = await userModel.findById({ _id: userId });
    if (findUser) {
      const { username, email, _id } = findUser;
      res.status(200).send({ userFind: username, email, _id });
    } else if (!findUser) {
      res.status(200).send({ notFound: `Not found user with id : ${userId}` });
    }
  } catch (error) {
    res.status(400).send({ notFound: `Not found user with id : ${userId}` });
  }
});

//Delete User ADMIN
usersRoutes.delete(`/users/id/:param`, verifyToken, async (req, res) => {
  const params = req.params;
  const { param: userId } = params;

  try {
    const findUserAndDelete = await userModel.findByIdAndDelete({
      _id: userId,
    });
    if (findUserAndDelete) {
      const { email, username, _id } = findUserAndDelete;
      res.status(200).send({ userDeleted: email, username, _id });
    } else if (!findUserAndDelete) {
      res.status(200).send({ notFound: `Not found user with id : ${userId}` });
    }
  } catch (error) {
    res.status(400).send({ notFound: `Not found user with id : ${userId}` });
  }
});

//Create User
usersRoutes.post(`/users/create`, async (req, res) => {
  const body = req.body;
  let { username, password, email } = body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  try {
    const found = await userModel.findOne({ email: email });
    if (found) {
      res
        .status(200)
        .send({ thisUserIsRegistered: "This user already exists" });
    } else if (!found) {
      const userCreated = await userModel.create({
        username,
        password,
        email,
      });
      const { username: user, email: mail, _id: id } = userCreated;
      res.status(200).send({ user, mail, id });
    }
  } catch (error) {
    res.status(400).send({
      emailError: `Validation error  email is incorrect: ${email}`,
    });
  }
});
