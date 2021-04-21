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