import Joi from "joi";

const loginSchema = Joi.object({

    correo: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),

});

export const loginValidateBody = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    next();
};


