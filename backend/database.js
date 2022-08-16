const mariadb = require("mariadb")
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
})

async function getConnection() {
  try {
    const conn = await pool.getConnection()
    return conn
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getConnection }
