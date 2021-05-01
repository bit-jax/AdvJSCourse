const yo = require('yo-yo')
/* globals prompt */

function Message (message) {
  return yo`<li class="message-item">
    <span class="date">${(new Date(message.date)).toLocaleString()}</span>
    <span class="nick">${message.nick}:</span>
    <span class="text">${message.text}</span>
  </li>`
}

function Chat (messages, room, updateState) {
  return yo`<div id="chatroom">
    ${Rooms(getRooms(messages, room), room, updateState)}
    <ul id="messages">
      ${messages.filter(msg => msg.room === room).map(Message)}
    </ul>
  </div>`
}

function Rooms (rooms, currentRoom, updateState) {
  function changeRoom (evt) {
    const room = evt.target.value
    updateState('room', room)
  }

  function addRoom () {
    const roomName = prompt('Enter a room name')
    updateState('room', roomName)
  }

  return yo`<div id="rooms">
    <button onclick=${addRoom}>Add Room</button>
    <label for="room-select">Change Room:</label>
    <select oninput=${changeRoom} name="room" id="room-select">
      <option value="">--Select a Room--</option>
      ${rooms.map(room => yo`<option value=${room} ${room === currentRoom ? 'selected' : ''}>${room}</option>`)}
    </select>
  </div>`
}

function getRooms (messages, currentRoom) {
  const rooms = messages.map(msg => msg.room)
  rooms.push(currentRoom) // we have to add the currentRoom to the list, otherwise it won't be an option if there isn't already a message with that room
  const filtered = rooms.filter(room => room) // filter out undefined or empty string
  return Array.from(new Set(filtered)) // filters out the duplicates
}

module.exports = {
  Chat
}
