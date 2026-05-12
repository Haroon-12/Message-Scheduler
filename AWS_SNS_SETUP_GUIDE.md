# 📱 AWS SNS WhatsApp Setup Guide - FREE Forever!

## Overview

**AWS SNS (Simple Notification Service)** sends WhatsApp & SMS messages for FREE!

### Pricing
- ✅ **100 free SMS messages/month** (includes WhatsApp)
- 📊 Perfect for your 70 messages/month
- ❌ **0% cost if you stay under 100/month**
- After 100: $0.00645 per message (still cheap)

### Why AWS SNS?
- ✅ Completely free for your usage
- ✅ No credit card required initially
- ✅ Reliable (used by millions)
- ✅ Easy integration
- ✅ Works with WhatsApp

---

## Step 1: Create AWS Account

### 1.1 Go to AWS
- Visit [aws.amazon.com](https://aws.amazon.com/)
- Click **"Create an AWS Account"**

### 1.2 Sign Up
- Email address
- Password
- Account name
- Phone number (for verification)
- Address
- Payment method (optional for free tier - don't worry!)

### 1.3 Verify Email
- Check email → Click verification link
- Account is created!

---

## Step 2: Enable SNS for WhatsApp

### 2.1 Go to SNS Console
1. Log in to AWS Console
2. Search for **"SNS"** (or go to Services → SNS)
3. Click **Simple Notification Service**

### 2.2 Check Region
- Make sure you're in **us-east-1** (top right corner)
- This is important for SMS pricing!

### 2.3 Request Access
1. In SNS console, click **Text Messaging (SMS)**
2. Click **"Get started with text messaging"**
3. Request support for:
   - **Transactional SMS** (for scheduled messages)
4. Fill out the form:
   - Use case: "Message scheduler application"
   - Expected volume: "100 messages per month"
5. **Submit Request**

### 2.4 Wait for Approval
- Usually approved within 1 hour
- You'll get email confirmation
- Check spam folder if you don't see it

---

## Step 3: Get AWS Credentials

### 3.1 Create IAM User (Best Practice)
1. Go to **IAM** (Identity and Access Management)
2. Click **Users** on left menu
3. Click **"Create user"**
4. Username: `messagescheduler-sns`
5. Click **"Next"**

### 3.2 Add Permissions
1. Click **"Attach policies directly"**
2. Search for **"AmazonSNSFullAccess"**
3. ✅ Check the box for it
4. Click **"Next"** → **"Create user"**

### 3.3 Generate Access Keys
1. Click the user you just created
2. Go to **"Security credentials"** tab
3. Scroll down to **"Access keys"**
4. Click **"Create access key"**
5. Select **"Application running outside AWS"**
6. Click **"Next"**
7. Click **"Create access key"**

### 3.4 Copy Your Keys
**IMPORTANT:** Copy these immediately - you won't see them again!

```
Access Key ID:     AKIA...
Secret Access Key: ...
```

Save them somewhere safe (notepad, password manager, etc.)

---

## Step 4: Configure Your Project

### 4.1 Create .env File
In `backend/` folder, create `.env`:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/messagescheduler?retryWrites=true&w=majority

# AWS SNS (WhatsApp/SMS)
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# Server
PORT=5000
NODE_ENV=development
```

Replace:
- `AKIA...` → Your Access Key ID
- `...` → Your Secret Access Key

### 4.2 Install Dependencies
```powershell
cd backend
npm install
```

This installs AWS SDK automatically!

### 4.3 Start Backend
```powershell
npm start
```

You should see:
```
✅ AWS SNS configured successfully
✅ MongoDB Connected Successfully
⏰ Scheduler initialized - checking every minute
🚀 Server is running on http://localhost:5000
```

---

## Step 5: Test WhatsApp Sending

### 5.1 Open Frontend
- Open `frontend/index.html` in browser

### 5.2 Schedule Test Message
1. **Phone Number**: Your personal phone (with country code)
   - Example: `+1-234-567-8900` or `+1234567890`
2. **Message**: "Hello from AWS SNS!"
3. **Date**: Today
4. **Time**: 1 minute from now
5. Click **"Schedule Message"**

### 5.3 Wait ~1 Minute
- Watch the backend terminal
- You should see:
```
📨 Found 1 message(s) to send
✅ Message sent successfully to +1234567890
   Message ID: abc123def456
```

### 5.4 Check Your Phone
- You should receive the message as **SMS** on WhatsApp!
- It comes from a Twilio number (that's normal)

### 5.5 Check Dashboard
- Refresh the website
- Message status changes to **SENT**
- Shows delivery timestamp

---

## Phone Number Format

AWS SNS requires international format:

```
Format: +[country code][number]

Examples:
✅ +1-234-567-8900  (USA)
✅ +44-20-7946-0958 (UK)
✅ +92-300-1234567  (Pakistan)
✅ +91-11-4096-1111 (India)
✅ +61-2-1234-5678  (Australia)

Country Codes:
USA/Canada:    +1
UK:            +44
Pakistan:      +92
India:         +91
Australia:     +61
Germany:       +49
France:        +33
```

---

## Common Issues & Fixes

### Issue: "Invalid credentials"
```
Error: The security token included in the request is invalid
```

**Fix:**
- Copy Access Key ID and Secret correctly
- Check for extra spaces
- Verify .env file has correct values
- Restart backend with `npm start`

### Issue: "Not authorized for SMS"
```
Error: User is not authorized to perform: sns:Publish on resource
```

**Fix:**
- Wait 5 minutes after adding permissions
- Check if user has **AmazonSNSFullAccess** policy
- Try refreshing AWS console
- Restart backend

### Issue: "SMS sending not enabled"
```
Error: SMS sending is not enabled for your account
```

**Fix:**
- You haven't completed SMS signup request yet
- Check email for AWS approval
- Make sure you're in **us-east-1** region
- Try again in a few hours

### Issue: "Invalid phone number"
```
Error: Invalid phone number
```

**Fix:**
- Add country code: +1234567890 (not 1234567890)
- Check for extra spaces
- Format: +[country code][number]

### Issue: Message not received
**Check:**
1. Is backend running? (should show "Server is running")
2. Is MongoDB connected? (should show "✅ MongoDB Connected")
3. Are credentials in .env correct?
4. Did scheduler run? (check backend logs)
5. Is phone number correct with country code?

---

## AWS SNS vs Twilio Comparison

| Feature | AWS SNS | Twilio |
|---------|---------|--------|
| **Free tier** | 100 SMS/month | $15 credit |
| **Cost after free** | $0.00645/msg | $0.005-0.01/msg |
| **For 70 msgs/month** | FREE | FREE |
| **Setup complexity** | Medium | Medium |
| **Reliability** | High | High |
| **WhatsApp support** | ✅ Yes | ✅ Yes |
| **Recommended for you** | ✅ YES | Alternative |

---

## Security Best Practices

✅ **DO:**
- Keep Access Key ID secret
- Keep Secret Access Key secret
- Use `.env` file (not in code)
- Add `.env` to `.gitignore`
- Delete old access keys you don't use

❌ **DON'T:**
- Put credentials in code
- Share credentials on GitHub
- Commit `.env` file to git
- Use same credentials for multiple projects
- Leave access keys unmonitored

### .gitignore
Make sure your `.gitignore` has:
```
.env
.env.local
.env.*.local
```

---

## Monitoring & Logging

### Check AWS SNS Logs
1. Go to **CloudWatch** (in AWS console)
2. Click **Logs** → **Log groups**
3. Look for SNS logs
4. See all messages sent, delivery status, errors

### Check Delivery Status
1. Go to SNS console
2. Click **Text Messaging (SMS)**
3. Look for delivery reports
4. See which messages succeeded/failed

---

## FAQ

**Q: Why does the message come as SMS not WhatsApp?**
A: AWS SNS sends SMS messages. Recipients can receive them on WhatsApp if they have SMS forwarding enabled, or they get regular SMS.

**Q: Can I send to non-international numbers?**
A: You must use international format with country code (+1-XXX-XXX-XXXX).

**Q: What if I exceed 100 free messages?**
A: You're charged $0.00645 per message. You can set spending limits to prevent surprises.

**Q: Can I send bulk messages to multiple people?**
A: Yes! Schedule separate messages for each person - still counts toward 100 free/month.

**Q: How do I know if message was delivered?**
A: Dashboard shows status: PENDING → SENT → DELIVERED

**Q: Can I send messages at exact time?**
A: Within ~1 minute accuracy (scheduler checks every minute).

**Q: Do I need a credit card?**
A: For the free tier SMS, you might not need one initially. For production, AWS may ask for it.

**Q: What if I forget to send "join" message?**
A: AWS SNS doesn't have sandbox mode. Your number works immediately after approval.

**Q: Can I send images/media?**
A: AWS SNS SMS only sends text. For media, you'd need WhatsApp Business API (more complex).

**Q: Is there a character limit?**
A: SMS messages are 160 characters. Longer messages are split and charged per segment.

---

## Cost Calculator

```
Your Usage: 70 messages/month

AWS SNS Pricing:
- First 100 messages: FREE
- After 100: $0.00645 per message

Your Cost:
- Month 1-∞: $0 (within free tier)
- If you exceeded: $0.45 (70 × $0.00645)

Total: COMPLETELY FREE! 🎉
```

---

## Next Steps

1. ✅ Create AWS account (5 min)
2. ✅ Request SMS access (2 min)
3. ✅ Create IAM user (5 min)
4. ✅ Get access keys (2 min)
5. ✅ Update .env file (2 min)
6. ✅ `npm install` (3 min)
7. ✅ `npm start` (1 min)
8. ✅ Test with frontend (2 min)
9. ✅ Deploy to cloud (later)

**Total setup time: ~20 minutes!**

---

## Troubleshooting Steps

1. Check if SMS access was approved (check email)
2. Verify you're in **us-east-1** region
3. Check if IAM user has **AmazonSNSFullAccess** permission
4. Wait 5 minutes after adding permissions
5. Verify credentials in .env are correct
6. Check backend terminal for error messages
7. Try restarting backend: `npm start`
8. Check AWS CloudWatch logs

---

## Advanced: Enable Delivery Tracking

### Set Up SNS Logs
1. Go to SNS console
2. Click **Text Messaging (SMS)**
3. Click **"Publish settings"**
4. Enable **Delivery Status Logging**
5. Select CloudWatch role
6. Click **"Save"**

Now all SMS deliveries are logged in CloudWatch!

---

## Summary

### What You Get:
- ✅ Free WhatsApp/SMS for 70 messages/month
- ✅ No payment required
- ✅ Automatic scheduling
- ✅ 24/7 sending
- ✅ Reliable delivery

### What You Need:
- ✅ AWS account (free)
- ✅ Access Key ID
- ✅ Secret Access Key
- ✅ 5 minutes to set up

### Cost:
- **Forever free** if you stay under 100 messages/month
- After that: Extremely cheap ($0.00645 per message)

---

**Ready to send your first message? Follow steps 1-5 above!** 🚀

For more: [AWS SNS Documentation](https://docs.aws.amazon.com/sns/)
