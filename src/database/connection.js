import * as dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const {Pool} = pkg;



export const pool = new Pool({allowExitOnIdle: true});


// const connectionString = process.env.PG_URL;

// export const pool = connectionString
//     ? new Pool({
//         connectionString,
//         ssl: {
//             rejectUnauthorized: false,
//         },
//         allowExitOnIdle: true,
//         })
//     : new Pool({
//         allowExitOnIdle: true,
//         });

// try {
//     await pool.query("SELECT NOW()");
//     console.log("Conexión a la base de datos exitosa.");
// } catch (error) {
//     console.log("Error al conectar a la base de datos:", error);
// };

