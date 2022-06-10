import { Router } from "express";
const usersRoutes = Router();

export default usersRoutes;

//Lista de usuarios
usersRoutes.get("/users/allusers", (req, res) => {
  res.send({ usuarios: "usuarios" });
});

//Sing in User
usersRoutes.get("/users/singin", (req, res) => {
  res.send({ userSingIn: "esta va ser la ruta de entrada del usuario" });
  res.status(200);
});

//Sing Up
usersRoutes.get("/users/signup", (req, res) => {
  res.send({ singup: " Este va ser el formulario de autenticacion" });
  res.status(200);
});
