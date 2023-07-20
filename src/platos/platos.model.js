/*const createPlatos = async (platos) => {
    const { nombre ,ingredientes ,	monto,img_url, id_categoria} = platos;
    const query = 'INSERT INTO usuarios (nombre ,ingredientes ,	monto, img_url,id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nombre ,ingredientes ,	monto, img_url,id_categoria];
    const { rows } = await pool.query(query, values);
    return rows[0];
}

export const platosModel = {
    createPlatos
}
*/