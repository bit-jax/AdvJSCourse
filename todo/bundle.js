(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.getElementById('add').onclick = function createTodo () {
    let newItem = document.getElementById('textbox').value
    let item = document.createElement('div')
    item.id = 'todoItem'
    item.className = 'incomplete'

    let completeItem = document.createElement('button')
    completeItem.innerText = 'Complete'
    completeItem.onclick = function () {
        completeItem.parentNode.className = 'complete'
        document.getElementById('completed').appendChild(completeItem.parentElement)
        completeItem.remove()
    }

    let deleteItem = document.createElement('button')
    deleteItem.innerText = 'Delete'
    deleteItem.onclick = function () {
        deleteItem.parentElement.remove()
    }

    let itemText = document.createElement('p')
    itemText.innerText = newItem
    
    document.getElementById('todos').appendChild(item)
    item.appendChild(completeItem)
    item.appendChild(deleteItem)
    item.appendChild(itemText)
    document.getElementById('textbox').value = ''
}
},{}],2:[function(require,module,exports){

document.getElementById('showCompleted').onclick = function() {
    document.querySelectorAll('.complete').forEach(function(el) {
        el.style.display = 'block'
    })
    document.querySelectorAll('.incomplete').forEach(function(el) {
        el.style.display = 'none'
    })
}

document.getElementById('showIncomplete').onclick = function() {
    document.querySelectorAll('.incomplete').forEach(function(el) {
        el.style.display = 'block'
    })
    document.querySelectorAll('.complete').forEach(function(el) {
        el.style.display = 'none'
    })
}

document.getElementById('showAll').onclick = function () {
    document.querySelectorAll('#todoItem').forEach(function(el) {
        el.style.display = 'block'
    })
}
},{}]},{},[1,2]);
