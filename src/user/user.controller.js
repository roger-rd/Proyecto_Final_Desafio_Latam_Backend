import { userModel } from "./user.model.js";
import { handleErrors } from "../database/error.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";

const getRaiz = async (req, res) => {
    try {
    res.json({ ok: true, result: "todo esta ok en la raiz" });
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

const getIdUser = async (req, res) => {
    const { id_usuario } = req.params;
    try {
    const usuario = await userModel.findById(id_usuario);
    if (usuario) res.status(200).send(usuario);
    else
        res
        .status(404)
        .send({ message: "No se encontró ningún usuario con ese id" });
    } catch (error) {
    const { status, message } = handleErrors(error.code);
    console.log(error, message);
    return res.status(status).json({ ok: false, result: message });
    }
};

const regiterUsuario = async (req, res) => {
    const {
        nombre,
        apellido,
        rut,
        telefono,
        direccion,
        numero_de_direccion,
        correo,
        password,
        rol,
    } = req.body;

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
        rol,
    });

    const token = jwt.sign({ correo: newUser.correo }, process.env.JWT_SECRET);
    const { password: _, ...user } = newUser;
    return res.status(201).json({
        user,
        token,
    });
    } catch (error) {
    const { status, message } = handleErrors(error.code);
    console.log(error, message);
    return res.status(status).json({ ok: false, result: message });
    }
};

const loginUsuario = async (req, res) => {
    const { correo } = req.body;

    try {
        if (correo.length === 0) {
        throw { message: "email no registrado" };
        }
        const token = jwt.sign({ correo }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
        });
        console.log("Token: ", token);
        return res.status(200).json(token);
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};

const updateUser = async (req, res) => {
    const { id_usuario } = req.params;
    console.log("ID de usuario recibido:", id_usuario);
    const {
        nombre,
        apellido,
        rut,
        telefono,
        direccion,
        numero_de_direccion,
        correo,
        password,
    } = req.body;
    try {
        const result = await userModel.updateUserById(id_usuario, {
        nombre,
        apellido,
        rut,
        telefono,
        direccion,
        numero_de_direccion,
        correo,
        password: bcript.hashSync(password, 10),
        });
        return res.status(200).json({ ok: true, result });
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id_usuario } = req.params;

        const deleteUser = await userModel.removeUser(id_usuario);

        if (deleteUser) {
        res.send(deleteUser);
        } else {
        res
            .status(404)
            .send({ message: "NO se encuntro ningun usuario con ese ID" });
        }
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    }
    };

const contenidoUsuario = async (req, res) => {
    const userEmail = req.correo;
    console.log("Token recibido:", req.headers.authorization);
    try {
    const result = await userModel.verUsuario(userEmail);
    console.log("Datos del usuario:", result);
    const {
        id_usuario,
        nombre,
        apellido,
        rut,
        telefono,
        direccion,
        numero_de_direccion,
        correo,
        rol,
    } = result;
    return res.json({
        id_usuario,
        nombre,
        apellido,
        rut,
        telefono,
        direccion,
        numero_de_direccion,
        correo,
        rol,
        });
    } catch (error) {
        console.log(error);
        console.log("Error al obtener los datos del usuario:", error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
};

const contenidoUsuarioDatosPersonales = async (req, res) => {
    const userEmail = req.correo;
    console.log("Token recibido:", req.headers.authorization);
    try {
    const result = await userModel.verUsuario(userEmail);
    console.log("Datos del usuario:", result);
    const {
        id_usuario,
        nombre,
        apellido,
        rut,
        telefono,
      
    } = result;
    return res.json({
        id_usuario,
        nombre,
        apellido,
        rut,
        telefono,
        
        });
    } catch (error) {
        console.log(error);
        console.log("Error al obtener los datos del usuario:", error);
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
};

export const userController = {
    getRaiz,
    getAllUser,
    getIdUser,
    regiterUsuario,
    loginUsuario,
    updateUser,
    deleteUser,
    contenidoUsuario,
    contenidoUsuarioDatosPersonales
};
