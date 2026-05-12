# 📱 AWS SNS Setup - Complete Step-by-Step Guide with Screenshots

## What You'll Get
- **Access Key ID** - Like your username
- **Secret Access Key** - Like your password
- **AWS Region** - us-east-1 (free tier location)

These 3 things go in your `.env` file!

---

## ⏱️ Total Time: 20-30 minutes

---

# PART 1: Create AWS Account (5 minutes)

## Step 1.1: Go to AWS Website

**What to do:**
1. Open your browser
2. Go to: https://aws.amazon.com/
3. Click the **"Create an AWS Account"** button (top right)

**What you'll see:**
- Orange button at top right
- Or orange banner with "Sign up" option

---

## Step 1.2: Fill Sign Up Form

**What to do:**
1. Click **"Create an AWS Account"** button
2. Fill in:
   - **Email address** - Your real email
   - **Password** - Make it strong!
   - **AWS account name** - Example: "messagescheduler" or your name
   - **Company name** (optional) - Can be your name

3. Check the box: "I agree to AWS terms"
4. Click **"Continue"**

**What you'll see:**
- Form fields for email, password
- Checkboxes for terms
- "Continue" button

---

## Step 1.3: Verify Email Address

**What to do:**
1. AWS sends verification code to your email
2. Check your email inbox
3. Look for email from "Amazon Web Services"
4. Copy the 6-digit code
5. Paste it in the verification box on AWS website
6. Click **"Verify"**

**What you'll see:**
- Email verification code in your inbox
- Box on AWS website to enter code
- "Verify" button

---

## Step 1.4: Add Contact Information

**What to do:**
1. Select **"Personal"** as account type
2. Fill in:
   - **Full name** - Your real name
   - **Phone number** - Your real phone
   - **Country** - Select your country
   - **Address** - Your real address
   - **City, State, Postal Code** - Your location

3. Check "I have read and agree..."
4. Click **"Continue"**

**What you'll see:**
- Form with personal information fields
- Dropdown for country
- "Continue" button

---

## Step 1.5: Add Payment Method

**What to do:**
1. Even though it's free, AWS requires payment method
2. Fill in:
   - **Card number** - Your credit/debit card
   - **Expiration date** - MM/YY format
   - **CVV** - 3-digit code on back
   - **Name on card** - Your name

3. Fill in billing address (usually same as above)
4. Click **"Continue"**

**⚠️ IMPORTANT:** 
- AWS will NOT charge you for free tier usage
- Your card is just for verification
- You can set spending alerts later

**What you'll see:**
- Card information form
- Address fields
- "Continue" button

---

## Step 1.6: Verify Phone Number

**What to do:**
1. AWS calls/texts you to verify phone
2. Select **"Text message (SMS)"** or **"Call"**
3. You get a 4-digit PIN
4. Enter PIN in the box
5. Click **"Verify"**

**What you'll see:**
- Option to receive call or SMS
- Phone number pre-filled
- Box to enter PIN
- "Verify" button

---

## Step 1.7: Choose Support Plan

**What to do:**
1. Select **"Basic Plan"** (free)
2. Click **"Complete sign up"**
3. Wait 1-2 minutes for AWS to complete setup
4. You'll see "Congratulations" message

**What you'll see:**
- Support plan options (choose "Basic")
- "Complete sign up" button
- Congratulations message

---

## Step 1.8: Login to AWS Console

**What to do:**
1. Click **"Go to the AWS Management Console"** button
2. Or go to: https://console.aws.amazon.com/
3. Sign in with your email and password
4. You're in! 🎉

**What you'll see:**
- AWS Management Console dashboard
- Search bar at top
- "Services" menu on left

---

---

# PART 2: Enable SMS in SNS (10 minutes)

## Step 2.1: Go to SNS Service

**What to do:**
1. In AWS console, look at **top left**
2. See search bar that says **"Services"**
3. Click the search bar
4. Type: **"SNS"**
5. Click **"Simple Notification Service"** in results

**What you'll see:**
- Search bar appearing
- SNS in dropdown results
- SNS dashboard opens

---

## Step 2.2: Check Your Region

⚠️ **VERY IMPORTANT!**

**What to do:**
1. Look at **top right corner** of AWS console
2. See dropdown that says a region (like "N. Virginia" or "us-east-1")
3. Click it
4. **MUST select: "N. Virginia (us-east-1)"**
5. This is the ONLY region with free SMS pricing

**Why?** Other regions charge more for SMS

**What you'll see:**
- Region dropdown in top right
- List of regions
- "N. Virginia" option

---

## Step 2.3: Request SMS Access

**What to do:**
1. In SNS console, look at left sidebar
2. Click **"Text Messaging (SMS)"**
3. You'll see orange banner or button saying "Get started with text messaging"
4. Click it
5. Click **"Request quota increase"** or **"Get started"**

**What you'll see:**
- SMS section of SNS
- Orange button/banner
- Form to request access

---

## Step 2.4: Fill SMS Request Form

**What to do:**
1. Form opens with questions
2. Fill in:
   - **SMS Messaging Use Case**: Choose **"Transactional"** (for scheduled messages)
   - **Use case description**: Type "Message scheduler application"
   - **Message type**: Choose **"Transactional"** (important!)
   - **Expected monthly volume**: Type "100" messages
   - **Account usage**: "I will send scheduled WhatsApp/SMS messages"

3. Agree to AWS terms
4. Click **"Submit"** button

**What you'll see:**
- Form fields for use case
- Dropdown selections
- "Submit" button
- Success message "Your quota increase request has been submitted"

---

## Step 2.5: Wait for Approval ⏳

**What to do:**
1. AWS usually approves within **1 hour**
2. Check your email for approval notification
3. May say "Your AWS Support ticket has been resolved"
4. **Check spam folder** if you don't see it in inbox

**What you'll see in email:**
- "Your quota increase request has been approved"
- OR "Your SMS quota has been increased"
- Email from AWS Support

---

---

# PART 3: Create IAM User & Get Credentials (10 minutes)

## Step 3.1: Go to IAM Service

**What to do:**
1. Click search bar in AWS console
2. Type: **"IAM"**
3. Click **"Identity and Access Management"** in results
4. IAM dashboard opens

**What you'll see:**
- IAM console
- Dashboard with options
- Left sidebar with "Users" option

---

## Step 3.2: Create New User

**What to do:**
1. On left sidebar, click **"Users"**
2. Click **"Create user"** button (blue button)
3. Fill in:
   - **User name**: `messagescheduler-sns` (copy exactly!)
4. Leave all other options as default
5. Click **"Next"** button

**What you'll see:**
- Users list page
- "Create user" button
- Form for username
- "Next" button

---

## Step 3.3: Add Permissions

**What to do:**
1. On "Set permissions" screen, choose **"Attach policies directly"**
2. In the search box that appears, type: **"AmazonSNSFullAccess"**
3. In results, find and **CHECK the box** next to "AmazonSNSFullAccess"
4. Click **"Next"** button

**What you'll see:**
- Permission setup options
- Search box for policies
- Checkbox for "AmazonSNSFullAccess"
- "Next" button

**Check this permission:**
- ✅ AmazonSNSFullAccess

---

## Step 3.4: Review and Create

**What to do:**
1. Review the information (should show username and SNS permission)
2. Click **"Create user"** button
3. Wait for confirmation
4. You'll see "Success" message

**What you'll see:**
- Review page
- User name displayed
- Policy shown
- "Create user" button
- Success confirmation

---

## Step 3.5: Generate Access Key

**What to do:**
1. You'll see the new user page
2. Click **"Security credentials"** tab
3. Scroll down to **"Access keys"** section
4. Click **"Create access key"** button

**What you'll see:**
- User details page
- Tabs including "Security credentials"
- "Access keys" section
- "Create access key" button

---

## Step 3.6: Choose Access Key Type

**What to do:**
1. A popup appears asking what you'll use this for
2. Select: **"Application running outside AWS"**
3. Click **"Next"** button

**What you'll see:**
- Popup with options
- Radio buttons for different use cases
- "Next" button

---

## Step 3.7: Set Description (Optional)

**What to do:**
1. Optional: Type description "Message Scheduler SNS"
2. Click **"Create access key"** button

**What you'll see:**
- Description field (optional)
- "Create access key" button

---

## Step 3.8: **⚠️ COPY YOUR CREDENTIALS NOW!**

**CRITICAL! Do this immediately!**

**What you'll see:**
- Access Key ID (starts with "AKIA")
- Secret Access Key (long string)
- Option to download CSV or copy

**What to do:**
1. **Copy Access Key ID** - Click copy button, paste in notepad
2. **Copy Secret Access Key** - Click copy button, paste in notepad
3. **Save notepad file** on your computer
4. Keep this file safe!

**Example format:**
```
Access Key ID: AKIAIOSFODNN7EXAMPLE
Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Region: us-east-1
```

⚠️ **IMPORTANT:** After you click "Done", you can NEVER see the Secret Access Key again! So copy it NOW!

---

---

# PART 4: Put Credentials in Your Project (5 minutes)

## Step 4.1: Create .env File

**What to do:**
1. Open file explorer
2. Navigate to: `f:\Side Projects\MessageScheduler\backend\`
3. Right-click in empty space
4. Choose **"New"** → **"Text Document"**
5. Name it: `.env` (with the dot!)

**File location should be:**
```
f:\Side Projects\MessageScheduler\backend\.env
```

**What you'll see:**
- New file created
- Name it ".env"

---

## Step 4.2: Fill in Credentials

**What to do:**
1. Open the `.env` file in notepad (right-click → Open with → Notepad)
2. Copy and paste this:

```env
# MongoDB
MONGODB_URI=

# AWS SNS (WhatsApp/SMS)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=wJalr...
AWS_REGION=us-east-1

# Server
PORT=5000
NODE_ENV=development
```

3. Replace:
   - `AKIA...` → Your Access Key ID from Step 3.8
   - `wJalr...` → Your Secret Access Key from Step 3.8
4. Leave everything else the same
5. **Save the file** (Ctrl+S)

**Example (with fake data):**
```env
MONGODB_URI=mongodb+srv://HaroonWaheed:Haroon123456@cluster.mongodb.net/messagescheduler?retryWrites=true&w=majority

AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1

PORT=5000
NODE_ENV=development
```

---

## Step 4.3: Verify File is in Right Place

**What to do:**
1. Open PowerShell
2. Navigate to project: `cd "f:\Side Projects\MessageScheduler\backend"`
3. List files: `dir` or `ls`
4. You should see `.env` file in the list

**If you don't see it:**
- Check if you're in correct folder
- Make sure file is named `.env` (with dot at start)
- Not `.env.txt` or `.env.example`

---

---

# PART 5: Test Your Setup (5 minutes)

## Step 5.1: Install Dependencies

**What to do:**
1. Open PowerShell (or use existing one)
2. Make sure you're in backend folder:
   ```powershell
   cd "f:\Side Projects\MessageScheduler\backend"
   ```
3. Install packages:
   ```powershell
   npm install
   ```
4. Wait for installation to complete

**What you'll see:**
- npm downloading packages
- Progress bars
- "added X packages" when done

---

## Step 5.2: Start the Backend

**What to do:**
1. In same PowerShell, run:
   ```powershell
   npm start
   ```
2. Wait for startup messages
3. Look for these messages:

```
✅ AWS SNS configured successfully
✅ MongoDB Connected Successfully
⏰ Scheduler initialized - checking every minute
🚀 Server is running on http://localhost:5000
```

**If you see these messages:** ✅ You're ready!

---

## Step 5.3: Test with Frontend

**What to do:**
1. Open another PowerShell or use existing
2. Open file explorer
3. Navigate to: `f:\Side Projects\MessageScheduler\frontend\`
4. Right-click `index.html`
5. Choose **"Open with"** → **"Your Browser"**
6. Website opens! 🎉

**What you should see:**
- Message Scheduler dashboard
- Input fields for phone, message, date, time
- List of messages

---

## Step 5.4: Schedule a Test Message

**What to do:**
1. In the dashboard form, fill in:
   - **Phone Number**: Your phone (with country code, e.g., +1-234-567-8900)
   - **Message**: "Test message from AWS SNS"
   - **Date**: Today
   - **Time**: 1-2 minutes from now
2. Click **"Schedule Message"** button

**What you'll see:**
- Form fields
- Submit button
- Message appears in list as "PENDING"

---

## Step 5.5: Wait and Check

**What to do:**
1. Wait 1-2 minutes
2. Watch PowerShell for messages:
   ```
   📨 Found 1 message(s) to send
   ✅ Message sent successfully to +1234567890
      Message ID: abc123def456
   ```
3. Check your phone for the message

**If you get the message:** 🎉 **Everything works!**

---

---

# ✅ CHECKLIST - Did You Complete All Steps?

## AWS Account Setup
- [ ] Created AWS account
- [ ] Verified email
- [ ] Verified phone
- [ ] Added payment method

## SMS Access
- [ ] Went to SNS service
- [ ] Set region to us-east-1
- [ ] Requested SMS access
- [ ] Got approval email

## IAM User & Credentials
- [ ] Created IAM user "messagescheduler-sns"
- [ ] Added AmazonSNSFullAccess permission
- [ ] Generated access key
- [ ] Copied both keys to notepad

## Project Setup
- [ ] Created .env file in backend folder
- [ ] Added AWS_ACCESS_KEY_ID
- [ ] Added AWS_SECRET_ACCESS_KEY
- [ ] Added AWS_REGION=us-east-1
- [ ] Ran npm install
- [ ] Ran npm start (saw success messages)

## Testing
- [ ] Opened frontend in browser
- [ ] Scheduled test message
- [ ] Waited 1-2 minutes
- [ ] Received message on phone
- [ ] Saw "SENT" status in dashboard

---

---

# 🆘 TROUBLESHOOTING

## Problem: "AWS SNS not configured"

**This appears in terminal when starting**

**Solution:**
1. Check if `.env` file exists in `backend/` folder
2. Check if credentials are correct (copy-paste from AWS)
3. Make sure no extra spaces or quotes
4. Restart: `npm start`

---

## Problem: "SMS sending not enabled"

**When you try to send a message**

**Solution:**
1. Check approval email - did you get it?
2. Wait up to 2 hours (usually 1 hour)
3. Check spam folder for approval
4. If still not approved, go back to SNS → Text Messaging → check status

---

## Problem: "Invalid phone number"

**Message doesn't send to your phone**

**Solution:**
1. Use format: `+1-234-567-8900` (with country code)
2. Not: `1234567890` (missing +)
3. Not: `234-567-8900` (missing country code)
4. Check you entered right number

---

## Problem: "Message never received"

**You scheduled it but didn't get it**

**Solutions:**
1. Check PowerShell - did it say "Message sent successfully"?
2. Check spam/messages folder on phone
3. Make sure you waited full 1-2 minutes
4. Try scheduling again with future time (2 minutes)
5. Check backend logs for error messages

---

## Problem: "Access Key ID invalid"

**Terminal shows credential error**

**Solution:**
1. Double-check you copied it correctly
2. No extra spaces before/after
3. Should start with "AKIA"
4. Delete .env and recreate with correct key
5. Restart: `npm start`

---

---

# 📞 QUICK REFERENCE

## AWS Information to Remember

| What | Where to Find | Format |
|-----|---------------|--------|
| **Access Key ID** | IAM → Users → Security credentials | AKIAIOSFODNN7EXAMPLE |
| **Secret Access Key** | IAM → Users → Security credentials | wJalrXUtnFEMI/K7MDENG/bPx... |
| **Region** | Always use this | us-east-1 |
| **Service** | SNS (Simple Notification Service) | Text Messaging |

## Your Project Files

| File | Location | Purpose |
|------|----------|---------|
| **.env** | `backend/.env` | Stores your credentials |
| **aws-sns.js** | `backend/aws-sns.js` | Sends messages via AWS |
| **scheduler.js** | `backend/scheduler.js` | Checks every minute to send |

---

# 🎉 YOU DID IT!

Your WhatsApp/SMS message scheduler is now:
- ✅ Connected to MongoDB (cloud database)
- ✅ Connected to AWS SNS (for real messages)
- ✅ Ready to send messages automatically
- ✅ 100% free for 70 messages/month

**Next step:** Deploy to cloud (Render/Heroku/Railway)!
