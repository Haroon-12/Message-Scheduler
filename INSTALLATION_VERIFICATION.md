# Installation Verification Checklist

Use this checklist to verify your Message Scheduler is properly installed and ready to use.

## Pre-Installation ✓

- [ ] Node.js installed (v14+)
  ```powershell
  node --version  # Should show v14.0.0 or higher
  ```

- [ ] npm installed
  ```powershell
  npm --version   # Should show version number
  ```

---

## Installation Steps

### ✓ Step 1: Install Backend Dependencies

```powershell
cd backend
npm install
```

**Verify:**
- [ ] Command completes without errors
- [ ] A `node_modules` folder is created
- [ ] A `package-lock.json` file is created

**Check:**
```powershell
# Should show list of installed packages
npm list --depth=0
```

Expected output includes:
- `express`
- `sqlite3`
- `cors`
- `dotenv`
- `node-schedule`
- `twilio`

---

### ✓ Step 2: Start Backend Server

From the `backend` folder:

```powershell
npm start
```

**Verify:**
- [ ] No error messages appear
- [ ] You see: `Connected to SQLite database`
- [ ] You see: `Scheduler initialized`
- [ ] You see: `Server is running on http://localhost:5000`

**⚠️ Keep this terminal open!**

---

### ✓ Step 3: Test Backend in New Terminal

Open a NEW terminal window and run:

```powershell
node test.js
```

**Verify:**
- [ ] Test outputs: ✅ Server is running
- [ ] Test outputs: ✅ Got X messages
- [ ] Test outputs: ✅ Message created successfully
- [ ] Test outputs: ✅ All tests passed!

If tests fail, see "Troubleshooting" section below.

---

### ✓ Step 4: Open Frontend

#### Option A: Direct File (Easiest)
- [ ] Navigate to `frontend` folder
- [ ] Right-click `index.html`
- [ ] Choose "Open with" → Your browser
- [ ] Website loads successfully

#### Option B: Using Python Server
```powershell
cd frontend
python -m http.server 8000
```
Then visit: `http://localhost:8000`

#### Option C: Using Node Server
```powershell
npm install -g http-server
cd frontend
http-server
```

**Verify:**
- [ ] Website loads in browser
- [ ] You see the purple WhatsApp header
- [ ] Form fields are visible
- [ ] Message dashboard is visible
- [ ] No error in browser console (F12)

---

### ✓ Step 5: Test Full Workflow

1. **Fill form:**
   - [ ] Phone: `+12125551234` (any valid format with country code)
   - [ ] Message: `Test message`
   - [ ] Date: Tomorrow
   - [ ] Time: 1 minute from now

2. **Submit:**
   - [ ] Click "Schedule Message"
   - [ ] ✅ See success notification at bottom right

3. **Check Dashboard:**
   - [ ] Message appears with PENDING status
   - [ ] Phone number is correct
   - [ ] Message text is correct

4. **Wait 1 minute:**
   - [ ] Refresh page (F5)
   - [ ] Message status changes to SENT (if Twilio configured)
   - [ ] Or stays PENDING (if Twilio not configured)

5. **Delete Message:**
   - [ ] Click "Delete" on a PENDING message
   - [ ] See confirmation dialog
   - [ ] Click OK
   - [ ] ✅ Message removed from dashboard

---

## Final Verification

### Backend Check

```powershell
# In backend terminal, you should see no errors
# Check for these messages:
# ✅ "Connected to SQLite database"
# ✅ "Scheduler initialized"  
# ✅ "Server is running on http://localhost:5000"
```

### Frontend Check

Open browser console: **F12** → **Console** tab

- [ ] No red error messages
- [ ] No warnings about CORS
- [ ] No network errors

### Database Check

Verify database file exists:
```powershell
# In backend folder
Test-Path messages.db  # Should show True
```

---

## Troubleshooting

### Problem: "npm install" fails

**Solution:**
```powershell
# Delete and reinstall
Remove-Item node_modules -Recurse
Remove-Item package-lock.json
npm install
```

### Problem: "Server is already in use"

**Solution 1:** Kill existing process
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill it (replace PID with actual number)
taskkill /PID 1234 /F
```

**Solution 2:** Use different port
```powershell
# Edit backend/server.js line with PORT
# Change: const PORT = process.env.PORT || 5000;
# To: const PORT = process.env.PORT || 5001;
```

### Problem: "Cannot GET /index.html"

**Solution:**
- Make sure you're opening `frontend/index.html` (not backend)
- Try using a local server instead of direct file

### Problem: Website won't connect to backend

**Check:**
1. Is backend server running? (Should see "Server is running...")
2. Is it on port 5000? (Check terminal)
3. Is API_URL correct? (Check `frontend/app.js` line 1)

### Problem: Messages not appearing

**Solution:**
1. Refresh page: **F5**
2. Check backend terminal for errors
3. Check browser console: **F12** → **Network** tab
   - Should see `/api/messages` requests

### Problem: "Twilio credentials not configured"

**Solution:**
This is OK for testing! The app will log messages instead of sending them.

To enable actual sending:
1. Set up Twilio account (free trial)
2. Create `backend/.env` file
3. Add credentials from TWILIO_SETUP.md
4. Restart backend server

---

## Success Indicators

✅ You're ready if:
- [ ] Backend starts without errors
- [ ] Frontend loads with pretty design
- [ ] Can schedule a message
- [ ] Message appears in dashboard
- [ ] Can delete pending messages
- [ ] Can refresh and messages persist
- [ ] Browser console has no errors
- [ ] Backend terminal shows no errors

---

## Quick Verification Command

Run this to test everything at once:

```powershell
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Run tests
cd backend
node test.js

# Terminal 3: Open frontend
cd frontend
python -m http.server 8000
# Then visit http://localhost:8000
```

All three should work with no errors.

---

## Files Checklist

### Backend Files
- [ ] `backend/server.js`
- [ ] `backend/database.js`
- [ ] `backend/scheduler.js`
- [ ] `backend/whatsapp.js`
- [ ] `backend/routes/messages.js`
- [ ] `backend/package.json`
- [ ] `backend/.env.example`
- [ ] `backend/test.js`
- [ ] `backend/node_modules/` (created by npm install)
- [ ] `backend/messages.db` (created when server starts)

### Frontend Files
- [ ] `frontend/index.html`
- [ ] `frontend/app.js`
- [ ] `frontend/styles.css`

### Documentation Files
- [ ] `README.md`
- [ ] `QUICKSTART.md`
- [ ] `TWILIO_SETUP.md`
- [ ] `USER_GUIDE.md`
- [ ] `PROJECT_SUMMARY.md`
- [ ] `INSTALLATION_VERIFICATION.md` (this file)

---

## Help & Support

If verification fails:

1. **Check QUICKSTART.md** - Most common issues
2. **Check README.md** - Detailed troubleshooting
3. **Check browser console** - F12 key
4. **Check backend terminal** - Error messages
5. **Run test.js** - Verify API endpoints
6. **Check file exists** - Messages.db should appear after first send

---

## Next Steps After Verification ✅

Once everything passes:

1. **Try real messages:**
   - Open TWILIO_SETUP.md
   - Set up free Twilio account
   - Add credentials to `backend/.env`
   - Restart server and try sending

2. **Customize:**
   - Edit `frontend/styles.css` for colors
   - Edit `frontend/index.html` for text
   - Modify `backend/server.js` for features

3. **Deploy (Optional):**
   - See README.md section "Deployment"
   - Use PM2 or similar for 24/7 running

---

**Verification Complete! Happy Scheduling! 🎉**
