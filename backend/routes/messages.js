import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ scheduledTime: -1 });
    res.json(messages || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single message
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new message
router.post('/', async (req, res) => {
  try {
    const { phoneNumber, message, scheduledTime } = req.body;

    // Validation
    if (!phoneNumber || !message || !scheduledTime) {
      return res.status(400).json({
        error: 'Missing required fields: phoneNumber, message, scheduledTime',
      });
    }

    // Validate scheduled time is in future
    if (new Date(scheduledTime) <= new Date()) {
      return res.status(400).json({
        error: 'Scheduled time must be in the future',
      });
    }

    // Create new message
    const newMessage = new Message({
      phoneNumber,
      message,
      scheduledTime: new Date(scheduledTime),
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Can only delete pending messages
    if (message.status !== 'pending') {
      return res.status(400).json({
        error: `Cannot delete ${message.status} message`,
      });
    }

    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
