// Connect to the server using Socket.io
const socket = io();

// Get elements
const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');
const chatBox = document.getElementById('chat-box');

// Function to add message to the chat
function addMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the bottom
}

// Send message when button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat message', message);  // Send message to server
        messageInput.value = '';  // Clear input
    }
});

// Optionally, allow sending with the "Enter" key
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});

// Listen for new messages from the server and display them
socket.on('chat message', (msg) => {
    addMessage(msg);
});
