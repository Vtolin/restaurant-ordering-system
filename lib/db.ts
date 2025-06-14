import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function testConnection() {
    try {
        const connection = await pool.getConnection()
        console.log('Database connected succesfully')
        connection.release();
    } catch (error) {
        console.log("Database connection failed: ", error)
    }
}

export async function executeQuery(query: string, params: any[] = []) {
    try {
        const [results] = await pool.execute(query, params)
        return results
    } catch (error) {
        console.error('database query error:', error)
        throw error;
    }
}

export async function getConnection() {
    return await pool.getConnection()
}

export default pool