require("dotenv").config()

const { v4: uuidv4 } = require("uuid"),
      session = require("express-session"),
      connectMongo = require("connect-mongo");

const MongoStore = connectMongo(session),
      dbUri = process.env.MONGODB_URI || "mongodb://localhost/dev"

const sessionOptions = {
  genid: (req) => { return uuidv4() },
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: (60 * 60000) },
  store: new MongoStore({ url: dbUri }),
  resave: false,
  saveUninitialized: true
}

module.exports = session(sessionOptions)
