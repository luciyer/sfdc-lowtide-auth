# lowtide-auth

A starting point for developing external tooling, this package will allow you to create server-side sessions and store Salesforce authentication on those sessions.

---

### Setup

First, clone and navigate to the project directory.

```
npm install
cd sfdc-lowtide-auth/
```

You'll need to set some environment variables:

```
touch .env
```

Add the following, substituting your own values

```
CLIENT_ID=salesforce_connected_app_client_id
CLIENT_SECRET=salesforce_connected_app_client_secret
SESSION_SECRET=somesecret
HOSTNAME=http://localhost:8080
```

`CLIENT_ID` and `CLIENT_SECRET` are used by the Oauth2 flow. To retrieve these values, create a connected app in Salesforce.

`HOSTNAME` needs to match the hostname of the callback URL you set in your connected app.


_Note: Any unauthenticated requests to `/api/*` will return a message that user is not authenticated._

---

### Authentication Strategies

#### Username & Password

`POST` @ `/api/auth/login`

```
{
  "username": "user@some.org",
  "password": "password123"
}
```

#### Session ID & Server URL (from inside Salesforce Org)

`POST` @ `/api/auth/sfdc`

```
{
  "sessionId": "my_session_id_goes_here",
  "instanceUrl": "https://my.salesforce.instance.com"
}
```

#### Via Oauth2 (Browser)

`GET` @ `/api/auth` -> directs to Salesforce Oauth2 login flow.

#### View Session Information

_Warning: Response contains access token - consider removing in production._

`GET` @ `/api/auth/session`

#### Logout & Destroy Session

`GET` @ `/api/auth/revoke`
