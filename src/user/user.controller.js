
import { userModel } from "./user.model.js";
import { handleErrors } from "../database/error.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";



const getRaiz = async (req, res) => {
    try {
        res.json({ ok: true, result: "todo esta ok en la raiz" })
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};

const getAllUser = async (req, res) => {
    try {
        const users = await userModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};

// const getIdUser = async (req, res) => {
//     const { id_usuario } = req.params
//     try {
//         const usuario = await userModel.findById(id_usuario);
//         if (usuario) res.status(200).send(usuario)
//         else res.status(404).send({ message: "No se encontró ningún usuario con ese id" })
//     } catch (error) {
//         const { status, message } = handleErrors(error.code);
//         console.log(error, message);
//         return res.status(status).json({ ok: false, result: message });
//     }
// };
const getIdUser = async (req, res) => {
    const { correo } = req.correo
    try {
        const usuario = await userModel.findById(correo);
        if (usuario) res.status(200).send(usuario)
        else res.status(404).send({ message: "No se encontró ningún usuario con ese correo" })
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};



const regiterUsuario = async (req, res) => {
    const { nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol } = req.body;

    try {
        const newUser = await userModel.createUser({
            nombre,
            apellido,
            rut,
            telefono,
            direccion,
            numero_de_direccion,
            correo,
            password: bcript.hashSync(password, 10),
            rol
        });

        const token = jwt.sign({ id_usuario: newUser.id_usuario }, process.env.JWT_SECRET)
        const { password: _, ...user } = newUser;
        return res.status(201).json({
            user,
            token
        })

    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
}

const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const result = await userModel.loginUser(correo);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: "invalid credentials" });
        }
        
        // if (!result.rowCount) {
        //     return res.status(400).json({ error: "invalid credencial" })
        // }
        const user = result.rows[0];
        const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET)

        return res.status(200).json({ token, correo });

    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }

}

const updateUser = async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol  } = req.body
    try {
        
        const existingUser = await userModel.findById(id_usuario);
        if (!existingUser) {
            return res.status(400).json({ ok: false, message: "No se encontró ningún usuario con ese ID" });
        }
        
        const result = await userModel.updateUserById(id_usuario,{ nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol  })
        
        return res.status(200).json({ ok: true, result });
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};


const deleteUser = async (req, res) => {
    try {
        const {id_usuario}= req.params;
       
        const deleteUser = await userModel.removeUser(id_usuario);
        
        if(deleteUser){
            res.send(deleteUser);
        }else{
            res.status(404).send({message:"NO se encuntro ningun usuario con ese ID"})
        }
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};

// const contenidoUsuario = async (req, res) => {
//     const userCorreo = req.correo;
//     try {
//         const result = await userModel.verUsuario(userCorreo);
//         const {nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, rol} = result;
//         return res.json({nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo,  rol});
//     } catch (error) {
//         console.log(error)
//         const { status, message } = handleErrors(error.code)
//         return res.status(status).json({ ok: false, result: message });
//     }
// }

const contenidoUsuario = async (req, res) => {
    const userCorreo = req.correo;
    try {
        const result = await userModel.findById(userCorreo);
        const {nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, rol} = result;
        return res.json({nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo,  rol});
    } catch (error) {
        console.log(error)
        const { status, message } = handleErrors(error.code)
        return res.status(status).json({ ok: false, result: message });
    }
}




export const userController = {
    getRaiz,
    getAllUser,
    getIdUser,
    regiterUsuario,
    loginUsuario,
    updateUser,
    deleteUser,
    contenidoUsuario
};