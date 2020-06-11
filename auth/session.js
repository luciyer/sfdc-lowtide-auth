require("dotenv").config()

const jsforce = require("jsforce")

exports.store = (req) => {

  const auth_credentials = {
    serverUrl: req.body.credentials.server_url,
    sessionId: req.body.credentials.session_id,
    version: process.env.API_VERSION
  }

  const sf_object = {
    auth_type: req.body.source
  }

  return new Promise((resolve, reject) => {

    const conn = new jsforce.Connection(auth_credentials)

    sf_object.opened_date = new Date()

    if (conn.accessToken && conn.instanceUrl) {

      sf_object.auth_response = {
        accessToken: conn.accessToken,
        instanceUrl: conn.instanceUrl
      }

      resolve(sf_object)

    } else {
      reject("Could not authenticate with session information.")
    }

  })

}
