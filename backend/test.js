#!/usr/bin/env node

/**
 * Simple test to verify Message Scheduler is working
 * Run with: node test.js
 */

import http from 'http';

const baseUrl = 'http://localhost:5000';

console.log('🧪 Testing Message Scheduler...\n');

async function testAPI() {
  try {
    // Test 1: Health check
    console.log('1️⃣  Testing health endpoint...');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    if (healthRes.ok) {
      const data = await healthRes.json();
      console.log('   ✅ Server is running');
      console.log(`   Timestamp: ${data.timestamp}\n`);
    } else {
      throw new Error('Health check failed');
    }

    // Test 2: Get messages
    console.log('2️⃣  Testing GET /api/messages...');
    const messagesRes = await fetch(`${baseUrl}/api/messages`);
    if (messagesRes.ok) {
      const messages = await messagesRes.json();
      console.log(`   ✅ Got ${messages.length} messages\n`);
    } else {
      throw new Error('Failed to fetch messages');
    }

    // Test 3: Create a message (test data)
    console.log('3️⃣  Testing POST /api/messages...');
    const futureTime = new Date();
    futureTime.setMinutes(futureTime.getMinutes() + 5);

    const createRes = await fetch(`${baseUrl}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber: '+12125551234',
        message: 'Test message from scheduler',
        scheduledTime: futureTime.toISOString(),
      }),
    });

    if (createRes.ok) {
      const msg = await createRes.json();
      console.log('   ✅ Message created successfully');
      console.log(`   Message ID: ${msg.id}\n`);

      // Test 4: Get single message
      console.log('4️⃣  Testing GET /api/messages/:id...');
      const getRes = await fetch(`${baseUrl}/api/messages/${msg.id}`);
      if (getRes.ok) {
        const data = await getRes.json();
        console.log('   ✅ Retrieved message successfully');
        console.log(`   Status: ${data.status}\n`);

        // Test 5: Delete message
        console.log('5️⃣  Testing DELETE /api/messages/:id...');
        const deleteRes = await fetch(`${baseUrl}/api/messages/${msg.id}`, {
          method: 'DELETE',
        });
        if (deleteRes.ok) {
          console.log('   ✅ Message deleted successfully\n');
        } else {
          throw new Error('Failed to delete message');
        }
      } else {
        throw new Error('Failed to get message');
      }
    } else {
      const error = await createRes.json();
      throw new Error(error.error || 'Failed to create message');
    }

    console.log('✨ All tests passed! ✨');
    console.log('\n✅ Server is working correctly');
    console.log('✅ Database is connected');
    console.log('✅ API endpoints are functional\n');
    return true;
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('\n📝 Troubleshooting:');
    console.error('   1. Make sure backend server is running');
    console.error('   2. Check that npm install was completed');
    console.error('   3. Verify server is on http://localhost:5000');
    console.error('   4. Check terminal for error messages\n');
    return false;
  }
}

console.log('Connecting to backend server...\n');
setTimeout(() => {
  testAPI().then((success) => {
    process.exit(success ? 0 : 1);
  });
}, 500);
