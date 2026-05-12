# 🚀 Complete Deployment Guide - Netlify/Vercel + Render + AWS SNS

## Architecture You Need

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR USERS                               │
└────────────────┬────────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
   ┌────▼─────┐      ┌────▼──────┐
   │ Netlify/ │      │  BACKEND   │
   │  Vercel  │      │ (Render)   │
   │(Frontend)│      │24/7 Running│
   └────┬─────┘      └────┬───────┘
        │                 │
        │ API calls to    │ Stores/retrieves
        │ /api/messages   │
        │                 │ 
        │            ┌────▼──────────┐
        │            │  MongoDB      │
        │            │  Atlas        │
        │            │  (Database)   │
        │            └──────┬────────┘
        │                   │
        │            ┌──────▼────────┐
        │            │  Scheduler    │
        │            │  (runs every  │
        │            │   minute on   │
        │            │   Render)     │
        │            └──────┬────────┘
        │                   │
        │         Sends message via
        │         AWS SNS API
        │                   │
        │            ┌──────▼────────┐
        │            │   AWS SNS     │
        │            │   (FREE!)     │
        │            └──────┬────────┘
        │                   │
        │            Sends real WhatsApp
        │                   │
        └───────────────────┼───────────┐
                            │           │
                    ┌───────▼────┐ ┌───▼──────┐
                    │ Recipient  │ │Recipient │
                    │ Phone gets │ │  Phone   │
                    │ WhatsApp   │ │ gets SMS │
                    └────────────┘ └──────────┘
```

---

## Step-by-Step Deployment Plan

### PART 1: Prepare Your Code (Local)

#### Step 1.1: Current Setup (Already Done!)

You have:
- ✅ MongoDB setup (MONGODB_URI)
- ✅ AWS SNS setup (credentials)
- ✅ Backend code ready
- ✅ Frontend code ready

#### Step 1.2: Create .env File for Backend

Create: `backend/.env`

```env
# MongoDB
MONGODB_URI=mongodb+srv://HaroonWaheed:Haroon123456@cluster.mongodb.net/messagescheduler?retryWrites=true&w=majority

# AWS SNS
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJalr...
AWS_REGION=us-east-1

# Server
PORT=5000
NODE_ENV=production
```

#### Step 1.3: Test Locally

```powershell
cd backend
npm install
npm start
```

Should see:
```
✅ AWS SNS configured successfully
✅ MongoDB Connected Successfully
⏰ Scheduler initialized - checking every minute
🚀 Server is running on http://localhost:5000
```

Open another terminal:
```powershell
# Open frontend
start frontend/index.html
```

Test scheduling a message!

---

### PART 2: Deploy Backend to Render (FREE!)

#### Step 2.1: Create Render Account

1. Go to: https://render.com/
2. Click **"Sign up"**
3. Sign up with email or GitHub
4. Verify email

#### Step 2.2: Create Git Repository

You need to push code to GitHub first!

**1. Create GitHub Account (if you don't have)**
- Go to: https://github.com/
- Click **"Sign up"**
- Create account

**2. Create GitHub Repository**
- Click **"+"** (top right)
- Click **"New repository"**
- Name: `message-scheduler`
- Description: "WhatsApp message scheduler"
- Choose **"Public"** (free tier)
- **DO NOT** initialize with README
- Click **"Create repository"**

**3. Push Your Code to GitHub**

In PowerShell:
```powershell
cd "f:\Side Projects\MessageScheduler"

# Initialize git
git init

# Add all files
git add .

# Create gitignore first (important!)
# Create file: .gitignore with content:
# backend/.env
# backend/node_modules/
# .DS_Store
# *.log

# Commit
git commit -m "Initial commit - message scheduler"

# Add remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/message-scheduler.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**4. Enter Your GitHub Credentials**
- Username: Your GitHub username
- Password: Generate access token at https://github.com/settings/tokens
  - Click "Generate new token"
  - Select "repo" scope
  - Copy token and use as password

#### Step 2.3: Deploy to Render

**1. Go to Render Dashboard**
- https://dashboard.render.com/

**2. Create New Service**
- Click **"New +"**
- Choose **"Web Service"**

**3. Connect GitHub Repository**
- Click **"Connect account"** (if not connected)
- Select **"message-scheduler"** repo
- Click **"Connect"**

**4. Configure Deployment**
- **Name**: `messagescheduler-backend`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Instance Type**: `Free` (FREE!)

**5. Add Environment Variables**
- Click **"Advanced"**
- Click **"Add Environment Variable"**
- Add each variable:

```
MONGODB_URI = mongodb+srv://HaroonWaheed:Haroon123456@cluster.mongodb.net/messagescheduler?retryWrites=true&w=majority

AWS_ACCESS_KEY_ID = AKIA...

AWS_SECRET_ACCESS_KEY = wJalr...

AWS_REGION = us-east-1

NODE_ENV = production
```

**6. Deploy**
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- You'll get a URL like: `https://messagescheduler-backend.onrender.com`
- **Copy this URL!**

**7. Verify Deployment**
- Go to: `https://messagescheduler-backend.onrender.com/api/health`
- Should see: `{"status":"OK","timestamp":"..."}`

---

### PART 3: Deploy Frontend to Netlify

#### Step 3.1: Update API URL

Open: `frontend/app.js`

Find this line (around line 3):
```javascript
const API_URL = 'http://localhost:5000/api';
```

Replace with your Render URL:
```javascript
const API_URL = 'https://messagescheduler-backend.onrender.com/api';
```

Save file!

#### Step 3.2: Deploy to Netlify

**1. Go to Netlify**
- https://www.netlify.com/
- Click **"Sign up"**
- Sign up with GitHub (easiest)

**2. Create New Site**
- Click **"New site from Git"**
- Select **"GitHub"**
- Authorize Netlify with GitHub
- Select **"message-scheduler"** repository

**3. Configure Build**
- **Base directory**: Leave empty (or `frontend`)
- **Build command**: Leave empty
- **Publish directory**: `frontend`
- Click **"Deploy site"**

**4. Wait for Deployment**
- Takes 1-2 minutes
- You'll get URL like: `https://message-scheduler-12345.netlify.app`

**5. Test**
- Open your Netlify URL
- Schedule a message
- Should work!

---

### PART 4: Test Everything

#### Step 4.1: Test Frontend

1. Open: `https://message-scheduler-12345.netlify.app`
2. You should see the dashboard
3. Fill in:
   - Phone: Your number (with country code)
   - Message: "Test from deployed app"
   - Date: Today
   - Time: 2 minutes from now
4. Click "Schedule Message"

#### Step 4.2: Watch Backend Logs

1. Go to Render dashboard
2. Click your service
3. Click **"Logs"** tab
4. Watch for:
```
📨 Found 1 message(s) to send
✅ Message sent successfully
```

#### Step 4.3: Check Your Phone

1. Wait 1-2 minutes
2. You should receive WhatsApp or SMS message!

#### Step 4.4: Check Frontend

1. Refresh dashboard
2. Message status should be "SENT"

---

## What Each Service Does

### Netlify (Frontend)
- ✅ Hosts your HTML/CSS/JavaScript
- ✅ Serves the dashboard website
- ✅ FREE (forever!)
- Limits: Static files only

### Render (Backend)
- ✅ Runs your Node.js server
- ✅ Runs the scheduler (24/7)
- ✅ FREE tier (450 hours/month = always on!)
- Limits: None for your use case

### MongoDB Atlas (Database)
- ✅ Stores your messages
- ✅ Cloud database
- ✅ FREE M0 tier
- Limits: Unlimited for small projects

### AWS SNS (Messages)
- ✅ Sends real WhatsApp/SMS
- ✅ FREE (100/month)
- ✅ Then $0.006 per message
- Your 70/month = $0!

---

## Total Cost

| Service | Cost | Why Free |
|---------|------|----------|
| Netlify | $0 | Free static hosting |
| Render | $0 | Free tier has 450 hrs/mo |
| MongoDB | $0 | Free M0 tier |
| AWS SNS | $0 | Free 100 msgs/month |
| **Total** | **$0/month** | All free! |

---

## Troubleshooting

### Problem: "API_URL is localhost"

**Solution:**
1. Edit `frontend/app.js`
2. Change `http://localhost:5000/api` to your Render URL
3. Re-deploy to Netlify

### Problem: "Server not running on Render"

**Solution:**
1. Check Render logs for errors
2. Verify environment variables are set
3. Check MongoDB connection string
4. Verify AWS credentials

### Problem: "Messages not sending"

**Solution:**
1. Check AWS account SMS approval (should be approved)
2. Verify phone number format (with country code)
3. Check Render logs for errors
4. Test locally first

### Problem: "Netlify still showing old API URL"

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Or use incognito mode
3. Re-deploy Netlify (don't need to change code)

---

## Files to Keep Updated

When you make changes:

1. **Backend changes** → Push to GitHub → Auto-deploys to Render
2. **Frontend changes** → Push to GitHub → Auto-deploys to Netlify
3. **Environment variables** → Update on Render dashboard (not in code!)

---

## Security Checklist

✅ `.env` NOT committed to git  
✅ AWS credentials in Render dashboard (not in code)  
✅ MongoDB password in Render dashboard (not in code)  
✅ `.gitignore` includes `.env`  
✅ Repository is public (OK for this project)  

---

## Summary of Steps

1. ✅ Prepare code locally (test it works)
2. ✅ Push to GitHub
3. ✅ Deploy backend to Render (FREE!)
4. ✅ Update frontend API URL
5. ✅ Deploy frontend to Netlify (FREE!)
6. ✅ Set environment variables on Render
7. ✅ Test everything

**Total setup time: 30 minutes**

---

## Final Architecture

```
User → Netlify frontend
        ↓
      API calls
        ↓
      Render backend (24/7)
        ↓
      MongoDB (stores messages)
        ↓
      Scheduler (every minute)
        ↓
      AWS SNS (sends messages)
        ↓
      User's phone (receives WhatsApp/SMS)
```

All FREE! 🎉

---

## Next Steps

1. Test locally (schedule a message, see it work)
2. Create GitHub account
3. Push code to GitHub
4. Deploy backend to Render
5. Update frontend API URL
6. Deploy frontend to Netlify
7. Test on live URLs
8. Done!

**Questions?** Check logs on Render and Netlify dashboards!
