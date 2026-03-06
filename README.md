<div align="center">

# OTP Authentication System

### A Production-Ready Multi-Channel OTP Authentication Platform

[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

<br />

A secure, scalable, and modern OTP-based authentication system supporting **SMS**, **WhatsApp**, and **Email** verification channels.

[Getting Started](#-quick-start) •
[Documentation](#-api-documentation) •
[Deployment](#-deployment) •
[Contributing](#-contributing)

</div>

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Docker Deployment](#-docker-deployment)
- [Production Deployment](#-deployment)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## Overview

This project provides a complete, production-ready OTP authentication solution with a **Fastify + TypeScript** backend and a **React.js + Bootstrap** frontend. It demonstrates industry best practices for building secure, multi-channel authentication systems.

### Why This Project?

- **Multi-Channel Support**: Send OTPs via SMS, WhatsApp, or Email based on user preference
- **Secure by Design**: Redis-based OTP storage with TTL, JWT authentication, and input validation
- **Production Ready**: Docker support, environment configuration, and deployment guides included
- **Modern Stack**: TypeScript backend with React.js frontend using latest best practices
- **Scalable Architecture**: Clean MVC pattern that scales with your application

---

## Features

### Backend Features

| Feature | Description |
|---------|-------------|
| **Multi-Channel OTP** | Send OTP via SMS, WhatsApp, or Email |
| **Secure Storage** | Redis-based OTP storage with 5-minute TTL |
| **JWT Authentication** | Secure token-based authentication |
| **Rate Limiting Ready** | Architecture supports rate limiting implementation |
| **Type Safety** | Full TypeScript implementation |
| **Error Handling** | Comprehensive error handling with proper HTTP status codes |
| **CORS Support** | Configurable CORS for frontend integration |

### Frontend Features

| Feature | Description |
|---------|-------------|
| **Modern UI** | Clean, responsive Bootstrap 5 interface |
| **Channel Selection** | Easy toggle between SMS, WhatsApp, and Email |
| **OTP Input** | 6-digit OTP input with auto-focus navigation |
| **Protected Routes** | JWT-based route protection |
| **Token Management** | Automatic token handling with Axios interceptors |
| **Form Validation** | Real-time validation for phone, email inputs |
| **Loading States** | Smooth loading indicators and transitions |
| **Resend OTP** | Countdown timer with resend functionality |

---

## Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **Fastify** | High-performance Node.js web framework |
| **TypeScript** | Type-safe JavaScript |
| **Redis** | In-memory OTP storage with TTL |
| **@fastify/jwt** | JWT token generation and verification |
| **Twilio** | SMS and WhatsApp messaging |
| **Nodemailer** | Email delivery |
| **dotenv** | Environment configuration |

### Frontend

| Technology | Purpose |
|------------|---------|
| **React.js 18** | UI library |
| **React Router v6** | Client-side routing |
| **Bootstrap 5** | CSS framework |
| **React Bootstrap** | Bootstrap React components |
| **Axios** | HTTP client with interceptors |
| **React Icons** | Icon library |

### DevOps

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Nginx** | Production web server for frontend |
| **Vercel** | Frontend deployment |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    React.js Frontend                       │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐   │  │
│  │  │  Home   │  │  Login  │  │ Verify  │  │  Dashboard  │   │  │
│  │  │  Page   │  │  Page   │  │  OTP    │  │   (Auth)    │   │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────────┘   │  │
│  │                         │                                  │  │
│  │              ┌──────────┴──────────┐                       │  │
│  │              │   Auth Context      │                       │  │
│  │              │   (JWT Storage)     │                       │  │
│  │              └──────────┬──────────┘                       │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS / REST API
┌─────────────────────────────▼───────────────────────────────────┐
│                         SERVER LAYER                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   Fastify Backend                          │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐    │  │
│  │  │   Routes    │─▶│ Controllers │─▶│    Services     │    │  │
│  │  │ /api/auth/* │  │             │  │ OTP/Notification│    │  │
│  │  └─────────────┘  └─────────────┘  └────────┬────────┘    │  │
│  └─────────────────────────────────────────────┼─────────────┘  │
└─────────────────────────────────────────────────┼────────────────┘
                              ┌───────────────────┴───────────────┐
                              │                                   │
┌─────────────────────────────▼───┐  ┌────────────────────────────▼──┐
│           DATA LAYER            │  │       EXTERNAL SERVICES       │
│  ┌───────────────────────────┐  │  │  ┌─────────┐  ┌───────────┐   │
│  │          Redis            │  │  │  │ Twilio  │  │ Nodemailer│   │
│  │   ┌───────────────────┐   │  │  │  │  (SMS)  │  │  (Email)  │   │
│  │   │  OTP Storage      │   │  │  │  │(WhatsApp│  │           │   │
│  │   │  (TTL: 5 min)     │   │  │  │  └─────────┘  └───────────┘   │
│  │   └───────────────────┘   │  │  │                               │
│  └───────────────────────────┘  │  └───────────────────────────────┘
└─────────────────────────────────┘
```

### Request Flow

```
1. User enters phone/email → Frontend validates input
2. User selects channel (SMS/WhatsApp/Email) → Frontend sends POST /api/auth/send-otp
3. Backend generates 6-digit OTP → Stores in Redis with 5-min TTL
4. Backend sends OTP via selected channel (Twilio/Nodemailer)
5. User enters OTP → Frontend sends POST /api/auth/verify-otp
6. Backend verifies OTP from Redis → Generates JWT token
7. Frontend stores JWT → Redirects to protected dashboard
```

---

## Project Structure

```
otp-auth-fastify-ts/
│
├── src/                              # Backend Source Code
│   ├── config/
│   │   └── redis.ts                  # Redis client configuration
│   ├── controllers/
│   │   └── auth.controller.ts        # Authentication request handlers
│   ├── routes/
│   │   └── auth.routes.ts            # API route definitions
│   ├── services/
│   │   ├── notification.service.ts   # SMS, WhatsApp, Email services
│   │   └── otp.service.ts            # OTP generation & verification
│   ├── utils/
│   │   └── otp.ts                    # OTP generator utility
│   └── server.ts                     # Application entry point
│
├── frontend/                         # Frontend Source Code
│   ├── public/
│   │   ├── index.html                # HTML template
│   │   ├── manifest.json             # PWA manifest
│   │   └── robots.txt                # SEO robots file
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.js # Route protection HOC
│   │   │   ├── common/
│   │   │   │   └── Loading.js        # Loading spinner component
│   │   │   └── layout/
│   │   │       ├── Navbar.js         # Navigation component
│   │   │       └── Footer.js         # Footer component
│   │   ├── config/
│   │   │   └── api.js                # Axios instance & interceptors
│   │   ├── context/
│   │   │   └── AuthContext.js        # Authentication state management
│   │   ├── pages/
│   │   │   ├── Home.js               # Landing page
│   │   │   ├── Login.js              # Login/Send OTP page
│   │   │   ├── VerifyOTP.js          # OTP verification page
│   │   │   └── Dashboard.js          # Protected dashboard
│   │   ├── services/
│   │   │   └── authService.js        # Authentication API calls
│   │   ├── styles/
│   │   │   └── index.css             # Global styles
│   │   ├── utils/
│   │   │   ├── constants.js          # App constants
│   │   │   └── validators.js         # Input validation functions
│   │   ├── App.js                    # Root component with routes
│   │   └── index.js                  # React entry point
│   ├── .env.example                  # Environment template
│   ├── Dockerfile                    # Frontend Docker config
│   ├── nginx.conf                    # Nginx configuration
│   ├── package.json                  # Frontend dependencies
│   └── vercel.json                   # Vercel deployment config
│
├── .env.example                      # Backend environment template
├── .gitignore                        # Git ignore rules
├── docker-compose.yml                # Multi-container setup
├── Dockerfile                        # Backend Docker config
├── package.json                      # Backend dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # Project documentation
```

---

## Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **npm** >= 9.x (comes with Node.js)
- **Redis** >= 6.x ([Download](https://redis.io/download) or use Docker)
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone the Repository

```bash
git clone https://github.com/ishwar-lahire/otp-auth-fastify-ts.git
cd otp-auth-fastify-ts
```

### Step 2: Setup Backend

```bash
# Install backend dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration (see Configuration section)
nano .env  # or use any text editor
```

### Step 3: Start Redis

**Option A: Local Redis**
```bash
redis-server
```

**Option B: Docker Redis**
```bash
docker run -d --name redis -p 6379:6379 redis:alpine
```

### Step 4: Start Backend Server

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm run build
npm start
```

Backend will be running at: `http://localhost:5000`

### Step 5: Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Step 6: Start Frontend Server

```bash
# Development mode
npm start

# Production build
npm run build
```

Frontend will be running at: `http://localhost:3000`

---

## Configuration

### Backend Environment Variables

Create a `.env` file in the **root directory**:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Redis Configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=            # Optional: Leave empty if no password

# Twilio Configuration (SMS & WhatsApp)
TWILIO_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+1234567890   # Your Twilio phone number

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Frontend Environment Variables

Create a `.env` file in the **frontend directory**:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_APP_NAME=OTP Auth System
```

### Third-Party Service Setup

<details>
<summary><b>Twilio SMS Setup</b></summary>

1. Create a [Twilio Account](https://www.twilio.com/try-twilio)
2. Go to [Twilio Console](https://console.twilio.com/)
3. Copy your **Account SID** and **Auth Token**
4. Get a phone number from **Phone Numbers** > **Manage** > **Buy a number**
5. For trial accounts, verify recipient numbers in **Phone Numbers** > **Verified Caller IDs**
6. Enable **Geo Permissions** for India (Settings > Geo Permissions)

</details>

<details>
<summary><b>Twilio WhatsApp Setup</b></summary>

1. Go to **Messaging** > **Try it out** > **Send a WhatsApp message**
2. Follow the sandbox setup instructions
3. Send `join <your-sandbox-code>` to `+1 415 523 8886` from your WhatsApp
4. The sandbox number `whatsapp:+14155238886` is pre-configured in the code

</details>

<details>
<summary><b>Gmail SMTP Setup</b></summary>

1. Enable [2-Step Verification](https://myaccount.google.com/security) on your Google Account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Select **Mail** and **Other (Custom name)**
4. Enter "OTP Auth System" and click **Generate**
5. Copy the 16-character password to your `.env` file

</details>

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Send OTP

Generates and sends a 6-digit OTP to the specified identifier.

```http
POST /api/auth/send-otp
Content-Type: application/json
```

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identifier` | string | Yes | Phone number (with country code) or email address |
| `type` | string | Yes | Channel type: `sms`, `whatsapp`, or `email` |

**Example Request:**

```json
{
  "identifier": "+919876543210",
  "type": "sms"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "OTP sent successfully via sms"
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Invalid phone number format"
}
```

---

#### Verify OTP

Verifies the OTP and returns a JWT access token on success.

```http
POST /api/auth/verify-otp
Content-Type: application/json
```

**Request Body:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `identifier` | string | Yes | Phone number or email used during OTP request |
| `otp` | string | Yes | 6-digit OTP received |

**Example Request:**

```json
{
  "identifier": "+919876543210",
  "otp": "123456"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "OTP verified successfully",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

| Status | Message |
|--------|---------|
| 400 | Invalid OTP |
| 400 | OTP expired |
| 400 | OTP not found |

---

### Testing with cURL

**Send OTP via SMS:**
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "+919876543210", "type": "sms"}'
```

**Send OTP via WhatsApp:**
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "+919876543210", "type": "whatsapp"}'
```

**Send OTP via Email:**
```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "user@example.com", "type": "email"}'
```

**Verify OTP:**
```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"identifier": "+919876543210", "otp": "123456"}'
```

---

## Docker Deployment

### Using Docker Compose (Recommended)

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  # Redis Service
  redis:
    image: redis:7-alpine
    container_name: otp-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend Service
  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: otp-backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=${JWT_SECRET}
      - TWILIO_SID=${TWILIO_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
      - TWILIO_PHONE=${TWILIO_PHONE}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASS=${EMAIL_PASS}
    depends_on:
      redis:
        condition: service_healthy
    restart: unless-stopped

  # Frontend Service
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        - REACT_APP_API_URL=http://localhost:5000/api
    container_name: otp-frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  redis_data:
```

**Run the stack:**

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Individual Docker Builds

**Backend Dockerfile** (create in root):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

**Build and run backend:**

```bash
docker build -t otp-backend .
docker run -d -p 5000:5000 --env-file .env otp-backend
```

**Build and run frontend:**

```bash
cd frontend
docker build -t otp-frontend .
docker run -d -p 80:80 otp-frontend
```

---

## Deployment

### Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variables** in Vercel Dashboard:
   - `REACT_APP_API_URL` = Your backend URL

### Backend Deployment Options

<details>
<summary><b>Railway</b></summary>

1. Connect your GitHub repository to [Railway](https://railway.app/)
2. Add a Redis service
3. Set environment variables
4. Deploy automatically on push

</details>

<details>
<summary><b>Render</b></summary>

1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables
6. Add a Redis service

</details>

<details>
<summary><b>DigitalOcean App Platform</b></summary>

1. Create a new App on [DigitalOcean](https://www.digitalocean.com/products/app-platform)
2. Connect your GitHub repository
3. Add a Redis database
4. Configure environment variables
5. Deploy

</details>

<details>
<summary><b>AWS EC2 + ElastiCache</b></summary>

1. Launch an EC2 instance (Ubuntu 22.04)
2. Create an ElastiCache Redis cluster
3. Install Node.js and PM2
4. Clone repository and install dependencies
5. Configure environment variables
6. Start with PM2: `pm2 start dist/server.js`

</details>

---

## Security

### Implemented Security Measures

| Measure | Description |
|---------|-------------|
| **OTP Expiry** | OTPs expire after 5 minutes (Redis TTL) |
| **JWT Tokens** | Secure token-based authentication |
| **Environment Variables** | Sensitive data stored in `.env` |
| **Input Validation** | All inputs validated on frontend and backend |
| **CORS** | Configured for specific origins |
| **HTTPS Ready** | Nginx configured for SSL termination |

### Production Security Checklist

- [ ] Use strong, unique `JWT_SECRET` (min 32 characters)
- [ ] Enable HTTPS with SSL certificates
- [ ] Configure CORS for specific domains only
- [ ] Implement rate limiting
- [ ] Add OTP attempt limits
- [ ] Use Redis password in production
- [ ] Enable HTTP-only cookies for tokens
- [ ] Implement refresh token rotation
- [ ] Add request logging and monitoring
- [ ] Regular security audits

---

## Troubleshooting

### Common Issues

<details>
<summary><b>Redis Connection Failed</b></summary>

**Error:** `Error: Redis connection to 127.0.0.1:6379 failed`

**Solution:**
1. Ensure Redis is running: `redis-cli ping`
2. Check Redis port: `lsof -i :6379`
3. Start Redis: `redis-server` or `docker run -d -p 6379:6379 redis:alpine`

</details>

<details>
<summary><b>Twilio SMS Not Sending</b></summary>

**Error:** `Unable to create record: The number is unverified`

**Solution:**
1. For trial accounts, verify recipient numbers in Twilio Console
2. Go to **Phone Numbers** > **Verified Caller IDs**
3. Add and verify the recipient phone number

</details>

<details>
<summary><b>WhatsApp Messages Not Delivered</b></summary>

**Error:** Messages sent but not received

**Solution:**
1. Ensure you've joined the Twilio Sandbox
2. Send `join <sandbox-code>` to `+14155238886`
3. Check sandbox is active in Twilio Console

</details>

<details>
<summary><b>Gmail SMTP Authentication Failed</b></summary>

**Error:** `Invalid login: 535-5.7.8 Username and Password not accepted`

**Solution:**
1. Enable 2-Step Verification on Google Account
2. Generate App Password (not regular password)
3. Use App Password in `EMAIL_PASS`

</details>

<details>
<summary><b>CORS Error on Frontend</b></summary>

**Error:** `Access-Control-Allow-Origin` error

**Solution:**
1. Ensure backend CORS is configured correctly
2. Check `REACT_APP_API_URL` matches backend URL
3. Include protocol (http/https) in URLs

</details>

---

## Roadmap

### Upcoming Features

- [ ] OTP retry/attempt limits
- [ ] Rate limiting (per IP and per identifier)
- [ ] Refresh token rotation
- [ ] Swagger/OpenAPI documentation
- [ ] Winston logging with log rotation
- [ ] Global error handler middleware
- [ ] Unit tests (Jest)
- [ ] E2E tests (Cypress)
- [ ] PWA support
- [ ] Dark mode theme
- [ ] Admin dashboard
- [ ] Analytics and monitoring

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

---

## License

This project is licensed under the **ISC License**.

---

## Author

<div align="center">

### Ishwar Lahire

**Full-Stack Developer**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ishwar-lahire)

*Specializing in Node.js, Fastify, Redis, React.js, and TypeScript*

---

If this project helped you, please consider giving it a star on GitHub!

</div>
