# Firebase Deployment Guide

## Prerequisites
- Firebase CLI installed globally: `npm install -g firebase-tools`
- Firebase project created with hosting enabled
- Site ID configured: `portfolio-26d52`

## Environment Setup
Your Firebase configuration is stored in `.env.local`. Make sure this file is not committed to version control.

## Deploy to Firebase Hosting

### Method 1: Using npm script (Recommended)
```bash
npm run deploy
```

### Method 2: Direct Firebase command
```bash
firebase deploy --only hosting:portfolio-26d52
```

### Method 3: Build and deploy separately
```bash
npm run build
firebase deploy --only hosting:portfolio-26d52
```

## Configuration Files

### firebase.json
- Configured to use the `out` directory (Next.js static export)
- Site ID: `portfolio-26d52`
- Includes rewrites for SPA routing

### next.config.ts
- Configured for static export (`output: 'export'`)
- Images unoptimized for static hosting
- Trailing slash enabled for better compatibility

## First Time Setup
If this is your first deployment, you may need to:

1. Login to Firebase:
   ```bash
   firebase login
   ```

2. Initialize the project (if not already done):
   ```bash
   firebase init hosting
   ```

3. Select your existing project and configure:
   - Public directory: `out`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

## Vercel Alternative
This project is also configured for Vercel deployment. Simply connect your GitHub repository to Vercel for automatic deployments.

## Environment Variables for Production
When deploying to Vercel, make sure to add these environment variables in your Vercel dashboard:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
