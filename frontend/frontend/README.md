# OTP Authentication System (Full-Stack)

A Professional Multi-Channel OTP Authentication System built using **Fastify + TypeScript** backend and **React.js + Bootstrap** frontend.

This system supports secure OTP-based authentication using:

- **SMS** (Twilio)
- **WhatsApp** (Twilio Sandbox)
- **Email** (Nodemailer)
- **Redis** (OTP storage with TTL)
- **JWT** (Access Token generation)

---

## Project Overview

This project demonstrates how to build a real-world OTP authentication system with:

- Multi-channel OTP delivery (SMS, WhatsApp, Email)
- Secure Redis-based temporary OTP storage
- JWT-based authentication
- Clean MVC architecture
- Type-safe TypeScript backend
- Modern React.js frontend with Bootstrap
- Production-ready structure

---

## Features

### Backend
- OTP generation (6-digit)
- OTP verification with expiry (Redis TTL)
- SMS integration via Twilio
- WhatsApp integration via Twilio Sandbox
- Email OTP via Gmail (App Password)
- JWT Access Token generation
- Error handling with proper HTTP status codes
- Clean and scalable folder structure

### Frontend
- Modern React.js SPA
- Responsive Bootstrap 5 UI
- OTP input with auto-focus
- Multi-channel selection (SMS/WhatsApp/Email)
- Protected routes with JWT
- Token management with Axios interceptors
- Form validation
- Loading states and error handling
- Production-ready with Docker support

---

## Technologies Used

### Backend
- Fastify
- TypeScript
- Redis
- @fastify/jwt
- Twilio API
- Nodemailer
- dotenv

### Frontend
- React.js 18
- React Router DOM v6
- Bootstrap 5
- Axios
- React Bootstrap
- React Icons

---

## Project Structure

```
otp-auth-fastify-ts/
├── src/                          # Backend source
│   ├── controllers/
│   │   └── auth.controller.ts
│   ├── services/
│   │   ├── otp.service.ts
│   │   └── notification.service.ts
│   ├── routes/
│   │   └── auth.routes.ts
│   ├── config/
│   │   └── redis.ts
│   ├── utils/
│   │   └── otp.ts
│   └── server.ts
├── frontend/                     # Frontend source
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── common/
│   │   │   │   └── Loading.js
│   │   │   └── layout/
│   │   │       ├── Navbar.js
│   │   │       └── Footer.js
│   │   ├── config/
│   │   │   └── api.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── VerifyOTP.js
│   │   │   └── Dashboard.js
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   ├── App.js
│   │   └── index.js
│   ├── .env.example
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vercel.json
├── .env.example
├── tsconfig.json
├── package.json
└── README.md
```

---

## Environment Variables

### Backend (.env)

Create a `.env` file in root directory:

```env
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

### Frontend (.env)

Create a `.env` file in frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Ishwar Lahire Services
```

---

## Important Setup Notes

### Twilio SMS
1. Go to [Twilio Console](https://console.twilio.com/)
2. Buy or get a trial number
3. Use that number in `TWILIO_PHONE`
4. Verify your personal number if using trial account
5. Enable Geo Permissions for India (if sending internationally)

### Twilio WhatsApp Sandbox
1. Go to Messaging → Try it out → WhatsApp Sandbox
2. Send: `join <sandbox-code>` to: `+14155238886`
3. Update WhatsApp sender in code: `from: "whatsapp:+14155238886"`

### Gmail Setup
1. Enable 2-Step Verification
2. Generate [App Password](https://myaccount.google.com/apppasswords)
3. Use App Password in `.env`

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/ishwar-lahire/otp-auth-fastify-ts.git
cd otp-auth-fastify-ts
```

### Backend Setup

```bash
# Install dependencies
npm install

# Start Redis Server (local)
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis

# Run in development mode
npm run dev

# Build for production
npm run build
npm start
```

Server runs at: `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Create environment file
cp .env.example .env

# Install dependencies
npm install

# Run in development mode
npm start

# Build for production
npm run build
```

Frontend runs at: `http://localhost:3000`

---

## Docker Setup

### Backend

```bash
# Build and run backend
docker build -t otp-auth-backend .
docker run -p 5000:5000 otp-auth-backend
```

### Frontend

```bash
# Build and run frontend
cd frontend
docker build -t otp-auth-frontend .
docker run -p 80:80 otp-auth-frontend
```

### Docker Compose (Full Stack)

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - REDIS_HOST=redis
    depends_on:
      - redis

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

---

## API Endpoints

### Send OTP

```http
POST /api/auth/send-otp
```

**Request Body:**
```json
{
  "identifier": "+919876543210",
  "type": "sms"
}
```

`type` can be: `sms`, `whatsapp`, `email`

### Verify OTP

```http
POST /api/auth/verify-otp
```

**Request Body:**
```json
{
  "identifier": "+919876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "message": "OTP verified successfully",
  "accessToken": "jwt_token_here"
}
```

---

## Testing with cURL

### Send OTP

```bash
curl -X POST http://localhost:5000/api/auth/send-otp \
-H "Content-Type: application/json" \
-d '{"identifier":"+919876543210","type":"sms"}'
```

### Verify OTP

```bash
curl -X POST http://localhost:5000/api/auth/verify-otp \
-H "Content-Type: application/json" \
-d '{"identifier":"+919876543210","otp":"123456"}'
```

---

## Architecture

The project follows **MVC architecture**:

### Backend
- **Controllers** → Handle request/response
- **Services** → Business logic
- **Config** → Redis & JWT configuration
- **Routes** → API routes
- **Utils** → OTP generator
- **server.ts** → Application entry point

### Frontend
- **Components** → Reusable UI components
- **Pages** → Route-based page components
- **Services** → API integration layer
- **Context** → Global state management
- **Utils** → Helper functions & constants
- **Config** → API configuration

---

## Security Notes

- OTP stored temporarily in Redis (TTL: 5 minutes)
- JWT used for authentication
- Secrets managed using `.env`
- `.env` excluded via `.gitignore`
- CORS configured for frontend origin
- HTTP-only considerations for production
- Input validation on both frontend and backend

---

## Deployment

### Vercel (Frontend)

```bash
cd frontend
vercel deploy
```

### Railway/Render (Backend)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy

### AWS/DigitalOcean (Full Stack)

Use the Docker Compose setup for containerized deployment.

---

## Screenshots

### Home Page
Modern landing page with feature highlights and call-to-action.

### Login Page
Multi-channel OTP selection (SMS/WhatsApp/Email) with form validation.

### OTP Verification
6-digit OTP input with auto-focus and resend functionality.

### Dashboard
Protected user dashboard with profile information.

---

## Future Improvements

- [ ] OTP retry limit
- [ ] Rate limiting
- [ ] Refresh token rotation
- [ ] Swagger documentation
- [ ] Winston logging
- [ ] Global error handler
- [ ] Unit tests (Jest)
- [ ] E2E tests (Cypress)
- [ ] PWA support
- [ ] Dark mode

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License.

---

## Author

Built by **Ishwar Lahire**

Backend Developer | Node.js | Fastify | Redis | React.js

- GitHub: [@ishwar-lahire](https://github.com/ishwar-lahire)

---

## Support

If you found this project helpful, please give it a star on GitHub!
