import mysql from "promise-mysql" // Datos de la biblioteca
import keys from "./keys"

const pool = mysql.createPool(keys.database);
pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("Base de datos conectada");
})

export default pool;