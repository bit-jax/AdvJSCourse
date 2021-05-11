/* globals prompt */
const { getMessages, postMessage } = require('./fetch-messages')
const { Chat } = require('./components')
const yo = require('yo-yo')
const io = require('../node_modules/socket.io/client-dist/socket.io.js')
const socket = io()

const nickname = prompt('Enter your nickname:')

socket.on('chat message', msg => {
  updateState('messages', state.messages.concat(msg))
})

const sendForm = document.getElementById('send-message')
const messageTextField = document.getElementById('message-text')
sendForm.onsubmit = evt => {
  evt.preventDefault()

  const msg = { text: messageTextField.value, nick: nickname, room: state.room, date: new Date() }
  socket.emit('chat message', msg)
}

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

getMessages(updateState)
