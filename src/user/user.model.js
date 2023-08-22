import {pool} from "../database/connection.js";


const findAll = async ()=>{
  const {rows} = await pool.query("SELECT * FROM  usuarios")
  return rows;
}

const findById = async(id_usuario)=>{
  const text = "SELECT * FROM  usuarios WHERE id_usuario = $1";
  const {rows} = await pool.query(text,[id_usuario]);
  return rows[0];
};

const createUser = async (user) => {
  const { nombre  ,	apellido ,	rut ,telefono ,direccion,numero_de_direccion,correo ,password,rol} = user;
  const query = 'INSERT INTO usuarios (nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const loginUser = async (correo) =>{
  const text = "SELECT * FROM usuarios WHERE correo = $1";
        const result = await pool.query(text, [correo]);   
        return result;
};

const updateUserById = async (id_usuario, { nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password,}) => {
  const query = 'UPDATE usuarios SET nombre = $1, apellido = $2, rut = $3, telefono = $4, direccion = $5, numero_de_direccion = $6, correo = $7, password = $8 WHERE id_usuario = $9 RETURNING *';
  const {rows} = await pool.query(query,[nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, id_usuario]);
  return rows[0];
};

const removeUser = async (id_usuario) => {
  const text = "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING * "
  const { rows} = await pool.query (text, [id_usuario])
  return rows [0];
};

const verUsuario = async (correo) => {
  try {
    const text = "SELECT  id_usuario,  nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, rol FROM usuarios WHERE correo = $1";
    const { rows } = await pool.query(text, [correo]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const verUsuarioDatosPersonales = async (correo) => {
  try {
    const text = "SELECT  id_usuario,  nombre, apellido, rut, telefono, FROM usuarios WHERE correo = $1";
    const { rows } = await pool.query(text, [correo]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};




export const userModel = {
  findAll,
  findById,
  createUser,
  loginUser,
  updateUserById,
  removeUser,
  verUsuario,
  verUsuarioDatosPersonales
};

