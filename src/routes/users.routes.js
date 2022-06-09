import { Router } from "express";
const usersRoutes = Router();

export default usersRoutes;
usersRoutes.get("/users", (req, res) => {
  res.json({ usuario: "usuarios" });
});
