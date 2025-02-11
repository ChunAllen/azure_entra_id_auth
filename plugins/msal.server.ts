import { defineNuxtPlugin } from '#app';
import * as msal from '@azure/msal-node';

export default defineNuxtPlugin(nuxtApp => {
  const msalConfig = {
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      authority: 'https://login.microsoftonline.com/common', // Use your tenant ID or common endpoint
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET, // For server-side authentication
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: msal.LogLevel.Info,
      },
    },
  };

  const msalInstance = new msal.ConfidentialClientApplication(msalConfig);
  nuxtApp.provide('msal', msalInstance);
});
