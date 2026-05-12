import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Configure AWS
const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
const aws_region = process.env.AWS_REGION || 'us-east-1';

let sns;

if (aws_access_key_id && aws_secret_access_key) {
  AWS.config.update({
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: aws_region,
  });
  sns = new AWS.SNS();
  console.log('✅ AWS SNS configured successfully');
} else {
  console.warn('⚠️ AWS SNS credentials not configured. Messages will be logged instead.');
  sns = null;
}

/**
 * Send WhatsApp message via AWS SNS
 * @param {string} recipientNumber - Phone number with country code (e.g., +1234567890)
 * @param {string} messageBody - Message text to send
 * @returns {Promise<object>} - Result of message send
 */
export async function sendWhatsAppMessage(recipientNumber, messageBody) {
  try {
    // Ensure number has proper format (+country-code-number)
    const formattedNumber = recipientNumber.startsWith('+')
      ? recipientNumber
      : `+${recipientNumber}`;

    if (!sns) {
      // Mock send for testing without AWS credentials
      console.log(`[MOCK SNS] Sending WhatsApp message to ${formattedNumber}`);
      console.log(`[MOCK SNS] Message: ${messageBody}`);
      return { success: true, mock: true, phoneNumber: formattedNumber };
    }

    // Send SMS via AWS SNS (WhatsApp support through SMS)
    const params = {
      Message: messageBody,
      PhoneNumber: formattedNumber,
      MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
          DataType: 'String',
          StringValue: 'MessageScheduler'
        },
        'AWS.SNS.SMS.SMSType': {
          DataType: 'String',
          StringValue: 'Transactional'
        }
      }
    };

    const result = await sns.publish(params).promise();

    console.log(`✅ Message sent successfully to ${formattedNumber}`);
    console.log(`   Message ID: ${result.MessageId}`);

    return {
      success: true,
      messageId: result.MessageId,
      phoneNumber: formattedNumber,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('❌ Error sending message via AWS SNS:', error.message);
    throw error;
  }
}

export default { sendWhatsAppMessage };
