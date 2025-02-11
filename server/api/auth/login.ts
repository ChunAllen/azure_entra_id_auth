// server/api/auth/login.ts
import { defineEventHandler, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const tenantId = 'common'; // Change this if you're using a specific tenant
  const redirectUri = encodeURIComponent(process.env.REDIRECT_URI); // Ensure this matches your Azure App's redirect URI

  const loginUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?` +
    `client_id=${clientId}` +
    `&response_type=code` +
    `&redirect_uri=${redirectUri}` +
    `&scope=openid profile email` +
    `&response_mode=query`; // Use `query` mode for easy handling

  return sendRedirect(event, loginUrl);
});
