import Joi from "joi";

const updateUserValidationSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  rut: Joi.string().required(),
  telefono: Joi.number().required(),
  direccion: Joi.string().required(),
  numero_de_direccion: Joi.number().required(),
  correo: Joi.string().email().required(),
  password: Joi.string().required(),
  // comuna: Joi.string().trim().required(),
  // rol: Joi.string().required(),
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

