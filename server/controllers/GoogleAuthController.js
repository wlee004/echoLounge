const { google } = require("googleapis")
require("dotenv").config()
const crypto = require("crypto")
const axios = require("axios")

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the client_secret.json file. To get these credentials for your application, visit
 * https://console.cloud.google.com/apis/credentials.
 */

exports.oauth2_get = (req, res) => { 
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_AUTH_CLIENT_ID,
        process.env.GOOGLE_AUTH_CLIENT_SECRET,
        process.env.GOOGLE_AUTH_REDIRECT_URL
    )

    // Access scopes for one non-Sign-In scopes: Read-only Youtube
    const scopes = ["https://www.googleapis.com/auth/youtube.readonly"]

    // Generate a secure random state value.
    const state = crypto.randomBytes(32).toString('hex')

    // Store state in the session
    req.session.state = state
    
    // Generate a url that asks permissions for the Drive activity and Google Calendar scope
    const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        /** Pass in the scopes array defined above.
          * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
        scope: scopes,
        // Enable incremental authorization. Recommended as a best practice.
        include_granted_scopes: true,
        // Include the state parameter to reduce the risk of CSRF attacks.
        state: state
    })

    res.redirect(authorizationUrl)
}

exports.oauth2_callback = async (req, res) => { 
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Error: No code provided');
    }

    axios.post('https://oauth2.googleapis.com/token', {
        code,
        client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
        client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_AUTH_REDIRECT_URL,
        grant_type: 'authorization_code'
    })
    .then(response => { 
        const access_token = response.data.access_token
        console.log(response)
        req.session.google_auth_token = access_token
        res.redirect("http://localhost:3000/lobby")
    })
    .catch((error) => { 
        res.status(401).send("Error connecting to grab token: ", error)
    })    
}

exports.oauth2_protected = async (req, res) => { 
    const token = req.session.google_auth_token
    if (token) { 
        // Validate Token
        res.status(200).send("Authorized with Google API")
    } else { 
        res.status(401).send("Unauthorized with Google API")
    }
}

exports.oauth2_logout = async (req, res) => { 
    req.session.destroy((error) => { 
        if (error) { 
            console.error(`Error destroying session: ${error}`)
            res.send("Error destroying session")
        } else { 
            console.log("Session Destroyed")
            res.redirect("http://localhost:3000/")
        }
    })
}