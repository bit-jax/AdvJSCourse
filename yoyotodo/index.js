var yo = require('yo-yo')

let textbox = document.getElementById('textbox')
let add = document.getElementById('add')
let showCompleted = document.getElementById('showCompleted')
let showIncomplete = document.getElementById('showIncomplete')
let showAll = document.getElementById('showAll')
let completed = document.getElementById('completed')
let incomplete = document.getElementById('incomplete')

var todoList = []
var completeList = []

add.onclick = function () {
    todoList.push(textbox.value)
    textbox.value = ''
    reRenderList(incomplete)
    incomplete.appendChild(list(todoList,deleteItem,completeItem))
}

function reRenderList (theList) {
    while (theList.firstChild) {
        theList.removeChild(theList.firstChild)
    }
}

function list (items, deleteItem, completeItem=null) {
    return yo`<ul>
            ${items.map(function (item) {
                return yo`<li id=${item}>${item}
                        <button id='completeButton' onclick=${completeItem}>Complete</button>
                        <button id='deleteButton' onclick=${deleteItem}>Delete</button>
                    </li>`
            })}
            </ul>`
}

function deleteItem () {
    let button = document.getElementById('deleteButton')
    button.parentElement.remove()
    todolist.forEach(element => {
        if (element === button.parentElement.id) {
            todoList.splice(element,1)
        }
    });
    completeList.forEach(element => {
        if (element === button.parentElement.id) {
            completeList.splice(element,1)
        }
    });
}

function completeItem () {
    let button = document.getElementById('completeButton')
    button.parentElement.remove()
    todolist.forEach(element => {
        if (element === button.parentElement.id) {
            completeList.push(todoList[element])
            todoList.splice(element,1)
        }
    });
    complete.appendChild(list(completeList,deleteItem,completeItem))

}


// var yo = require('yo-yo')

// var numbers = [] // start empty
// var el = list(numbers, update)

// function list (items, onclick) {
//   return yo`<div>
//     Random Numbers
//     <ul>
//       ${items.map(function (item) {
//         return yo`<li>${item}</li>`
//       })}
//     </ul>
//     <button onclick=${onclick}>Add Random Number</button>
//   </div>`
// }

// function update () {
//   // add a new random number to our list
//   numbers.push(Math.random())
  
//   // construct a new list and efficiently diff+morph it into the one in the DOM
//   var newList = list(numbers, update)
//   yo.update(el, newList)
// }

// document.body.appendChild(el)





// todoList.forEach(function(el){
//     if (el === item) {
//         todoList.splice(el, 1)
//     }
//     console.log(item)
// })

// todoList.forEach(function(el){
//     if (el === item) {
//         completeList.push(el)
//         todoList.splice(el,1)
//     }
//     console.log('complete')
// })




// var yo = require('yo-yo')

// var el = list([
//   'grizzly',
//   'polar',
//   'brown'
// ])

// function list (items) {
//   return yo`<ul>
//     ${items.map(function (item) {
//       return yo`<li>${item}</li>`
//     })}
//   </ul>`
// }

// document.body.appendChild(el)