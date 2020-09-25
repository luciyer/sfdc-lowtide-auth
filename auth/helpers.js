const jsforce = require("jsforce")

const { login, sfdc, oauth, callback } = require("./routes")

const logConnectionFound = (req) => {
  const { user, auth } = req.session.salesforce
  console.log(`Salesforce session: ${user.username} at ${auth.instanceUrl}`)
}

const logNoConnectionFound = () => {
  console.log(`No Salesforce session found.`)
}

const isAuthenticating = (req) => {
  return [ login, sfdc, oauth, callback ].includes(req.baseUrl)
}

const foundConnection = (req) => {

  if (!req.session.salesforce) {
    logNoConnectionFound(); return false;
  }

  const { auth } = req.session.salesforce,
        hasConnection = (auth !== {} && auth !== undefined)

  hasConnection
    ? logConnectionFound(req)
    : logNoConnectionFound();

  return hasConnection

}

exports.refreshConnection = (session) => {
  return new jsforce.Connection(session.salesforce.auth)
}

exports.handleAuthRequired = (req, res, next) => {

  if (!isAuthenticating(req) && !foundConnection(req))
    return res.status(403).json({
      message: `You are not authenticated with Salesforce!`
    })

  next()

}

exports.getSfdcApi = async (connection) => {

  const defaultApi = {
    "label" : "Spring '20",
    "url" : "/services/data/v48.0",
    "version" : "48.0"
  }

  try {
    const version_list = await connection.request(`/services/data`)
    return version_list.pop()
  } catch (error) {
    console.error(error)
    return defaultApi
  }

}
