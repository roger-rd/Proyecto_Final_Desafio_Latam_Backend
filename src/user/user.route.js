import { Router } from "express";

import { createValidateBody } from "../middlewares/create.middleware.js";
import { loginValidateBody } from "../middlewares/login.middleware.js";
import { validateUpdateUser  } from "../middlewares/auth.middleware.js";
import { verifyTokenDelete  } from "../middlewares/verifyTokenDelete.middleware.js";
import { verifyToken } from "../middlewares/verifyToken.middlewares.js";
import { verifyTokenUser } from "../middlewares/verifyTokenUser.middleware.js";

import {userController} from "./user.controller.js";



const router = Router();

router.get('/', userController.getRaiz);
router.get('/usuario', userController.getAllUser);
router.get('/perfil', verifyToken, userController.contenidoUsuario)
router.get('/perfil/DatosPersonales', verifyToken, userController.contenidoUsuarioDatosPersonales)

router.post('/register', createValidateBody, userController.regiterUsuario )
router.post ('/login',loginValidateBody,verifyTokenUser, userController.loginUsuario );
router.put('/update/:id_usuario', validateUpdateUser ,userController.updateUser);
router.delete('/delete/:id_usuario',verifyTokenDelete ,userController.deleteUser);


export default router;