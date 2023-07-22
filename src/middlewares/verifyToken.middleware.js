import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const jwtToken = req.header("Authorization");

    if (!jwtToken) {
    return res.status(401).json({ message: "No se proporcionó un token de autenticación" });
}

  // Verificar el token de autenticación aquí
  // Por ejemplo, usando la biblioteca 'jsonwebtoken' y una clave secreta
   try {
    const decodedToken = jwt.verify(jwtToken.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.userId = decodedToken.id_usuario;
    next();
} catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: "Token de autenticación inválido" });
    } else {
        console.log(error);
        return res.status(500).json({ message: "Error al verificar el token de autenticación" });
    }
}
};

