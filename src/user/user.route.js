import { Router } from "express";
import { createValidateBody } from "../middlewares/create.middleware.js";
import { loginValidateBody } from "../middlewares/login.middleware.js";
import { validateUpdateUser  } from "../middlewares/auth.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

import {userController} from "./user.controller.js";





const router = Router();

router.get('/', userController.getRaiz);
router.get('/usuario', userController.getAllUser);
router.get('/usuario/:id_usuario', userController.getIdUser)
router.post('/register', createValidateBody, userController.regiterUsuario )
router.post ('/login',loginValidateBody, userController.loginUsuario );
router.put('/update/:id_usuario', validateUpdateUser ,userController.updateUser);
router.delete('/delete/:id_usuario', verifyToken ,userController.deleteUser);


export default router;