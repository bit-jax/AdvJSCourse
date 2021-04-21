
// show complete hide incomplete
document.getElementById('showCompleted').onclick = function() {
    document.querySelectorAll('.complete').forEach(function(el) {
        el.style.display = 'block'
    })
    document.querySelectorAll('.incomplete').forEach(function(el) {
        el.style.display = 'none'
    })
}

// show incomplete hide complete
document.getElementById('showIncomplete').onclick = function() {
    document.querySelectorAll('.incomplete').forEach(function(el) {
        el.style.display = 'block'
    })
    document.querySelectorAll('.complete').forEach(function(el) {
        el.style.display = 'none'
    })
}

// shows all
document.getElementById('showAll').onclick = function () {
    document.querySelectorAll('#todoItem').forEach(function(el) {
        el.style.display = 'block'
    })
}