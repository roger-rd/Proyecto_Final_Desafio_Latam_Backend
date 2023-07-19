import { Router } from "express";
import { createValidateBody } from "../middlewares/create.middleware.js";
import { loginValidateBody } from "../middlewares/login.middleware.js";
import {userController} from "./user.controller.js";




const router = Router();

router.post('/register', createValidateBody, userController.regiterUsuario )
router.post ('/login',loginValidateBody, userController.loginUsuario );

export default router;