import pool from "../database/connection.js";

const createUser = async (user) => {
  const { nombre  ,	apellido ,	rut ,telefono ,direccion,numero_de_direccion,correo ,password,rol} = user;
  const query = 'INSERT INTO usuarios (nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol];
  const { rows } = await pool.query(query, values);
  return rows[0];
};



const findOne = async (correo) =>{
  const query = "SELECT * FROM usuarios  WHERE  correo =$1"
  const values = [correo];
  const { rows } = await pool.query(query, values);
  return rows[0];
}
// hay que fijarse en los valores de la tabla
// const findOne = async (email) =>{ 
//   const query = "SELECT * FROM usuarios  WHERE  email =$1"
//   const values = [correo];
//   const { rows } = await pool.query(query, values);
//   return rows[0];
// }


export const userModel = {
  createUser,
  findOne
};

