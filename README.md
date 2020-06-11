# lowtide-auth

A starting point for developing external tooling, this package will allow you to create server-side sessions and store on those sessions three types of authentication into Salesforce: Username/Password, SessionId/ServerUrl, and Oauth2.

### Setup

Upon deploying, you'll need to define some environment variables:

```
CLIENT_ID=salesforce_connected_app_client_id
CLIENT_SECRET=salesforce_connected_app_client_secret
SESSION_SECRET=somesecret
BASE_URL=https://my-base-url.herokuapp.com
API_VERSION=48.0
```

Client ID and Client Secret are used by the Oauth2 flow.

Routes look like this (see `config/routes.json`):

```
{
  "auth" : {
    "required" : "/api/*",
    "request" : "/api/auth",
    "callback" : "/api/auth/callback",
    "revoke" : "/api/auth/revoke"
  }
}
```

### Authentication

```
{
  source: "session",
  credentials: {
    session_id: "",
    server_url: ""
  }
}
```
