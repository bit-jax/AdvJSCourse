/* globals fetch */

function postMessage (text, nick, room) {
  console.log('posting message')
  fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, nick, room, date: new Date() })
  })
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function getMessages (updateState) {
  return fetch('/messages')
    .then(response => response.json())
    .then(data => {
      console.log('fetched data from server')
      updateState('messages', data)
    })
}

module.exports = {
  postMessage,
  getMessages
}
