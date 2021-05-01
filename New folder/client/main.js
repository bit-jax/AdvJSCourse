/* globals prompt */
const { getMessages, postMessage } = require('./fetch-messages')
const { Chat } = require('./components')
const yo = require('yo-yo')

const nickname = prompt('Enter your nickname:')

const sendForm = document.getElementById('send-message')
const messageTextField = document.getElementById('message-text')
sendForm.onsubmit = evt => {
  evt.preventDefault()
  postMessage(messageTextField.value, nickname, state.room)
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

setInterval(() => getMessages(updateState), 1000)
