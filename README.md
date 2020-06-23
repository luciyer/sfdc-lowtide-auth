# lowtide-auth

A starting point for developing external tooling, this package will allow you to create server-side sessions and store on those sessions three types of authentication into Salesforce: Username/Password, SessionId/ServerUrl, and Oauth2.

---

### Setup

Upon deploying, you'll need to define some environment variables:

```
CLIENT_ID=salesforce_connected_app_client_id
CLIENT_SECRET=salesforce_connected_app_client_secret
SESSION_SECRET=somesecret
SESSION_DURATION_MINS=60
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
    "revoke" : "/api/auth/revoke",
    "session" : "/api/auth/session"
  }
}
```

_Note: Any calls to `/api/*` before authentication will return a message that user must authenticate._

---

### Authentication

#### Via Username & Password

`POST` to `/api/auth`

```
{
  source: "credentials",
  credentials: {
    username: "user@some.org",
    password: "password123"
  }
}
```

#### Via Session ID & Server URL

`POST` to `/api/auth`

```
{
  source: "session",
  credentials: {
    session_id: "my_session_id_goes_here",
    server_url: "https://my.salesforce.instance.com"
  }
}
```

#### Via Oauth2 (Browser)

`GET` to `/api/auth`

#### Logout & Destroy Session

`GET` to `/api/auth/revoke`

#### View Session Information

_Warning: Contains access token - consider removing in production_

`GET` to `/api/auth/session`
