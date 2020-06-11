require("dotenv").config()

const jsforce = require("jsforce")

exports.store = (req) => {

  const username = req.body.credentials.username,
        password = req.body.credentials.password;

  const sf_object = {
    auth_type: req.body.source
  }

  return new Promise((resolve, reject) => {

    const conn = new jsforce.Connection()

    conn.login(username, password)
      .then(() => {

        sf_object.opened_date = new Date()

        sf_object.auth_response = {
          accessToken: conn.accessToken,
          instanceUrl: conn.instanceUrl
        }

        resolve(sf_object)

      })
      .catch(err => {
        reject("Could not log in. Check credentials.")
      })


  })

}
