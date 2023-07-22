import pool from "../database/connection.js";


const findAll = async ()=>{
  const {rows} = await pool.query("SELECT * FROM  usuarios")
  return rows;
}

const findById = async(id)=>{
  const text = "SELECT * FROM  usuarios WHERE id_usuario = $1";
  const {rows} = await pool.query(text,[id]);
  if(rows.length === 0 ){
      throw ({code:"404"})
  }
  return rows[0];
};



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



const updateUserById = async (id_usuario, updates) => {
  //error en el id. debe ser id_usuario
  const { nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol } = updates;
  const query = 'UPDATE usuarios SET nombre = $1, apellido = $2, rut = $3, telefono = $4, direccion = $5, numero_de_direccion = $6, correo = $7, password = $8, rol = $9 WHERE id_usuario = $10 RETURNING *';
  const values = [nombre, apellido, rut, telefono, direccion, numero_de_direccion, correo, password, rol, id_usuario];
  const { rows } = await pool.query(query, values);
  return rows[0];
};


const removeUser = async (id_usuario) => {
  //error en el nombre de la tabla tenia post
  const text = "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING * "
  const { rows} = await pool.query (text, [id_usuario])
  return rows [0];
}

export const userModel = {
  findAll,
  findById,
  createUser,
  findOne,
  updateUserById,
  removeUser
};

