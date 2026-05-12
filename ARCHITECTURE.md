# 📊 Message Scheduler Architecture & Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          YOUR COMPUTER                           │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              WEB BROWSER (Frontend)                       │   │
│  │                                                            │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Beautiful Purple/Green WhatsApp Theme UI        │   │   │
│  │  │  • Schedule Message Form                        │   │   │
│  │  │  • Message Dashboard                            │   │   │
│  │  │  • Status Filters (Pending/Sent/Failed)         │   │   │
│  │  │                                                  │   │   │
│  │  │  Files: index.html, app.js, styles.css         │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                        ↑↓                                 │   │
│  │                  HTTP/AJAX Calls                         │   │
│  │                        ↑↓                                 │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │          EXPRESS.JS WEB SERVER                   │   │   │
│  │  │          (localhost:5000)                        │   │   │
│  │  │                                                  │   │   │
│  │  │  • GET    /api/messages                         │   │   │
│  │  │  • POST   /api/messages                         │   │   │
│  │  │  • DELETE /api/messages/:id                     │   │   │
│  │  │  • GET    /api/health                           │   │   │
│  │  │                                                  │   │   │
│  │  │  File: server.js                                │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                        ↑↓                                 │   │
│  │                   Data Flow                              │   │
│  │                        ↑↓                                 │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │           SQLITE3 DATABASE                       │   │   │
│  │  │                                                  │   │   │
│  │  │  ┌──────────────────────────────────────────┐   │   │   │
│  │  │  │   scheduled_messages TABLE               │   │   │   │
│  │  │  │  ┌──────────────────────────────────┐   │   │   │   │
│  │  │  │  │ id | phone | message | time ...  │   │   │   │   │
│  │  │  │  │ 1  | +1... | Happy.. | 2026-... │   │   │   │   │
│  │  │  │  │ 2  | +44.. | Hello.. | 2026-... │   │   │   │   │
│  │  │  │  └──────────────────────────────────┘   │   │   │   │
│  │  │  └──────────────────────────────────────────┘   │   │   │
│  │  │                                                  │   │   │
│  │  │  File: messages.db                             │   │   │
│  │  │  Location: backend/messages.db                 │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                        ↑↓                                 │   │
│  │            ┌───────────────────────┐                     │   │
│  │            │  BACKGROUND SCHEDULER │                     │   │
│  │            │  (Runs Every Minute)  │                     │   │
│  │            │                       │                     │   │
│  │            │ 1. Check for due msgs │                     │   │
│  │            │ 2. Send via Twilio    │                     │   │
│  │            │ 3. Update status      │                     │   │
│  │            │                       │                     │   │
│  │            │ File: scheduler.js    │                     │   │
│  │            └───────────────────────┘                     │   │
│  │                        ↓↓                                 │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │           OPTIONAL: TWILIO (Internet)                    │   │
│  │                                                            │   │
│  │  When you set up credentials in .env:                   │   │
│  │  Messages are sent via Twilio WhatsApp API              │   │
│  │                                                            │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  Files:                                          │   │   │
│  │  │  • whatsapp.js (Twilio integration)             │   │   │
│  │  │  • .env (Your credentials)                      │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  │                        ↓↓                                 │   │
│  │              TWILIO WHATSAPP API                         │   │
│  │                        ↓↓                                 │   │
│  │          RECIPIENT'S WHATSAPP (📱)                      │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER SCHEDULES MESSAGE                    │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  FORM SUBMISSION (Frontend)            │
        │  • Phone: +1234567890                  │
        │  • Message: "Happy Birthday!"          │
        │  • DateTime: 2026-01-15 10:30          │
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  POST /api/messages (HTTP Request)     │
        │  JSON: {phoneNumber, message, time}    │
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  EXPRESS SERVER RECEIVES REQUEST       │
        │  • Validates data                      │
        │  • Checks phone format                 │
        │  • Checks time is future               │
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  DATABASE INSERT (SQLite)              │
        │  INSERT INTO scheduled_messages VALUES │
        │  Status: "pending"                     │
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  SUCCESS RESPONSE (HTTP 201)           │
        │  JSON: {id, phoneNumber, time, ...}    │
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  FRONTEND SHOWS SUCCESS NOTIFICATION   │
        │  Toast: "Message scheduled successfully"
        └────────────────────┬───────────────────┘
                             │
                             ↓
        ┌────────────────────────────────────────┐
        │  MESSAGE APPEARS IN DASHBOARD          │
        │  Status: PENDING (blue)                │
        │  Shows phone, message, scheduled time  │
        └────────────────────┬───────────────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ↓                             ↓
    ┌──────────────────┐      ┌──────────────────┐
    │ SCHEDULED TIME   │      │ USER DELETES MSG │
    │   ARRIVES        │      │  (Before send)   │
    └────────┬─────────┘      └────────┬─────────┘
             │                         │
             ↓                         ↓
    ┌──────────────────┐      ┌──────────────────┐
    │ BACKGROUND JOB   │      │ DELETE REQUEST   │
    │ Checks Database  │      │  /api/messages/1 │
    │ (Every Minute)   │      └────────┬─────────┘
    └────────┬─────────┘               │
             │                         ↓
             ↓                  ┌──────────────────┐
    ┌──────────────────┐       │ DELETE FROM DB   │
    │ TWILIO SEND CALL │       │ WHERE id = 1     │
    │ whatsapp API     │       └────────┬─────────┘
    └────────┬─────────┘               │
             │                         ↓
             ↓                  ┌──────────────────┐
    ┌──────────────────┐       │ STATUS: 200 OK   │
    │ SUCCESS or FAIL? │       │ Message deleted  │
    └────────┬─────────┘       └────────┬─────────┘
             │                         │
    ┌────────┴────────┐               │
    │                 │               │
    ↓                 ↓               ↓
 ┌──────┐  ┌──────┐  ┌────────────────────────┐
 │SENT  │  │FAILED│  │ Frontend refreshes     │
 │ ✅   │  │ ❌   │  │ Message removed        │
 └──┬───┘  └──┬───┘  │ from dashboard         │
    │         │      └────────────────────────┘
    ↓         ↓
 ┌──────────────────────────┐
 │ UPDATE DATABASE STATUS   │
 │ UPDATE scheduled_messages│
 │ SET status = 'sent/fail' │
 │ WHERE id = 1             │
 └──────────┬───────────────┘
            │
            ↓
 ┌──────────────────────────┐
 │ FRONTEND POLLS API       │
 │ GET /api/messages        │
 │ Every 30 seconds         │
 └──────────┬───────────────┘
            │
            ↓
 ┌──────────────────────────┐
 │ DASHBOARD UPDATES        │
 │ Message shows "SENT"     │
 │ Green badge ✅           │
 │ Shows delivery time      │
 └──────────────────────────┘
```

---

## File Dependencies

```
FRONTEND FILES
├── index.html
│   ├── Loads: app.js
│   ├── Loads: styles.css
│   └── Imports: Communicates with backend API
│
├── app.js
│   ├── Imports: Fetch API (browser native)
│   ├── Calls: GET /api/messages
│   ├── Calls: POST /api/messages
│   ├── Calls: DELETE /api/messages/:id
│   ├── Updates: DOM elements
│   └── Shows: Toast notifications
│
└── styles.css
    └── Styles: All HTML elements


BACKEND FILES
├── server.js (Entry Point)
│   ├── Imports: express
│   ├── Imports: cors
│   ├── Imports: dotenv
│   ├── Imports: database.js
│   ├── Imports: scheduler.js
│   ├── Imports: routes/messages.js
│   ├── Creates: Express server
│   ├── Initializes: Database
│   ├── Starts: Scheduler
│   └── Listens: Port 5000
│
├── database.js
│   ├── Imports: sqlite3
│   ├── Creates: SQLite connection
│   ├── Methods: getAllMessages(), getPendingMessages(), addMessage(), etc.
│   └── Manages: Database operations
│
├── scheduler.js
│   ├── Imports: node-schedule
│   ├── Imports: whatsapp.js
│   ├── Creates: Job that runs every minute
│   ├── Calls: getPendingMessages()
│   ├── Calls: sendWhatsAppMessage()
│   └── Updates: Message status
│
├── whatsapp.js
│   ├── Imports: twilio (if credentials present)
│   ├── Exports: sendWhatsAppMessage()
│   └── Action: Sends message via Twilio or logs
│
└── routes/messages.js
    ├── Imports: express
    ├── Handler: GET /api/messages
    ├── Handler: GET /api/messages/:id
    ├── Handler: POST /api/messages
    ├── Handler: DELETE /api/messages/:id
    ├── Validation: Phone format, future time
    └── Responses: JSON


DATABASE
├── messages.db (SQLite file)
│   └── scheduled_messages table
│       ├── id (Primary Key)
│       ├── phone_number
│       ├── message
│       ├── scheduled_time
│       ├── status (pending/sent/failed)
│       ├── created_at
│       ├── sent_at
│       └── error_message


CONFIGURATION
├── .env (Your secrets - NOT in git)
│   ├── TWILIO_ACCOUNT_SID
│   ├── TWILIO_AUTH_TOKEN
│   ├── TWILIO_WHATSAPP_NUMBER
│   └── PORT
│
└── .env.example (Template - safe to share)
    └── Same structure as .env


EXTERNAL DEPENDENCIES (package.json)
├── express (Web server)
├── cors (Cross-origin requests)
├── sqlite3 (Database)
├── dotenv (Environment variables)
├── node-schedule (Job scheduling)
└── twilio (WhatsApp API)
```

---

## Request/Response Flow

### 1. Schedule Message

```
FRONTEND                      BACKEND
   │                            │
   ├─ User fills form ──────→   │
   │                            │
   └─────── POST /api/messages ─┤
   │       {                    │
   │         phoneNumber,       │
   │         message,           │
   │         scheduledTime      │
   │       }                    │
   │                     ┌──────┴────────┐
   │                     │ Validate      │
   │                     │ Save to DB    │
   │                     └──────┬────────┘
   │←────── JSON 201 ───────────┤
   │       {                    │
   │         id: 1,             │
   │         phoneNumber,       │
   │         message,           │
   │         scheduledTime      │
   │       }                    │
   │                            │
   └─ Show success toast ──────→│
       Update dashboard
```

### 2. Get All Messages

```
FRONTEND                      BACKEND
   │                            │
   ├─ Page loads / F5 pressed   │
   │                            │
   └───── GET /api/messages ────┤
   │                      ┌─────┴────────┐
   │                      │ Query DB     │
   │                      │ Get all msgs │
   │                      └─────┬────────┘
   │←────── JSON 200 ──────────┤
   │       [                   │
   │         {id, phone, msg...│
   │         {id, phone, msg...│
   │         ...               │
   │       ]                   │
   │                            │
   └─ Render cards ────────────→│
       Show in dashboard
```

### 3. Delete Message

```
FRONTEND                      BACKEND
   │                            │
   ├─ User clicks Delete        │
   │                            │
   └─── DELETE /api/messages/1 ─┤
   │                      ┌─────┴────────┐
   │                      │ Check status │
   │                      │ If pending   │
   │                      │ Delete from  │
   │                      │ database     │
   │                      └─────┬────────┘
   │←────── JSON 200 ──────────┤
   │       {                   │
   │         success: true,    │
   │         id: 1             │
   │       }                   │
   │                            │
   └─ Show success ────────────→│
       Remove from dashboard
```

### 4. Automatic Send (Backend)

```
BACKGROUND JOB (Every Minute)
│
├─ Get pending messages
│
├─ For each message:
│  ├─ Check if scheduled time has passed
│  │
│  ├─ Yes: Call sendWhatsAppMessage()
│  │  │
│  │  ├─ If Twilio configured:
│  │  │  └─ Send via Twilio API
│  │  │
│  │  ├─ If not configured:
│  │  │  └─ Log to console (mock)
│  │  │
│  │  └─ Update database:
│  │     ├─ status = 'sent'
│  │     └─ sent_at = current time
│  │
│  └─ On error:
│     ├─ status = 'failed'
│     └─ error_message = error text
│
└─ Frontend polls every 30 seconds
   └─ Shows updated status in dashboard
```

---

## Message Lifecycle

```
┌──────────────┐
│ NOT CREATED  │
└──────┬───────┘
       │ User schedules message
       ↓
┌──────────────────┐
│ PENDING (🔵 Blue)│  ← Waiting to be sent
│                  │    Can be deleted
│                  │    Shows scheduled time
└──────┬───────────┘
       │ Time arrives
       │ Scheduler sends
       ↓
   ┌───┴────┐
   │         │
   ↓         ↓
┌────────┐  ┌────────┐
│ SENT   │  │ FAILED │
│🟢Green │  │ 🔴 Red │
└────────┘  └────────┘
  Success    Error
  ✅         ❌
  Cannot     Cannot
  delete     delete
```

---

## Technology Stack Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    WEB APPLICATIONS                        │
│                                                            │
│  Frontend Layer        Backend Layer     Data Layer       │
│  ───────────────      ─────────────     ──────────       │
│  ┌──────────────┐    ┌──────────────┐  ┌──────────┐     │
│  │ HTML5        │    │ Node.js      │  │ SQLite3  │     │
│  │ CSS3         │    │ Express.js   │  │ Database │     │
│  │ JavaScript   │    │ CORS         │  │          │     │
│  │              │    │ dotenv       │  │ messages │     │
│  │ Browser API: │    │              │  │ .db file │     │
│  │ • Fetch      │    │ Routes:      │  │          │     │
│  │ • LocalStore │    │ • GET        │  │ Table:   │     │
│  │ • DOM        │    │ • POST       │  │ • msgs   │     │
│  │              │    │ • DELETE     │  │          │     │
│  │ Runs:        │    │              │  │          │     │
│  │ • Any Browser│    │ Runs:        │  │ Runs:    │     │
│  │              │    │ • localhost  │  │ • local  │     │
│  │              │    │ • port 5000  │  │ • file   │     │
│  └──────────────┘    └──────────────┘  └──────────┘     │
│         ↓                    ↓                ↓            │
│      frontend/          backend/          backend/        │
│      (3 files)          (7 files)         messages.db     │
└────────────────────────────────────────────────────────────┘
         HTTP ↔ JSON API ↔ SQLite
```

---

## Deployment Architecture (Optional)

```
WITHOUT DEPLOYMENT (Current - Local)
┌─────────────────────────────────────┐
│       YOUR COMPUTER                 │
│  ┌────────────────────────────────┐ │
│  │ Backend (npm start)            │ │
│  │ Frontend (open file)           │ │
│  │ Database (messages.db)         │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘


WITH DEPLOYMENT (Cloud - Optional Future)
┌──────────────────────────────────────────────┐
│ USER'S BROWSER                               │
│ ┌───────────────────────────────────────┐   │
│ │ Frontend (Vercel/Netlify/GitHub Pages)    │
│ │ Can be anywhere on internet                │
│ └──────────────────┬──────────────────┘    │
│                    │                        │
│ ┌──────────────────┴──────────────────┐    │
│ │ HTTPS API Calls                      │    │
│ └──────────────────┬──────────────────┘    │
└────────────────────┬─────────────────────────┘
                     │
         ┌───────────┴──────────┐
         │                      │
         ↓                      ↓
    ┌─────────────┐        ┌──────────────┐
    │ Cloud Server│        │ Database     │
    │ (Heroku,    │        │ (PostgreSQL, │
    │ DigitalOcean)        │ MongoDB)     │
    │             │        │              │
    │ Backend     │        │ Messages     │
    │ (npm start) │────→   │              │
    │             │        │              │
    │ Scheduler   │        └──────────────┘
    │ running 24/7│
    └─────────────┘
```

---

**This architecture supports scheduling, auto-sending, and real-time updates all in one elegant system!** 🚀
