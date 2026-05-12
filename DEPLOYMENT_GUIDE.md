# 🚀 Cloud Deployment Guide - Message Scheduler with MongoDB

## What Changed From SQLite to MongoDB

| Feature | SQLite | MongoDB |
|---------|--------|---------|
| **Storage** | Local file (messages.db) | Cloud database (MongoDB Atlas) |
| **Scaling** | Limited | Unlimited cloud storage |
| **Deployment** | Single server | Distributed cloud clusters |
| **Cost** | Free | Free tier available |
| **Real-time** | Polling only | Can use change streams |

---

## ✅ Prerequisites

Before deploying, you need:

1. **Node.js** (v14+) - Already on your computer
2. **MongoDB Atlas Account** (Free) - Cloud database
3. **AWS Account** (Optional) - For WhatsApp/SMS sending (100 free/month)
4. **Deployment Platform** - Heroku, Vercel, Render, or Railway
5. **Git** (for version control) - Optional but recommended

---

## 📋 Step 1: Create MongoDB Atlas Account (Free)

### 1.1 Sign Up
- Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Click "Try Free"
- Sign up with email or Google

### 1.2 Create Organization
- Choose organization name (e.g., "Message Scheduler")
- Click "Create Organization"

### 1.3 Create Cluster
- Click "Create a Cluster"
- Choose **M0 (Free)** tier - unlimited for free
- Select your nearest region
- Click "Create Cluster"
- Wait 2-3 minutes for cluster to be created

### 1.4 Create Database User
1. Go to **Security** → **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `mongouser` (any name)
5. Password: `Create a strong password!` (save this!)
6. Click **Add User**

### 1.5 Get Connection String
1. Go to **Deployment** → **Clusters**
2. Click **Connect** on your cluster
3. Choose "Drivers" → "Node.js"
4. Copy the connection string
5. It looks like: `mongodb+srv://mongouser:PASSWORD@cluster0.mongodb.net/messagescheduler?retryWrites=true&w=majority`

### 1.6 Setup .env File
Replace in `backend/.env`:
```
MONGODB_URI=mongodb+srv://mongouser:YOUR_PASSWORD@cluster0.mongodb.net/messagescheduler?retryWrites=true&w=majority
```

⚠️ **Important:** Replace `YOUR_PASSWORD` with your actual password!

---

## 📝 Step 2: Setup AWS SNS for WhatsApp/SMS (Free - 100 messages/month)

### What is AWS SNS?

AWS SNS (Simple Notification Service) sends WhatsApp & SMS messages for FREE!

**Without AWS SNS:**
- Messages are stored in database
- You can see them scheduled
- They DON'T actually send to anyone
- Good for testing

**With AWS SNS:**
- Messages store in database
- They automatically send via SMS/WhatsApp at scheduled time
- Recipients get real messages
- FREE for first 100 messages/month!

### Do You Need AWS SNS?

✅ **Yes if:** You want people to actually receive messages  
❌ **No if:** You just want to test the scheduling system

### AWS SNS Cost

- **First 100 messages/month:** FREE 🎉
- **After 100:** $0.00645 per message (very cheap!)
- Your 70 messages/month: **$0 forever**

### AWS SNS Setup

**See `AWS_SNS_SETUP_GUIDE.md` for complete step-by-step instructions (20 minutes total)**

Quick summary:
1. Create AWS account (free)
2. Request SMS access in SNS console
3. Create IAM user with SNS permissions
4. Get Access Key ID & Secret
5. Add to `.env` file:
   ```
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   AWS_REGION=us-east-1
   ```

---

## 🚀 Step 3: Local Testing Before Deployment

### 3.1 Install Dependencies
```powershell
cd backend
npm install
```

### 3.2 Test MongoDB Connection
```powershell
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
⏰ Scheduler initialized - checking every minute
🚀 Server is running on http://localhost:5000
```

### 3.3 Test the API
1. Open `frontend/index.html` in browser
2. Schedule a test message
3. Check if it appears in dashboard
4. Check backend terminal for logs

---

## 🌐 Step 4: Deploy to Cloud (Choose One)

### Option A: Deploy to Render (Easiest)

1. **Prepare your project**
   - Push to GitHub (create GitHub account if needed)
   - Make sure `.env` file is in `.gitignore`

2. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

3. **Deploy Backend**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Build command: `npm install`
   - Start command: `node server.js`
   - Add environment variables:
     - `MONGODB_URI` = your MongoDB connection string
     - `AWS_ACCESS_KEY_ID` = (if using AWS SNS)
     - `AWS_SECRET_ACCESS_KEY` = (if using AWS SNS)
     - `AWS_REGION` = us-east-1 (or your region)
   - Click "Create Web Service"

4. **Deploy Frontend**
   - Option A: Deploy to Vercel (free hosting for static sites)
   - Option B: Serve from same Render backend

5. **Update API URL**
   - In `frontend/app.js`, change:
     ```javascript
     const API_URL = 'https://your-render-app.onrender.com/api';
     ```

### Option B: Deploy to Heroku

1. **Install Heroku CLI**
   ```powershell
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```powershell
   heroku login
   ```

3. **Create App**
   ```powershell
   heroku create your-app-name
   ```

4. **Add MongoDB URI**
   ```powershell
   heroku config:set MONGODB_URI=your_connection_string
   ```

5. **Deploy**
   ```powershell
   git push heroku main
   ```

### Option C: Deploy to Railway.app (Easiest)

1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add variables:
   - `MONGODB_URI`
   - `TWILIO_ACCOUNT_SID` (optional)
   - etc.
6. Deploy automatically

---

## 🔐 Environment Variables Checklist

Before deploying, make sure you have:

```
✅ MONGODB_URI=mongodb+srv://...
✅ PORT=5000
✅ NODE_ENV=production
✅ TWILIO_ACCOUNT_SID=... (optional)
✅ TWILIO_AUTH_TOKEN=... (optional)
✅ TWILIO_WHATSAPP_NUMBER=... (optional)
```

**Never** commit these to GitHub!

---

## 🧪 Deployment Checklist

- [ ] MongoDB Atlas account created
- [ ] Database user created
- [ ] Connection string copied
- [ ] `.env` file created locally
- [ ] `npm install` runs without errors
- [ ] `npm start` shows "MongoDB Connected"
- [ ] Frontend can schedule messages
- [ ] Backend logs show no errors
- [ ] `.gitignore` includes `.env`
- [ ] Code pushed to GitHub
- [ ] Deployment platform selected (Render/Heroku/Railway)
- [ ] Environment variables set on platform
- [ ] Deployment successful
- [ ] API URL updated in frontend
- [ ] Test scheduling on live app

---

## 📊 What Happens After Deployment

1. **User visits your website**
   - Frontend is hosted on Render/Vercel/Railway
   - Backend is running on same platform

2. **User schedules message**
   - Data sent to backend API
   - Stored in MongoDB (cloud database)

3. **Every minute:**
   - Scheduler checks MongoDB
   - Finds due messages
   - Sends via Twilio (if credentials set)

4. **Frontend updates:**
   - Polls backend every 30 seconds
   - Shows message status

5. **Result:**
   - Messages automatically send at scheduled time
   - Works 24/7 (platform keeps it running)

---

## 🔧 Troubleshooting Deployment

### MongoDB Connection Error
```
Error: MONGODB_URI environment variable is not set
```
**Solution:** Set `MONGODB_URI` in platform's environment variables

### Message Not Sending
- Check if Twilio credentials are correct
- Check if TWILIO_ACCOUNT_SID is set
- Check backend logs for errors

### Website Loads but API Fails
- Update `API_URL` in `frontend/app.js` to your deployed backend URL
- Make sure CORS is enabled (it is by default)

### Scheduler Not Running
- Check if backend is still running
- Some free platforms sleep after 30 minutes (upgrade to paid if needed)

---

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | Free | M0 tier, unlimited messages |
| Render | Free | 750 hours/month free tier |
| Twilio | Pay-as-you-go | $0.005-0.01 per message |
| **Total** | Free! | Unless you use Twilio |

---

## 🎯 Summary

### What You Need:
1. ✅ MongoDB Atlas (free cloud database)
2. ✅ Deployment platform (Render, Heroku, or Railway)
3. ✅ Twilio (optional, for real WhatsApp)
4. ✅ GitHub (optional, for easier deployment)

### Steps:
1. Create MongoDB Atlas account → Get connection string
2. Update `.env` with `MONGODB_URI`
3. Test locally with `npm start`
4. Push to GitHub
5. Deploy to Render/Heroku/Railway
6. Set environment variables on platform
7. Done! Your app is live 🎉

### Result:
- Backend runs 24/7 in the cloud
- Database stores messages in cloud
- Messages send automatically every minute
- You can access from anywhere

---

## 📚 Next Steps

1. **Create MongoDB Atlas account** (5 minutes)
2. **Update `.env` with MongoDB URI** (2 minutes)
3. **Test locally** (5 minutes)
4. **Create GitHub account and push code** (10 minutes)
5. **Deploy to Render/Railway** (10 minutes)
6. **Test live app** (5 minutes)

**Total time: ~40 minutes to go live!** 🚀

---

**Still stuck? Check the README.md Troubleshooting section!**
