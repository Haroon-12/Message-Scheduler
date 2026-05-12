# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)
Open PowerShell in the `backend` folder and run:
```powershell
npm install
```

### Step 2: Start Backend Server (30 seconds)
```powershell
npm start
```
You should see: `Server is running on http://localhost:5000`

### Step 3: Open Frontend (30 seconds)
Open this file in your browser:
```
frontend/index.html
```

### Step 4: Schedule Your First Message (2 minutes)
1. Enter a phone number (e.g., `+12345678900`)
2. Write a test message
3. Pick a date/time in the future
4. Click "Schedule Message"

**That's it!** Your message is now scheduled.

---

## Optional: Enable WhatsApp Sending

To actually send messages via WhatsApp:

1. Create a free [Twilio account](https://www.twilio.com/)
2. Get a WhatsApp-enabled phone number
3. In the `backend` folder, copy `.env.example` to `.env`
4. Add your Twilio credentials to `.env`
5. Restart the backend server

---

## Keyboard Shortcuts

- `Enter` on phone number field: Focus message
- `Tab`: Navigate through form fields
- `Ctrl+Enter` (Windows): Submit form

---

## File Locations

| What | Where |
|------|-------|
| Website | `frontend/index.html` |
| Backend Server | `backend/server.js` |
| Database | `backend/messages.db` (auto-created) |
| Settings | `backend/.env` |

---

## Need Help?

1. **Messages not appearing?** - Reload the website (F5)
2. **Backend won't start?** - Run `npm install` again
3. **Phone number error?** - Make sure to include the country code (e.g., +1)
4. **Can't reach localhost:5000?** - Check if backend server is running

Enjoy! 🎉
