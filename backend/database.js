import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, 'messages.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to SQLite database');
      }
    });
  }

  initialize() {
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS scheduled_messages (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT NOT NULL,
          message TEXT NOT NULL,
          scheduled_time DATETIME NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          sent_at DATETIME,
          error_message TEXT
        )
      `);
    });
  }

  // Get all messages
  getAllMessages(callback) {
    this.db.all(
      `SELECT * FROM scheduled_messages ORDER BY scheduled_time DESC`,
      callback
    );
  }

  // Get pending messages
  getPendingMessages(callback) {
    this.db.all(
      `SELECT * FROM scheduled_messages WHERE status = 'pending' AND scheduled_time <= datetime('now')`,
      callback
    );
  }

  // Add new message
  addMessage(phoneNumber, message, scheduledTime, callback) {
    this.db.run(
      `INSERT INTO scheduled_messages (phone_number, message, scheduled_time) 
       VALUES (?, ?, ?)`,
      [phoneNumber, message, scheduledTime],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  // Update message status
  updateMessageStatus(id, status, sentAt = null, errorMessage = null, callback) {
    this.db.run(
      `UPDATE scheduled_messages SET status = ?, sent_at = ?, error_message = ? WHERE id = ?`,
      [status, sentAt, errorMessage, id],
      callback
    );
  }

  // Delete message
  deleteMessage(id, callback) {
    this.db.run(
      `DELETE FROM scheduled_messages WHERE id = ?`,
      [id],
      callback
    );
  }

  // Get message by ID
  getMessageById(id, callback) {
    this.db.get(
      `SELECT * FROM scheduled_messages WHERE id = ?`,
      [id],
      callback
    );
  }

  close() {
    this.db.close();
  }
}

export default Database;
