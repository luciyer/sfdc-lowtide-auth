const express = require("express")

const routes = require("./routes"),
      strategies = require("./strategies");

const router = express.Router()

router
  .post(routes.login, strategies.credentialLogin)
  .post(routes.sfdc, strategies.salesforceSession)
  .get(routes.oauth, strategies.oauthRedirect)
  .get(routes.callback, strategies.handleOauthCallback)
  .get(routes.session, strategies.getSessionInfo)
  .get(routes.revoke, strategies.revokeSession)

module.exports = router
