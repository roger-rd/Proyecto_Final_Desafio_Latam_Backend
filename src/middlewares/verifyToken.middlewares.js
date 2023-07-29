import * as dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken"



export const verifyToken = ( req, res, next)=>{
    try {
        const bearerHeaders = req.headers.authorization;
        if(!bearerHeaders){
            throw{message:"se necesita el token con formato Bearer"}
        }
        const token = bearerHeaders.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload);

        req.id_usuario = payload.id_usuario;
        req.correo = payload.correo

        next();

    } catch (error) {
        console.log(error)
        res.status(500).json({ok:false, message:error.message})
    }

}