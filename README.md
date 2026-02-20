# OTP Authentication System (Fastify + TypeScript)

A Professional Multi-Channel OTP Authentication System built using **Fastify** and **TypeScript**.

This system supports secure OTP-based authentication using:

* 📱 SMS (Twilio)
* 💬 WhatsApp (Twilio Sandbox)
* 📧 Email (Nodemailer)
* 🧠 Redis (OTP storage with TTL)
* 🔐 JWT (Access Token generation)

---

#  Project Overview

This project demonstrates how to build a real-world OTP authentication system with:

* Multi-channel OTP delivery
* Secure Redis-based temporary OTP storage
* JWT-based authentication
* Clean MVC architecture
* Type-safe TypeScript backend
* Production-ready structure

---

#  Features

* OTP generation (6-digit)
* OTP verification with expiry (Redis TTL)
* SMS integration via Twilio
* WhatsApp integration via Twilio Sandbox
* Email OTP via Gmail (App Password)
* JWT Access Token generation
* Error handling with proper HTTP status codes
* Clean and scalable folder structure
* Environment variable configuration

---

# Technologies Used

* Fastify
* TypeScript
* Redis
* @fastify/jwt
* Twilio API
* Nodemailer
* dotenv

---

#  Project Structure

```
src/
 ├── controllers/
 ├── services/
 ├── routes/
 ├── config/
 ├── utils/
 ├── server.ts
.env.example
tsconfig.json
package.json
```

---

#  Environment Variables

Create a `.env` file in root directory:

```
PORT=5000
JWT_SECRET=your_jwt_secret

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_sms_number

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

---

#  Important Setup Notes

# Twilio SMS

* Go to Twilio Console
* Buy or get a trial number
* Use that number in `TWILIO_PHONE`
* Verify your personal number if using trial account
* Enable Geo Permissions for India (if sending internationally)

---

##  Twilio WhatsApp Sandbox

* Go to Messaging → Try it out → WhatsApp Sandbox
* Send:

```
join <sandbox-code>
```

to:

```
+14155238886
```

* Update WhatsApp sender in code:

```
from: "whatsapp:+14155238886"
```

---

##  Gmail Setup

* Enable 2-Step Verification
* Generate App Password
* Use App Password in `.env`

---

#  Installation & Setup

##  Clone Repository

```bash
git clone https://github.com/ishwar-lahire/otp-auth-fastify-ts.git
cd otp-auth-fastify-ts
```

---

# Install Dependencies

```bash
npm install
```

---

# Start Redis Server

If using local Redis:

```bash
redis-server
```

Or using Docker:

```bash
docker run -d -p 6379:6379 redis
```

---

# Run in Development Mode

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

# Build for Production

```bash
npm run build
npm start
```

---

#  API Endpoints

---

# Send OTP

POST `/api/auth/send-otp`

# Request Body

```json
{
  "identifier": "+919876543210",
  "type": "sms"
}
```

type can be:

* sms
* whatsapp
* email

---

# Verify OTP

POST `/api/auth/verify-otp`

# Request Body

```json
{
  "identifier": "+919876543210",
  "otp": "123456"
}
```

# Response

```json
{
  "message": "OTP verified successfully",
  "accessToken": "jwt_token_here"
}
```

---

# Testing with cURL

# Send OTP

```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
-H "Content-Type: application/json" \
-d "{\"identifier\":\"+919876543210\",\"type\":\"sms\"}"
```

# Verify OTP

```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
-H "Content-Type: application/json" \
-d "{\"identifier\":\"+919876543210\",\"otp\":\"123456\"}"
```

---

#  Architecture

The project follows MVC architecture:

* Controllers → Handle request/response
* Services → Business logic
* Config → Redis & JWT configuration
* Routes → API routes
* Utils → OTP generator
* server.ts → Application entry point

---

#  Security Notes

* OTP stored temporarily in Redis (TTL)
* JWT used for authentication
* Secrets managed using `.env`
* `.env` excluded via `.gitignore`

---

#  Future Improvements

* OTP retry limit
* Rate limiting
* Refresh token rotation
* Swagger documentation
* Dockerized setup
* Winston logging
* Global error handler

---

#  Author

Built by **Ishwar Lahire**
Backend Developer | Node.js | Fastify | Redis

---
