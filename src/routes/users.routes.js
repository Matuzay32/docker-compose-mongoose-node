import { Router } from "express";
import { userModel } from "../models/Users.js";
import bcrypt from "bcryptjs";
const usersRoutes = Router();

export default usersRoutes;

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

//Login user
usersRoutes.post("/users/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (validPassword) {
      res.status(200).json({ message: "You are now authenticated" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

db.inventory.find({ $or: [{ price: { $gt: 600 } }, { price: { $eq: 2 } }] });
