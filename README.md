# Kaveri University Admission Portal

This repository contains the complete full-stack Kaveri University Admission Portal, including the public-facing website and the secure Admin CRM Dashboard.

### Architecture
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js (Mongoose structure prepared for MongoDB)
- **Deployment Ready**: The code is structured for direct deployment to Vercel (Frontend) and Render/Heroku (Backend).

## 🚀 Deployment Instructions

### 1. Backend Deployment (Render - **EASY MODE**)

1. Connect your Github repo to Render.
2. Click **"New +"** and select **"Blueprint"**.
3. Select this repository.
4. Render will automatically use `render.yaml` to configure everything (Root Directory, Build, Start, Env Vars).

### 1.1 Backend Deployment (Manual)

1. Connect your GitHub repository to your Render/Heroku account.
2. **IMPORTANT**: Set the **"Root Directory"** to `backend`.
3. Set the **"Build Command"** to `npm install`.
4. Set the **"Start Command"** to `node index.js`.
5. Set the following **Environment Variables**:
   - `MONGO_URI`: Your MongoDB connection string (or it will use MockDB for the demo).
   - `JWT_SECRET`: A long random string.

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
