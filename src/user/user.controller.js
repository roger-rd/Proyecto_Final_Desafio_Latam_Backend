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
        
        const token = jwt.sign({ id_usuario: user.id_usuario }, process.env.JWT_SECRET)
        
        const { password: _, ...user } = newUser;
        return res.status(201).json({
            token,
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
export const userController = {
    regiterUsuario,
    loginUsuario
};