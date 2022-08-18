const express = require("express")

const router = express.Router()

const pool = require("../database")

router.get("/", async (req, res) => {
  res.status(200).send("Hello World")
})

// ! Catch

// ? Get contacts of a user
router.get("/contacts/:id", async (req, res) => {
  const { id } = req.params

  try {
    const conn = await pool.getConnection()

    const query = "SELECT * FROM data WHERE user_id LIKE (?)"

    const rows = await conn.query(query, [id])

    conn.end()

    return res.status(200).send(rows)
  } catch (error) {
    console.log(error)
  }
})

// ? LOGIN
router.post("/login", async (req, res) => {
  const { user, pass } = req.body

  try {
    const conn = await pool.getConnection()

    const query = "SELECT * FROM users WHERE user LIKE (?) AND pass LIKE (?)"

    const row = await conn.query(query, [user, pass])

    conn.end()

    if (!row || row.length === 0) {
      return res.status(200).json({
        code: "error",
      })
    }

    return res.status(200).json({
      code: "success",
      object: row[0].id,
    })
  } catch (error) {
    console.log(error)
  }
})

// ? Add a contact
router.post("/contact/:id", async (req, res) => {
  const { id } = req.params
  const { name, lastName, tel } = req.body

  try {
    const conn = await pool.getConnection()

    const query =
      "INSERT INTO data (name, last_name, tel, user_id) VALUES ( (?), (?), (?), (?) )"

    const row = await conn.query(query, [name, lastName, tel, id])

    conn.end()

    if (row.affectedRows !== 1) {
      return res.status(500).json({ code: "error" })
    }

    return res.status(201).json({ code: "success" })
  } catch (error) {
    console.log(error)
  }
})

// ? Delete contact
router.delete("/contact/:id", async (req, res) => {
  const { id } = req.params

  try {
    const conn = await pool.getConnection()

    const query = "DELETE FROM data WHERE id LIKE (?)"

    const row = await conn.query(query, [id])

    conn.end()

    if (row.affectedRows !== 1) {
      return res.status(500).json({ code: "error" })
    }

    return res.status(200).json({ code: "success" })
  } catch (error) {
    console.log("Error delete contact")
  }
})

// ? Delete user
router.delete("/user/:id", async (req, res) => {
  const { id } = req.params

  try {
    const conn = await pool.getConnection()

    const query = "DELETE FROM data WHERE user_id LIKE (?)"

    await conn.query(query, [id])

    const queryUser = "DELETE FROM users WHERE id LIKE (?)"

    const row = await conn.query(queryUser, [id])

    conn.end()

    if (row.affectedRows !== 1) {
      return res.status(500).json({ code: "error" })
    }

    return res.status(200).json({ code: "success" })
  } catch (error) {
    console.log(error)
  }
})

// ? Add user
router.post("/user", async (req, res) => {
  const { user, pass } = req.body

  try {
    const conn = await pool.getConnection()

    const queryExists = "SELECT * FROM users WHERE user LIKE (?)"

    const rowExists = await conn.query(queryExists, [user])

    if (rowExists.length !== 0) {
      return res.status(404).json({ code: "error" })
    }

    const query = "INSERT INTO users (user, pass) VALUES ((?), (?))"

    const row = await conn.query(query, [user, pass])

    conn.end()

    if (row.affectedRows !== 1) {
      return res.status(500).json({ code: "error" })
    }

    return res.status(200).json({ code: "success" })
  } catch (error) {
    console.log(error)
  }
})

// ? User information
router.get("/user/:id", async (req, res) => {
  const { id } = req.params

  try {
    const conn = await pool.getConnection()

    const query = "SELECT user FROM users WHERE id LIKE (?)"

    const row = await conn.query(query, [id])

    conn.end()

    return res.status(200).json({
      code: "success",
      name: row[0].user,
    })
  } catch (error) {
    console.log("Error from the user information")
  }
})

module.exports = router
