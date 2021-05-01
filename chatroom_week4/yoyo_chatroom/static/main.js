// to GET and POST messages, we use javascript's built-in function "fetch"
// fetch returns a "promise", which is a fancy object representing an asynchronous computation
// We call ".then" and ".catch" on the promise object where we can register success and error callbacks respectively.

// Fontend

var yo = require('yo-yo')
var el = messages([])
let messageCounter = 0


// ==========================New Room Section=========================================//
let roomNumber = "room1"

document.getElementById('room1').onclick = function room1 () {
  roomNumber = "room1"
  console.log(roomNumber)
  getMessages()
}

document.getElementById('room2').onclick = function room2 () {
  roomNumber = "room2"
  console.log(roomNumber)
  getMessages()
}

document.getElementById('newRoomBtn').onclick = function newRoomBtn () {
  let btn = document.createElement('BUTTON')
  btn.innerHTML = 'Room X'

  document.getElementById('roomBtnContainer').appendChild(btn)
}
// ==========================New Room Section End======================================//


document.getElementById('postBtn').onclick = function postMessage () {
  let postValue = document.getElementById('postValue').value
  console.log(postValue, 'post value log')

  let name = document.getElementById('nameValue').value

  let date_ob = new Date()
  var dateDisplay = date_ob.getHours()+':'+ date_ob.getMinutes();

  // console.log('posting message')
  messageCounter++
  // console.log(text)
  fetch('http://localhost:8000/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: name, text:postValue, date:dateDisplay, id:messageCounter, room:roomNumber})
  })
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function getMessages() {
  fetch('http://localhost:8000/messages', {mode:'cors'})
    .then(response => response.json())
    .then(data => {
      let newList = messages(data)
      yo.update(el, newList)
  })
  console.log('getting Messages')
}

setInterval(function(){getMessages()},500)


function messages (items) {
  let newArray = items.filter( item => item.room === roomNumber )
  // console.log('this one', items)
  return yo`<ul>
    ${newArray.map(function (item) {
      // console.log(item.msg)
      return yo`<li>${item.username}: ${item.text} (${item.date})</li>`
    })}
  </ul>`
}


getMessages()

document.getElementById('chatHistory').appendChild(el)