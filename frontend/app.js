const API_URL = 'http://localhost:5000/api';
let currentFilter = 'all';
let allMessages = [];

// DOM Elements
const messageForm = document.getElementById('messageForm');
const messagesList = document.getElementById('messagesList');
const charCount = document.getElementById('charCount');
const messageTextarea = document.getElementById('message');
const filterButtons = document.querySelectorAll('.filter-btn');
const toast = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setMinDateTime();
  loadMessages();
  setupEventListeners();
  
  // Refresh messages every 30 seconds
  setInterval(loadMessages, 30000);
});

function setMinDateTime() {
  const now = new Date();
  const dateInput = document.getElementById('scheduledDate');
  const today = now.toISOString().split('T')[0];
  dateInput.min = today;

  // If today, set minimum time to current time
  if (dateInput.value === today) {
    const timeInput = document.getElementById('scheduledTime');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeInput.min = `${hours}:${minutes}`;
  }
}

function setupEventListeners() {
  messageForm.addEventListener('submit', handleFormSubmit);
  messageTextarea.addEventListener('input', updateCharCount);
  filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterChange);
  });
}

function updateCharCount() {
  const count = messageTextarea.value.length;
  charCount.textContent = count;
  if (count > 160) {
    charCount.parentElement.style.color = '#e74c3c';
  } else {
    charCount.parentElement.style.color = '#7f8c8d';
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  const phoneNumber = document.getElementById('phoneNumber').value;
  const message = document.getElementById('message').value;
  const scheduledDate = document.getElementById('scheduledDate').value;
  const scheduledTime = document.getElementById('scheduledTime').value;

  const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);

  // Validate
  if (new Date() >= scheduledDateTime) {
    showToast('Scheduled time must be in the future', 'error');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phoneNumber,
        message,
        scheduledTime: scheduledDateTime.toISOString(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to schedule message');
    }

    showToast('Message scheduled successfully!', 'success');
    messageForm.reset();
    charCount.textContent = '0';
    loadMessages();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

async function loadMessages() {
  try {
    const response = await fetch(`${API_URL}/messages`);
    if (!response.ok) throw new Error('Failed to load messages');

    allMessages = await response.json();
    renderMessages();
  } catch (error) {
    console.error('Error loading messages:', error);
    messagesList.innerHTML = '<p class="error">Failed to load messages</p>';
  }
}

function handleFilterChange(e) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.dataset.filter;
  renderMessages();
}

function renderMessages() {
  const filtered = allMessages.filter(msg => {
    return currentFilter === 'all' || msg.status === currentFilter;
  });

  if (filtered.length === 0) {
    messagesList.innerHTML = '<p class="empty-state">No messages found</p>';
    return;
  }

  messagesList.innerHTML = filtered.map(msg => `
    <div class="message-card ${msg.status}">
      <div class="message-header">
        <span class="status-badge ${msg.status}">${msg.status.toUpperCase()}</span>
        <span class="timestamp">${new Date(msg.scheduled_time).toLocaleString()}</span>
      </div>
      <div class="message-body">
        <p class="recipient"><strong>To:</strong> ${msg.phone_number}</p>
        <p class="message-text">${escapeHtml(msg.message)}</p>
      </div>
      ${msg.sent_at ? `
        <div class="message-footer">
          <small>Sent: ${new Date(msg.sent_at).toLocaleString()}</small>
        </div>
      ` : ''}
      ${msg.error_message ? `
        <div class="message-footer error">
          <small>Error: ${msg.error_message}</small>
        </div>
      ` : ''}
      ${msg.status === 'pending' ? `
        <div class="message-actions">
          <button class="btn btn-delete" onclick="deleteMessage(${msg.id})">Delete</button>
        </div>
      ` : ''}
    </div>
  `).join('');
}

async function deleteMessage(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;

  try {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete message');
    }

    showToast('Message deleted successfully', 'success');
    loadMessages();
  } catch (error) {
    showToast(error.message, 'error');
  }
}

function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.style.display = 'block';

  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
