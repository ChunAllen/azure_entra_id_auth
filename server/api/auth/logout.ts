import { defineEventHandler, deleteCookie, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  // Remove the user authentication cookie
  deleteCookie(event, "user_profile");

  // Redirect to Microsoft logout URL
  return sendRedirect(event, "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000");
});
