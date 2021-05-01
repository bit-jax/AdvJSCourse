/* globals prompt */
const { getMessages, postMessage } = require('./fetch-messages')
const { Chat } = require('./components')
const yo = require('yo-yo')

const io = require('../node_modules/socket.io/client-dist/socket.io.js')
const nickname = prompt('Enter your nickname:')

const sendForm = document.getElementById('send-message')
const messageTextField = document.getElementById('message-text')
sendForm.onsubmit = evt => {
  evt.preventDefault()
  postMessage(messageTextField.value, nickname, state.room)
}

var socket =  io()

var form = document.getElementById('send-message');
var input = document.getElementById('message-text');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
})

const state = {
  room: '',
  messages: []
}

function updateState (key, value) {
  state[key] = value
  yo.update(el, Chat(state.messages, state.room, updateState))
}

const el = Chat(state.messages, state.room, updateState)
const chatContainer = document.getElementById('chat-container')
chatContainer.appendChild(el)

// get messages on page load. runs again on chat message event
getMessages(updateState)

socket.on('chat message', function(msg) {
  getMessages(updateState)
});