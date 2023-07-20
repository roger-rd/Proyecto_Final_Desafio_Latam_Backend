


import Joi from "joi";

const updateUserValidationSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  rut: Joi.string().required(),
  telefono: Joi.string().required(),
  direccion: Joi.string().required(),
  numero_de_direccion: Joi.string().required(),
  correo: Joi.string().email().required(),
  password: Joi.string().required(),
  rol: Joi.string().required(),
});

const validateUpdateUser = (req, res, next) => {
  const { error } = updateUserValidationSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

export { validateUpdateUser };

/*import jwt from "jsonwebtoken";
import { handleErrors } from "../database/error.js";
import User from "../models/user.model.js";

const requireAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Acceso no autorizado" });
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id_usuario;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Acceso no autorizado" });
    }

    // Agregar el objeto del usuario decodificado a la solicitud para usarlo en otros middleware o controladores
    req.user = user;
    next();
  } catch (error) {
    const { status, message } = handleErrors(error.code);
    console.log(error, message);
    return res.status(status).json({ ok: false, result: message });
  }
};

export { requireAuth };

 /*import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {

    const authHeader = req.headers?.authorization;
    if (!authHeader) {
        return res 
        .status(401)
        .json({ error: "debes iniciar sesion para realizar esta acción"});
    }
    const token = authHeader.split ("")[1];
    try {
        const {id_usuario } =jwt.verify(token, proccess.env.JWT);
        req.id_usuario = id_usuario;
    } catch (error) {
        return res.status(401).json ({error:"invalid token"});
    }
}

export const uptadeMiddleware = {
    authMiddleware
  };
  */