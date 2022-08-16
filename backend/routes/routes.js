const express = require("express")

const router = express.Router()

const pool = require("../database")

router.get("/", async (req, res) => {
  res.status(200).send("Hello World")
})

// ! Catch

// ? Get contact of a user
router.get("/contacts/:id", async (req, res) => {
  const { id } = req.params
  const conn = await pool.getConnection()

  const query = "SELECT * FROM data WHERE user_id LIKE (?)"

  const rows = await conn.query(query, [id])

  return res.status(200).send(rows)
})

// ? LOGIN
router.post("/login", async (req, res) => {
  const { user, pass } = req.body

  const conn = await pool.getConnection()

  const query = "SELECT * FROM users WHERE user LIKE (?) AND pass LIKE (?)"

  const row = await conn.query(query, [user, pass])

  if (!row || row.length === 0) {
    return res.status(200).json({
      code: "error",
    })
  }

  return res.status(200).json({
    code: "success",
    object: row[0].id,
  })
})

// ? Add a contact
router.post("/contact/:id", async (req, res) => {
  const { id } = req.params
  const { name, lastName, tel } = req.body

  const conn = await pool.getConnection()

  const query =
    "INSERT INTO data (name, last_name, tel, user_id) VALUES ( (?), (?), (?), (?) )"

  const row = await conn.query(query, [name, lastName, tel, id])

  if (row.affectedRows !== 1) {
    return res.status(500).json({ code: "error" })
  }

  return res.status(201).json({ code: "success" })
})

// ? Delete contact
router.delete("/contact/:id", async (req, res) => {
  const { id } = req.params

  const conn = await pool.getConnection()

  const query = "DELETE FROM data WHERE id LIKE (?)"

  const row = await conn.query(query, [id])

  if (row.affectedRows !== 1) {
    return res.status(500).json({ code: "error" })
  }

  return res.status(200).json({ code: "success" })
})

// ? Delete user
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params

  const conn = await pool.getConnection()

  const query = "DELETE FROM data WHERE user_id LIKE (?)"

  await conn.query(query, [id])

  const queryUser = "DELETE FROM users WHERE id LIKE (?)"

  const row = await conn.query(queryUser, [id])

  console.log(row)
})

// ? Add user
router.post("/user", async (req, res) => {
  const { user, pass } = req.body

  const conn = await pool.getConnection()

  const query = "INSERT INTO users (user, pass) VALUES ((?), (?))"

  const row = await conn.query(query, [user, pass])

  if (row.affectedRows !== 1) {
    return res.status(500).json({ code: "error" })
  }

  return res.status(200).json({ code: "success" })
})

module.exports = router
