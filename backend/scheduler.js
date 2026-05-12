import schedule from 'node-schedule';
import { sendWhatsAppMessage } from './aws-sns.js';
import Message from './models/Message.js';

let activeJobs = {};

export function setupScheduler() {
  // Check for pending messages every minute
  schedule.scheduleJob('* * * * *', () => {
    checkAndSendPendingMessages();
  });

  console.log('⏰ Scheduler initialized - checking every minute');
}

async function checkAndSendPendingMessages() {
  try {
    const now = new Date();
    
    // Find all pending messages where scheduledTime <= now
    const pendingMessages = await Message.find({
      status: 'pending',
      scheduledTime: { $lte: now },
    });

    if (pendingMessages.length > 0) {
      console.log(`📨 Found ${pendingMessages.length} message(s) to send`);
      
      pendingMessages.forEach((message) => {
        sendMessageAsync(message);
      });
    }
  } catch (error) {
    console.error('Error checking pending messages:', error);
  }
}

async function sendMessageAsync(message) {
  try {
    // Avoid duplicate sends
    if (activeJobs[message._id]) {
      return;
    }

    activeJobs[message._id] = true;

    const result = await sendWhatsAppMessage(
      message.phoneNumber,
      message.message
    );

    // Update message status to sent
    await Message.findByIdAndUpdate(
      message._id,
      {
        status: 'sent',
        sentAt: new Date(),
        errorMessage: null,
      },
      { new: true }
    );

    console.log(`✅ Message ${message._id} sent successfully`);
    delete activeJobs[message._id];
  } catch (error) {
    // Update message status to failed
    await Message.findByIdAndUpdate(
      message._id,
      {
        status: 'failed',
        errorMessage: error.message,
      },
      { new: true }
    );

    console.error(`❌ Failed to send message ${message._id}:`, error.message);
    delete activeJobs[message._id];
  }
}

export { activeJobs };
