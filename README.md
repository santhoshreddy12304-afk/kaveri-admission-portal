# Kaveri University Admission Portal

This repository contains the complete full-stack Kaveri University Admission Portal, including the public-facing website and the secure Admin CRM Dashboard.

### Architecture
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js (Mongoose structure prepared for MongoDB)
- **Deployment Ready**: The code is structured for direct deployment to Vercel (Frontend) and Render/Heroku (Backend).

## 🚀 Deployment Instructions

### 1. Backend Deployment (Render / Heroku)

1. Connect your GitHub repository to your Render/Heroku account.
2. Select the `backend` folder as your root directory (if supported) or deploy the entire repo and set the start command to: `cd backend && npm start`.
3. Set the following **Environment Variables**:
   - `PORT`: `5000` (or leave default for Render)
   - `MONGO_URI`: Your MongoDB connection string (currently using MockDB if not provided).
   - `JWT_SECRET`: A long random string for auth tokens.

### 2. Frontend Deployment (Vercel / Netlify)

1. Import the project into Vercel.
2. Set the Framework Preset to **Vite**.
3. Set the **Root Directory** to `frontend`.
4. Overwrite the build command if necessary: `npm run build`
5. Set the output directory to `dist`.
6. Add the following **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://kaveri-api.onrender.com`).

## 🛠 Local Development Configuration

If you wish to test the application locally:

**Start the Backend:**
```bash
cd backend
npm install
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm install
npm run dev
```

The application will be accessible at `http://localhost:5173`.
The Admin Panel login is located at `http://localhost:5173/admin/login`. Default credentials: `admin` / `admin`.

Enjoy the premium 3D design metrics and the powerful bulk WhatsApp campaign system!
