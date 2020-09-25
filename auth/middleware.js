const express = require("express")

const strategies = require("./strategies")

const router = express.Router()

router.route("/oauth")
  .get(strategies.oauthRedirect)

router.route("/callback")
  .get(strategies.handleOauthCallback)

router.route("/login")
  .post(strategies.credentialLogin)

router.route("/sfdc")
  .post(strategies.salesforceSession)

router.route("/session")
  .get(strategies.getSessionInfo)

router.route("/revoke")
  .get(strategies.revokeSession)

module.exports = router
