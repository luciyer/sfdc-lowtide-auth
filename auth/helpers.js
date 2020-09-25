const jsforce = require("jsforce")

const logConnectionFound = (req) => {
  const { user, auth } = req.session.salesforce
  console.log(`Salesforce session: ${user.username} at ${auth.instanceUrl}`)
}

const logNoConnectionFound = () => {
  console.log(`No Salesforce session found.`)
}

const isAuthenticating = (req) => {
  return [
    "/api/auth/login",
    "/api/auth/sfdc",
    "/api/auth/oauth"
  ].includes(req.originalUrl)
}

const foundConnection = (req) => {

  const { salesforce } = req.session,
        { auth } = salesforce;

  const hasConnection = (
    salesforce && auth !== {} && auth !== undefined
  )

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
