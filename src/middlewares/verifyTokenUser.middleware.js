// import dotenv from "dotenv";
// dotenv.config();

// import bcrypt from "bcryptjs";

// import { handleErrors } from "../database/error.js";
// import { userModel } from "../user/user.model.js";

// export const verifyUsuario = async (req, res, next) => {
//   const { correo, password } = req.body;
//   try {
//     if (!correo || !password) {
//       throw new Error("El correo y la contraseña son obligatorios.");
//     }

//     const { rows: [userDB], rowCount } = await userModel.findOne(correo);

//     if (!rowCount) {
//       throw new Error("El correo no está registrado.");
//     }

//     const validatePassword = await bcrypt.compare(password, userDB.password);
//     if (!validatePassword) {
//       throw new Error("La contraseña es incorrecta.");
//     }

//     console.log("Usuario autenticado con éxito: ", userDB.correo);
//     next();
//   } catch (error) {
//     const { status, message } = handleErrors(error.code);
//     console.log(error, message);
//     return res.status(status).json({ ok: false, result: message });
//   }
// };



import * as dotenv from "dotenv";
dotenv.config();


import bcrypt from "bcryptjs";

import { handleErrors } from "../database/error.js";
import { userModel } from "../user/user.model.js";


export const verifyUsuario = async (req, res, next) => {
    const { correo, password } = req.body
    try {
        if (!correo || !password) {
            throw { code: "403" };
        }

        const { rows: [userDB], rowCount } = await userModel.loginUser(correo);

        if (!rowCount) {
            throw { code: "error en correo" };
        }

        const validatePassword = await bcrypt.compare(password, userDB.password);
        if (validatePassword == false) {
            throw { code: "error de contraseña" };
        }

        console.log("Usuario autenticado con éxito: ", userDB.correo)
        next()
    } catch (error) {
        const { status, message } = handleErrors(error.code)
        console.log(error, message)
        return res.status(status).json({ ok: false, result: message });
    }
}