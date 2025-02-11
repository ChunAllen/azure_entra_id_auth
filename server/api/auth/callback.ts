import { defineEventHandler, getQuery, sendRedirect, setCookie } from "h3";
import { ConfidentialClientApplication } from "@azure/msal-node";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const authCode = query.code; // Extract the authorization code

  if (!authCode) {
    return { error: "Authorization code is missing" };
  }

  const msalConfig = {
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      authority: "https://login.microsoftonline.com/common",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET
    },
  };

  const msalInstance = new ConfidentialClientApplication(msalConfig);

  const tokenRequest = {
    code: authCode,
    scopes: ["openid", "profile", "email"],
    redirectUri: "http://localhost:3000/api/auth/callback",
  };

  try {
    const response = await msalInstance.acquireTokenByCode(tokenRequest);

    // Debug: Log response
    console.log('Auth response:', response);

    if (response && response.account) {
      setCookie(event, "user_profile", JSON.stringify({
        username: response.account.username,
        name: response.account.name,
        id: response.account.homeAccountId
      }), {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day expiration
        secure: false,
        httpOnly: false,
      });
      return sendRedirect(event, "/dashboard"); // Redirect to dashboard after login
    } else {
      console.error("Authentication response is null or missing account details.");

      return sendRedirect(event, "/"); // Redirect to dashboard after login
    }


  } catch (error) {
    return { error: "Token exchange failed", details: error };
  }
});
