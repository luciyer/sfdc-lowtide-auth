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
    cookie: { maxAge: (process.env.SESSION_DURATION_MINS * 60000) },
    store: new MongoStore({
      url: process.env.MONGODB_URI || "mongodb://localhost/dev"
    }),
    resave: false,
    saveUninitialized: true
  }))

app.listen(process.env.PORT || 8080)

app.route(config.routes.auth.required)
  .all(auth.handleAuthRequired)

app.route(config.routes.auth.request)
  .get(auth.visitedAuth)
  .post(auth.routeRequest)

app.route(config.routes.auth.callback)
  .get(auth.handleOauthCallback)

app.route(config.routes.auth.revoke)
  .get(auth.destroyConnection)

app.route(config.routes.auth.session)
  .get(auth.getSessionInfo)

// Write your own endpoints here!

app.get("/", (req, res) => res.sendStatus(200))
