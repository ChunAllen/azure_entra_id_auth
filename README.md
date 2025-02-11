# Azure Entra ID Auth with Nuxt.js

## Setup

Install Node Version Manager (NVM)
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

nvm install v23.4.0
```

Set environment variables
```
cp .env.copy .env // Set the credentials based on MS Entra ID
```

Install Dependencies
```
cd azure_sso_app
npm install
npm run dev
```

## Access the Application

```
npm run dev // Access the app using http://localhost:3000
```
