
import { userModel } from "./user.model.js";
import {handleErrors} from "../database/error.js";
import bcript from "bcryptjs";
import jwt from "jsonwebtoken";



const regiterUsuario = async (req,res)=>{
    const {nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol} = req.body;

    try {
    
        const newUser = await userModel.createUser({ 
            nombre,
            apellido, 
            rut, 
            telefono, 
            direccion, 
            numero_de_direccion, 
            correo,
            password:bcript. hashSync(password, 10),
            rol
        });
        
        //const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET)
        
        const { password: _, ...user } = newUser;
        return res.status(201).json({
            user})
    
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
    } {
    }
}

const loginUsuario = async (req, res) => {
const  { correo, password} = req.body;

try {
    const user = await userModel.findOne(correo);
    if (!user) {
        return res.status(400).json({error:"invalid credencial"})
    }
    const isMatch = bcript.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({error:"invalid credencial"})
    }
    const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET)
    
    return res.status(200).json({ token, correo });

} catch (error) {
    const { status, message } = handleErrors(error.code);
        console.log(error, message);
        return res.status(status).json({ ok: false, result: message });
}

}

const updateUser = async (req,res) => {
    const {id_usuario} = req.params
    const {nombre,apellido,direccion} = req.body
    try {
      const result = await userModel.updateUserById (id_usuario, {nombre,apellido,direccion})
      return res.status(201).json ({ok:true,result});
    } catch (error) {
      console.log(error);
    }
  };
/*// Función para actualizar un usuario por su ID
const updateUser = async (req, res) => {
    const id_usuario = req.params.id;
    const updates = req.body;
  
    try {
       //Verificar si el usuario con el ID proporcionado existe antes de actualizarlo
      const existingUser = await userModel.findOne (id_usuario);
      if (!existingUser) {
        return res.status(404).json({ error: "El usuario no existe" });
      }
  
      // Realizar la actualización del usuario utilizando la función updateUserById de tu modelo User
      const updatedUser = await userModel.updateUserById(id_usuario, updates);
  
      // Opcionalmente, si deseas ocultar el campo de contraseña en la respuesta:
      const { password: _, ...user } = updatedUser;
      return res.status(200).json({ user });
    } catch (error) {
      const { status, message } = handleErrors(error.code);
      console.log(error, message);
      return res.status(status).json({ ok: false, result: message });
    }
  };*/
export const userController = {
    regiterUsuario,
    loginUsuario,
    updateUser
};