# Guardian Gateway - Student Portal

## Project Structure

- `/frontend` - React + Tailwind CSS frontend
- `/backend` - Express + MongoDB backend

## Local Setup

### Backend Setup

1. Navigate to backend: `cd backend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your values
4. Run: `npm run dev` or `node server.js`

### Frontend Setup

1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and set `VITE_API_URL`
4. Run: `npm run dev`

## Deployment

### Deploy Frontend (Vercel/Railway)

- Connect the GitHub repository
- Set root directory to `/frontend`
- Add environment variable: `VITE_API_URL`

### Deploy Backend (Render/Railway)

- Connect the GitHub repository
- Set root directory to `/backend`
- Add all environment variables from `.env.example`
