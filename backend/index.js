const express = require("express")
const app = express()
require("dotenv").config()

app.use(express.json())

const routes = require("./routes/routes")

app.use(routes)

app.listen(process.env.APP_PORT, () => {
  console.log("Port listen on", process.env.APP_PORT)
})
