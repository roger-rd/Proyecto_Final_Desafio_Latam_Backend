// import * as dotenv from "dotenv";
// dotenv.config();

// import pkg from "pg";
// const {Pool} = pkg;


// const connectionString = process.env.PG_URL;

// export const pool = connectionString
//   ? new Pool({
//       connectionString,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//       allowExitOnIdle: true,
//     })
//   : new Pool({
//       allowExitOnIdle: true,
//     });

// try {
//   await pool.query("SELECT NOW()");
//   console.log("Conexión a la base de datos exitosa.");
// } catch (error) {
//   console.log("Error al conectar a la base de datos:", error);
// }

// // export default pool;
import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.PG_URL;

const connectWithRetry = () => {
  const pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    allowExitOnIdle: true,
  });

  pool.on("error", (err) => {
    console.error("Error en la conexión a la base de datos:", err);
    setTimeout(connectWithRetry, 5000); // Reintentar la conexión después de 5 segundos
  });

  pool.connect((err) => {
    if (err) {
      console.error("Error en la conexión a la base de datos:", err);
      setTimeout(connectWithRetry, 5000); // Reintentar la conexión después de 5 segundos
    } else {
      console.log("Conexión a la base de datos exitosa.");
    }
  });

  return pool;
};

const pool = connectionString ? connectWithRetry() : new Pool();

export default pool;
