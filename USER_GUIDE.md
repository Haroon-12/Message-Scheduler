# User Guide - Message Scheduler

## Getting Started

### The Website Layout

When you open `frontend/index.html`, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│  📱 WhatsApp Message Scheduler                          │
│  Schedule messages to be sent automatically              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Schedule a Message                                       │
├─────────────────────────────────────────────────────────┤
│ Recipient Phone Number:  [+1234567890           ]       │
│ Message:                 [Type message...      ]        │
│ Date:                    [2026-01-15         ]          │
│ Time:                    [10:30              ]          │
│ [  Schedule Message  ]                                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ Scheduled Messages                                       │
├─────────────────────────────────────────────────────────┤
│ [All] [Pending] [Sent] [Failed]                         │
├─────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────┐   │
│ │ PENDING   2026-01-15 10:30 AM                    │   │
│ │ To: +1234567890                                  │   │
│ │ Happy Birthday!                                  │   │
│ │                            [Delete]              │   │
│ └──────────────────────────────────────────────────┘   │
│                                                          │
│ ┌──────────────────────────────────────────────────┐   │
│ │ SENT   2026-01-14 08:00 AM                       │   │
│ │ To: +9876543210                                  │   │
│ │ Hello! Just checking in.                         │   │
│ │ Sent: 2026-01-14 08:00 AM                        │   │
│ └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Step-by-Step Instructions

### Scheduling Your First Message

#### Step 1: Enter Phone Number
```
[+1234567890]
↑
- Include the country code (e.g., +1 for USA, +44 for UK)
- Don't include spaces or dashes
- Example formats:
  • +12125551234 (USA)
  • +447911123456 (UK)
  • +33612345678 (France)
```

#### Step 2: Write Your Message
```
[Happy Birthday! Hope you have a wonderful day!    ]
↑
- Maximum 160 characters (SMS limit)
- Character counter shows in real-time
- Can be edited until you click Schedule
- Appears in message cards after sending
```

#### Step 3: Pick Date & Time
```
Date: [2026-01-15]  Time: [10:30]
      ↑                     ↑
      Must be future       In 24-hour format
```

#### Step 4: Click "Schedule Message"
```
[  Schedule Message  ]
   ↓
   ✅ Notification appears: "Message scheduled successfully!"
   ✅ Message appears in dashboard with PENDING status
   ✅ Form clears for next message
```

---

## Message Status Explained

### PENDING (Blue)
- Message waiting to be sent
- Scheduled time hasn't arrived yet
- You can still delete it
- Background job will send it at scheduled time

### SENT (Green)
- ✅ Message successfully delivered via WhatsApp
- Shows "Sent: [timestamp]" with delivery time
- Cannot be deleted (already sent)

### FAILED (Red)
- ❌ Something went wrong during sending
- Shows error message explaining why
- Common reasons:
  - Invalid phone number format
  - Twilio credentials not set up
  - Recipient not verified in sandbox
  - Network error

---

## Dashboard Features

### Filtering Messages

```
[All] [Pending] [Sent] [Failed]
  ↓      ↓         ↓       ↓
 Show  Show only  Show   Show
 all   messages   sent   failed
messages waiting messages
```

Click any filter to focus on specific messages.

### Message Card Details

```
┌────────────────────────────────────┐
│ [PENDING]        2026-01-15 10:30  │  ← Status & Scheduled Time
├────────────────────────────────────┤
│ To: +1234567890                    │  ← Recipient
│ Happy Birthday! Have a great day!  │  ← Message content
├────────────────────────────────────┤
│                         [Delete]   │  ← Delete button (pending only)
└────────────────────────────────────┘
```

---

## Tips & Tricks

### Phone Number Formats

| Country | Example | Format |
|---------|---------|--------|
| 🇺🇸 USA | +12125551234 | +1 + area code + number |
| 🇬🇧 UK | +447911123456 | +44 + number (without 0) |
| 🇮🇳 India | +919876543210 | +91 + number |
| 🇦🇺 Australia | +61212345678 | +61 + number (without 0) |
| 🇨🇦 Canada | +14165551234 | +1 + area code + number |

### Date & Time Tips

- **Set minimum notification:** Schedule 5 minutes before actual time to account for processing
- **Timezone:** Uses your computer's local time
- **Recurring messages:** Not supported yet (schedule multiple individually)
- **Past time prevention:** Can't schedule messages in the past

### Best Practices

✅ **Do:**
- Include country code in phone numbers
- Test with your own number first
- Wait for "Successfully scheduled" notification
- Check dashboard for status updates

❌ **Don't:**
- Use spaces or dashes in phone numbers
- Schedule too many messages at once (gives server time to process)
- Close browser immediately (wait for confirmation)
- Forget to set up Twilio for real sending

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Move to next field |
| `Shift+Tab` | Move to previous field |
| `Enter` | Submit form (from any field) |
| `Esc` | Close any dialogs |
| `F5` | Refresh page |

---

## Common Messages

### Success Messages
```
✅ "Message scheduled successfully!"
✅ "Message deleted successfully"
```

### Error Messages
```
❌ "Scheduled time must be in the future"
   → Move date/time forward

❌ "Invalid phone number format"
   → Add country code (e.g., +1)

❌ "Missing required fields"
   → Fill in all fields

❌ "Failed to load messages"
   → Backend server not running
```

---

## Keyboard Shortcuts

### Form Navigation
- `Tab` - Next field
- `Shift + Tab` - Previous field
- `Enter` - Submit form

### General
- `F12` - Open browser developer tools (for troubleshooting)
- `F5` - Reload page
- `Ctrl + Shift + I` - Inspect element

---

## Responsive Design

The scheduler works great on:

📱 **Mobile (Portrait)**
- Full width layout
- Touch-friendly buttons
- Easy typing on keyboard

💻 **Tablet (Landscape)**
- Two-column form layout
- Side-by-side controls

🖥️ **Desktop**
- Wide form sections
- Comfortable spacing
- Large message cards

---

## Data Storage

All your messages are stored locally in SQLite database:
```
Location: backend/messages.db
```

The database contains:
- Phone numbers
- Messages (encrypted if using HTTPS)
- Scheduled times
- Send status
- Timestamps
- Error information

**Privacy:** All data stays on your computer!

---

## Time Zones

⚠️ **Important:** The scheduler uses your **computer's local time zone**

Example: If it's 2:00 PM in your timezone:
- Scheduling at 2:30 PM = 30 minutes from now
- The message sends at 2:30 PM YOUR time
- Not UTC or any other timezone

To verify your time:
1. Check bottom-right corner of your screen
2. Compare with displayed timestamps in app
3. Should match exactly

---

## Support & Troubleshooting

### Issue: "Cannot POST /api/messages"
**Solution:** Backend server not running
```
→ Open new terminal
→ Run: npm start
→ Should see "Server is running on http://localhost:5000"
```

### Issue: Message shows as FAILED
**Solution:** Check the error message
```
→ Look at red error text in message card
→ Common causes:
   • Invalid phone number
   • Twilio not configured
   • Network connection issue
```

### Issue: Frontend won't load
**Solution:** Refresh the page
```
→ Press F5
→ Or close and reopen frontend/index.html
→ Check browser console for errors (F12)
```

### Issue: Characters keep disappearing
**Solution:** Your browser may be auto-saving
```
→ Try a different browser
→ Clear browser cache (Ctrl+Shift+Delete)
→ Check if JavaScript is enabled
```

---

## Next Steps

Now that you know how to use the scheduler:

1. **Schedule your first message** - Try sending yourself a message
2. **Set up Twilio** - Follow TWILIO_SETUP.md for real WhatsApp sending
3. **Explore the code** - Modify colors, add features
4. **Deploy** - Run 24/7 on a server for constant scheduling

---

**Questions? Check README.md or QUICKSTART.md!** 📚
