# Restaurant Backend (ES6 + Node + Express + MongoDB)

This repository is a full backend starter for a restaurant app using ES modules (import/export), MongoDB (Mongoose), JWT auth, and basic Stripe payment intent flow.

## Features
- User registration & login (JWT)
- Users with roles: customer, staff, admin
- Table CRUD + status (available, reserved, occupied)
- Orders: create, list, status updates
- Payments: Stripe payment intents + webhook placeholder
- Basic role-based authorization

## Setup
1. Copy `.env.example` to `.env` and fill values
2. `npm install`
3. `npm run dev` (requires nodemon) or `npm start`

ENV variables required:
- MONGODB_URI
- PORT
- JWT_SECRET
- JWT_EXPIRES_IN
- STRIPE_SECRET_KEY (optional for Stripe calls)

## Notes & Next steps
- Stripe webhook endpoint in production **must** verify signature header using `stripe.webhooks.constructEvent`
- Add tests, request/response schemas, and further validation
- Add pagination for list endpoints
- Add order item menu model (menu items catalog)


/*
{
  "name": "restaurant-backend",
  "version": "1.0.0",
  "description": "Restaurant backend in ES6, Express, MongoDB with auth, tables, payments, users and orders",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.2.0",
    "mongoose": "^7.5.0",
    "stripe": "^12.16.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

*/
