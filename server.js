require("dotenv").config()

const path = require("path")
const jsforce = require("jsforce")
const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const { v4: uuidv4 } = require("uuid")
const MongoStore = require("connect-mongo")(session)

global.appRoot = path.resolve(__dirname)

const auth = require("./auth"),
      config = require("./config");

const app = express()

app
  .use(bodyparser.json())
  .use(session({
    genid: (req) => { return uuidv4() },
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: (60 * 60 * 1000) },
    store: new MongoStore({
      url: process.env.MONGODB_URI || "mongodb://localhost/dev"
    }),
    resave: false,
    saveUninitialized: true
  }))

app
  .listen(process.env.PORT || 8080, () => {
    console.log("Server Running.")
  })

app.all(config.routes.auth.required, (req, res, next) => auth.handleAuthRequired(req, res, next))

app.get(config.routes.auth.request, (req, res) => auth.visitedAuth(req, res))

app.post(config.routes.auth.request, (req, res) => auth.routeRequest(req, res))

app.get(config.routes.auth.callback, (req, res) => auth.handleOauthCallback(req, res))

app.get(config.routes.auth.revoke, (req, res) => auth.destroyConnection(req, res))

app.get("/", (req, res) => {
  res.status(200).json({
    "session": req.session
  })
})

app.get("/api/test", (req, res) => {
  res.sendStatus(200)
})
