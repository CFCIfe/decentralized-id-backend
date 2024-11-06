# Decentralized ID Backend

This is a NestJS backend application that authenticates users using decentralized identifiers (DIDs) and public key verification. Authenticated users can access and update personal, health, and educational information, with data securely stored in a MongoDB database.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [Database](#database)
- [Endpoints](#endpoints)
- [License](#license)

## Getting Started

To set up this project, ensure you have the following:

- Node.js (v14 or higher)
- Yarn package manager
- MongoDB instance (local or hosted)
- Access to Algorand Testnet (optional, depending on usage)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CFCIfe/decentralized-id-backend.git
   cd decentralized-id-backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables (see [Environment Variables](#environment-variables)).

## Running the Application

Start the server in development mode:
```bash
yarn start
```

The server will start on `http://localhost:3000` by default.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```dotenv
# MongoDB configuration
MONGODB_URI='mongo_db_uri'
MONGODB_DATABASE='db_name'

# JWT configuration
JWT_SECRET='your_jwt_secret'

# Algorand Testnet configuration (optional)
ALGOD_TOKEN=''
ALGOD_SERVER='https://testnet-api.algonode.cloud'
ALGOD_PORT=''
INDEXER_TOKEN=''
INDEXER_SERVER='https://testnet-idx.algonode.cloud'
INDEXER_PORT=''
```

## Authentication Flow

This application uses decentralized identifiers (DIDs) for authentication with the following process:

1. **User Authentication**: On the client side, the user signs an authentication transaction with their private key.
2. **Public Key Verification**: The server verifies the transaction by comparing the client-provided public key with the user’s registered DID.
3. **JWT Token Generation**: If the keys match, the server generates a JWT token.
4. **Access to Endpoints**: The JWT token enables the user to interact with various endpoints on the server.

## Database

The server uses a MongoDB database to store and manage user information. Only authenticated users can access and modify their data.

## Endpoints

### Authentication and Profile Management

- **`POST /did/auth/login`**  
  Authenticate by verifying ownership of the DID.

- **`GET /did/profile`**  
  Retrieve the authenticated user's profile information.

- **`PUT /did/profile/personal-information`**  
  Create or update the user's personal information.

- **`PUT /did/profile/health-information`**  
  Create or update the user's health information.

- **`PUT /did/profile/education-information`**  
  Create or update the user's education information.

All of these endpoints are protected, requiring JWT authentication. Detailed API documentation is available via Swagger at `http://localhost:3000/api`.
