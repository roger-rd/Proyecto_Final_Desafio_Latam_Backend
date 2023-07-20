import { Router } from "express";
import { createValidateBody } from "../middlewares/create.middleware.js";
import { loginValidateBody } from "../middlewares/login.middleware.js";
import { validateUpdateUser  } from "../middlewares/auth.middleware.js";
import {userController} from "./user.controller.js";




const router = Router();

router.get('/', userController.getRaiz);
router.post('/register', createValidateBody, userController.regiterUsuario )
router.post ('/login',loginValidateBody, userController.loginUsuario );
// Ruta para actualizar un usuario por su ID
router.put('/users/:id', validateUpdateUser ,userController.updateUser);

export default router;