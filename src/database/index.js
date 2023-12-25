import mysql from 'mysql2';
import config from '../config';

const pool = mysql.createPool({
    host: "sql12.freesqldatabase.com",
    database: "sql12672284",
    user: "sql12672284",
    password: "z8ZSeQQRZX"
}).promise()


export default pool;