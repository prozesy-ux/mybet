# Render Deployment Guide

This project is configured for auto-deploy on Render.

## What this deploys:

1. **Backend** - Node.js/Express API on a free web service
2. **Frontend** - React/Vite app on a static service
3. **Database** - Supabase (external, not on Render)

## Steps to deploy:

### 1. Push to GitHub

Make sure the code is in the GitHub repo with render.yaml included.

```
git add .
git commit -m "Add Render deployment config"
git push origin main
```

### 2. Create Render Account

- Go to render.com
- Sign up with GitHub
- Authorize the connection

### 3. Create Services on Render

#### Backend Service:
- Click "Create New" → "Web Service"
- Connect your GitHub repo
- Name: `mybet-backend`
- Build Command: `cd server && npm install`
- Start Command: `cd server && node server.js`
- Environment Variables (see below)
- Deploy

#### Frontend Service:
- Click "Create New" → "Static Site"
- Connect your GitHub repo
- Name: `mybet-frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Environment Variables (see below)
- Deploy

### 4. Set Environment Variables

In each Render service, set these:

**Backend Variables:**
```
DATABASE_URL=postgresql://...
DATABASE_USER=postgres.xxxxx
DATABASE_PASSWORD=your-password
DATABASE_NAME=postgres
DATABASE_HOST=aws-1-ap-south-1.pooler.supabase.com
DATABASE_PORT=5432
DATABASE_SSL=true
JWT_SECRET=your-jwt-secret
ADMIN_JWT_SECRET=your-admin-jwt-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@12345
API_PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://mybet-frontend.render.com,https://gpzes.com
```

**Frontend Variables:**
```
VITE_API_BASE_URL=https://mybet-backend-xypv.onrender.com
VITE_PUBLIC_SITE_URL=https://mybet-frontend.render.com
```

### 5. Connect Custom Domain (Optional)

If you want to use gpzes.com:
- Add custom domain in Render
- Update DNS records at your registrar
- Update CORS_ORIGIN and VITE_API_BASE_URL

## Auto-Deploy

Every time you push to GitHub, Render automatically deploys the changes.

## Database Connection

The Supabase database connection string should be in `DATABASE_URL` environment variable in the backend service.

## URLs After Deployment

- Backend: https://mybet-backend-xypv.onrender.com
- Frontend: https://mybet-frontend.render.com
- Both auto-update on every GitHub push

## Troubleshooting

If deploy fails:
1. Check Render build logs
2. Verify all environment variables are set
3. Check GitHub repo is public or Render has access
4. Verify Supabase connection string is correct
