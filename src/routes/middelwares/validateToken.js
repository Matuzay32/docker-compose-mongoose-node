import jwt from "jsonwebtoken";
import TOKEN_SECRET from "../../config/config.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("token");
  if (!token)
    res.status(401).json({
      error: "Incluya el token en la cabeceras| ** token: 'su token' **",
    });
  try {
    const verified = jwt.verify(token, TOKEN_SECRET.TOKEN_SECRET);
    const admin = verified.role.includes("ADMIN");
    if (admin) {
      next();
    } else {
      res.status(401).json({
        error: `Tiene que ser ADMIN para poder disponer de esta ruta`,
      });
    }
  } catch (error) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      `********* FALTA EL TOKEN EN LA CABECERA ***************`
    );
  }
};
