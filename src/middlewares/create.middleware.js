import Joi from "joi";

const createSchema = Joi.object({
  nombre: Joi.string().trim().min(3).required(),
  apellido: Joi.string().trim().min(3).required(),
  rut: Joi.string().trim().min(1).required(),
  direccion: Joi.string().trim().min(1).required(),
  telefono: Joi.number().integer().min(1).required(),
  numero_de_direccion: Joi.number().integer().min(1).required(),
  correo: Joi.string().trim().email().required(),
  password: Joi.string().trim().min(6).required(),
  // comuna: Joi.string().trim().required(),
  rol: Joi.string().trim().min(3).required(),
});

export const createValidateBody = (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};


