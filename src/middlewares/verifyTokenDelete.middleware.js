import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { userModel } from "../user/user.model.js";

export const verifyTokenDelete = async (req, res, next) => {
  const jwtToken = req.header("Authorization");

  if (!jwtToken) {
    return res.status(401).json({ message: "No se proporcionó un token de autenticación" });
  }

  try {
    const decodedToken = jwt.verify(jwtToken.replace("Bearer ", ""), process.env.JWT_SECRET);
    const user = await userModel.findById(decodedToken.id_usuario);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    req.userId = decodedToken.id_usuario;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Token de autenticación inválido" });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Error al verificar el token de autenticación" });
    }
  }
};