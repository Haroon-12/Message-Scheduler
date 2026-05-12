# WhatsApp Message Scheduler

A full-stack web application that allows you to schedule WhatsApp messages to be sent automatically at a specified date and time. Perfect for sending birthday wishes, reminders, or any other messages while you sleep!

## ✨ Features

✨ **Schedule Messages** - Set a date, time, phone number, and message content  
🤖 **Automatic Sending** - Messages are sent automatically at the scheduled time  
📊 **Message Dashboard** - View all scheduled, sent, and failed messages  
🔔 **Real-time Updates** - See message status updates in real-time  
📱 **Responsive Design** - Works on desktop, tablet, and mobile devices  
☁️ **Cloud Ready** - Deploy to production with MongoDB cloud database  
🔐 **Secure** - Credentials protected with environment variables  

## 🏗️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- No frameworks - lightweight & fast

**Backend:**
- Node.js & Express.js
- MongoDB (cloud-based)
- Mongoose ODM
- AWS SNS (for WhatsApp/SMS sending)

**Database:**
- MongoDB Atlas (free cloud tier)
- Auto-scaling, unlimited storage

**Deployment:**
- Render, Heroku, Railway, or any Node.js hosting

## 📂 Project Structure

```
MessageScheduler/
├── backend/
│   ├── server.js           ← Express server
│   ├── config/
│   │   └── database.js     ← MongoDB connection
│   ├── models/
│   │   └── Message.js      ← Mongoose schema
│   ├── routes/
│   │   └── messages.js     ← API endpoints
│   ├── scheduler.js        ← Auto-sending job
│   ├── aws-sns.js          ← AWS SNS integration
│   ├── package.json        ← Dependencies
│   └── .env.example        ← Config template
│
├── frontend/
│   ├── index.html          ← Main webpage
│   ├── app.js              ← App logic
│   └── styles.css          ← Styling
│
└── Documentation/
    ├── README.md           ← This file
    ├── AWS_SNS_SETUP_GUIDE.md
    ├── DEPLOYMENT_GUIDE.md
    └── ... (more guides)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB Atlas account (free)

### Installation

**1. Install dependencies**
```bash
cd backend
npm install
```

**2. Create .env file**
```bash
# In backend/ folder, create .env with:
MONGODB_URI=
PORT=5000
NODE_ENV=development
```

**3. Start backend**
```bash
npm start
```

**4. Open frontend**
Open `frontend/index.html` in your browser

## 📋 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/messages` | Get all messages |
| POST | `/api/messages` | Create new message |
| GET | `/api/messages/:id` | Get specific message |
| DELETE | `/api/messages/:id` | Delete pending message |
| GET | `/api/health` | Check server status |

### Example Request
```javascript
POST /api/messages
{
  "phoneNumber": "+12125551234",
  "message": "Happy Birthday!",
  "scheduledTime": "2026-01-15T10:30:00Z"
}

Response:
{
  "_id": "507f1f77bcf86cd799439011",
  "phoneNumber": "+12125551234",
  "message": "Happy Birthday!",
  "scheduledTime": "2026-01-15T10:30:00Z",
  "status": "pending",
  "createdAt": "2026-01-14T12:00:00Z"
}
```

## 🔄 How It Works

```
1. User schedules message
   ↓
2. Frontend sends to backend API
   ↓
3. Backend saves to MongoDB
   ↓
4. Message status: "pending"
   ↓
5. Every minute: Scheduler checks MongoDB
   ↓
6. Time arrives: Message sent via AWS SNS
   ↓
7. Status updates: "sent"
   ↓
8. Frontend polls and shows update
```

## 📱 Features Breakdown

### Schedule Messages
- Date and time picker
- Phone number with country code validation
- Message content (up to 1000 characters)
- Automatic validation

### Dashboard
- View all scheduled messages
- Real-time status (Pending/Sent/Failed)
- Filter by status
- Delete pending messages
- Search and sort

### Auto-Sending
- Background job checks every minute
- Sends via AWS SNS (100 free/month)
- Updates status in real-time
- Error handling and logging

## 🌐 Deployment Guide

See **DEPLOYMENT_GUIDE.md** for:
- MongoDB Atlas setup (free)
- AWS SNS setup (100 free messages/month)
- Environment variable configuration
- Deploying to Render/Heroku/Railway
- Production best practices

Quick summary:
```
1. Create MongoDB Atlas account (free)
2. Get connection string
3. Create AWS SNS account (optional, for real messages)
4. Add credentials to .env
5. Push to GitHub
6. Deploy to Render/Heroku/Railway
7. Set environment variables on platform
8. Done!
```

## 📱 WhatsApp/SMS Integration (Optional)

AWS SNS enables real WhatsApp/SMS sending. See **AWS_SNS_SETUP_GUIDE.md** for:
- What is AWS SNS?
- Setup steps
- Pricing (100 free/month, then $0.00645/message)
- Testing

Quick setup:
```
1. Create AWS account (free)
2. Request SMS access in SNS console
3. Create IAM user with SNS permissions
4. Get credentials (Access Key ID & Secret)
5. Add to .env
6. Messages send automatically!
```

## 🔧 Troubleshooting

### MongoDB Connection Error
```
Error: MONGODB_URI environment variable is not set
```
**Solution:** Add `MONGODB_URI` to `.env` file

### Messages Not Sending
- Check if AWS SNS credentials are in `.env`
- Verify phone number format (+country code)
- Check backend logs for errors

### API Connection Failed
- Make sure backend is running (`npm start`)
- Check port 5000 is available
- Verify CORS is enabled (default)

### Database Issues
- Check MongoDB Atlas cluster is running
- Verify connection string is correct
- Check firewall allows connection

## 🔒 Security

✅ **Best Practices:**
- Store credentials in `.env` (not in code)
- Add `.env` to `.gitignore`
- Use strong MongoDB passwords
- Keep AWS access keys secret
- Validate all inputs

❌ **Never:**
- Commit `.env` to git
- Share credentials in code
- Use same password for everything
- Leave credentials in public repos

## 📊 Database Schema

MongoDB document example:
```javascript
{
  _id: ObjectId,
  phoneNumber: "+12125551234",
  message: "Happy Birthday!",
  scheduledTime: ISODate("2026-01-15T10:30:00Z"),
  status: "pending",  // or "sent" or "failed"
  sentAt: null,
  errorMessage: null,
  createdAt: ISODate("2026-01-14T12:00:00Z"),
  updatedAt: ISODate("2026-01-14T12:00:00Z")
}
```

## 💰 Cost Breakdown

| Service | Cost | Notes |
|---------|------|-------|
| MongoDB Atlas | Free | M0 tier, unlimited |
| Render/Heroku | Free | 750 hrs/month free tier |
| AWS SNS | Free | 100 messages/month free |
| **Total** | **Free!** | No monthly charges |

## 🎓 Learning Resources

This project teaches:
- ✅ Full-stack web development
- ✅ REST APIs with Express.js
- ✅ MongoDB & Mongoose ODM
- ✅ Cloud database setup
- ✅ Job scheduling with node-schedule
- ✅ AWS SNS integration
- ✅ Cloud deployment

## 📚 Documentation

Read in this order:
1. **00_START_HERE.md** - Overview
2. **QUICKSTART.md** - 5-minute setup
3. **USER_GUIDE.md** - How to use
4. **DEPLOYMENT_GUIDE.md** - Deploy to cloud
5. **AWS_SNS_SETUP_GUIDE.md** - WhatsApp/SMS setup
6. **ARCHITECTURE.md** - System design

## 🚀 Deployment Platforms

Ready to deploy? Choose one:

### Render (Easiest)
- Free tier included
- Easy environment setup
- Best for beginners

### Heroku
- Well-documented
- 1-click deployment
- Free tier available

### Railway.app
- Modern platform
- GitHub integration
- Great UX

### Vercel (Frontend)
- Free static hosting
- Perfect for React/Next
- Fast CDN

## 🎯 Future Enhancements

- 📧 Email scheduling
- 👥 User authentication
- 📱 SMS support
- 🔄 Recurring messages
- 📊 Analytics dashboard
- 🔔 Desktop notifications
- 📝 Message templates
- 🌍 Multi-language support

## 📞 Support

**Having issues?**

1. Check the **DEPLOYMENT_GUIDE.md** for cloud setup
2. See **TWILIO_COMPLETE_GUIDE.md** for message sending
3. Read **USER_GUIDE.md** for app usage
4. Check backend logs for errors
5. Check browser console (F12) for frontend errors

## 📄 License

Open source - use freely for personal or commercial projects

## 🙏 Credits

Built with Node.js, Express, MongoDB, and Twilio

---

**Ready to get started?** 👇

1. **Local Development:** Follow QUICKSTART.md
2. **Deploy to Cloud:** Follow DEPLOYMENT_GUIDE.md
3. **Enable WhatsApp:** Follow TWILIO_COMPLETE_GUIDE.md

**Questions?** Check the troubleshooting section above!

