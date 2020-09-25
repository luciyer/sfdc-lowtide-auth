require("dotenv").config()

const express = require("express")
const auth = require("./auth")

const app = express()

app
  .use(express.json())
  .use(auth.session)
  .use("/api/*", auth.required)
  .use(auth.middleware)
  .listen(process.env.PORT || 8080)
