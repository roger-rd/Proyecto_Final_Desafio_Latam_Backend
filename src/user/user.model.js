import {pool} from "../database/connection.js";


const findAll = async ()=>{
  const {rows} = await pool.query("SELECT * FROM  usuarios")
  return rows;
}

const findById = async(id)=>{
  const text = "SELECT * FROM  usuarios WHERE id_usuario = $1";
  const {rows} = await pool.query(text,[id]);
  return rows[0];
};



const createUser = async (user) => {
  const { nombre, apellido, rut,correo, password, telefono, direccion, numero_de_direccion,comuna,  rol} = user;
  const query = 'INSERT INTO usuarios (nombre, apellido, rut, correo, password, telefono, direccion, numero_de_direccion,comuna,  rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
  const values = [nombre, apellido, rut,correo, password, telefono, direccion, numero_de_direccion, comuna,  rol];
  const { rows } = await pool.query(query, values);
  return rows[0];
};



const loginUser = async (correo) =>{
  const text = "SELECT * FROM usuarios WHERE correo = $1";
        const result = await pool.query(text, [correo]);   
        return result;
    
        }
 

const updateUserById = async (id_usuario, updates) => {
  const {nombre,apellido,rut,telefono,correo,password, direccion,numero_de_direccion,comuna } = updates;
  const query = 'UPDATE usuarios SET nombre = $1, apellido = $2, rut = $3,  telefono = $4,correo = $5, password = $6, direccion = $7, numero_de_direccion = $8, comuna = $9  rol = $10 WHERE id_usuario = $11 RETURNING *';
  const values = [nombre,apellido,rut,telefono,correo,password, direccion,numero_de_direccion,comuna, id_usuario];
  const { rows } = await pool.query(query, values);
  return rows[0];
  

};


const removeUser = async (id_usuario) => {
  const text = "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING * "
  const { rows} = await pool.query (text, [id_usuario])
  return rows [0];
};

const verUsuario = async (correo) => {
  try {
      validateCorreo(correo);
      const text = "SELECT nombre,apellido,rut,telefono,correo,password, direccion,numero_de_direccion,comuna FROM usuarios WHERE correo = $1";
      const {rows} = await pool.query(text, [correo])
      return rows[0]
  } catch (error) {
      console.log(error)
      throw error
  }
}     

export const userModel = {
  findAll,
  findById,
  createUser,
  loginUser,
  verUsuario,
  updateUserById,
  removeUser
};

