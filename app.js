const toDoInput = document.querySelector('.todo-input');
const toDoButton = document.querySelector('.todo-button');
const toDoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

toDoButton.addEventListener('click', add);
document.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterToDo);
window.addEventListener('load', fetchFromLocalStorage);


function add(event) {
    event.preventDefault(); //Why!!!!!

    if (toDoInput.value == '') {

        toDoInput.setAttribute('placeholder', 'Type Your Tasks Here...');
    } else {
        saveToLocalStorage();

        toDoInput.value = '';
    };
};

function saveToLocalStorage() {
    let todos;
    if (!localStorage.getItem('box')) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('box'));
    };
    todos.push(toDoInput.value);
    localStorage.setItem('box', JSON.stringify(todos));

    fetchFromLocalStorage()
};

function fetchFromLocalStorage() {
    todos = JSON.parse(localStorage.getItem('box'));
    toDoList.innerHTML = '';
    for (i = 0; i < todos.length; i++) {
        toDoList.innerHTML += `<div class="todo"><li>${todos[i]}</li><button class="complete-button"><i class="fas fa-check"></i></button><button class="trash-button"><i class="fas fa-trash-alt"></i></button></div>`
    };
}

function deleteCheck(e) {
    const item = e.target;
    if (item.classList.contains('trash-button')) {
        const todo = e.target.parentElement;
        const element = e.target.previousElementSibling.previousElementSibling;
        todos = JSON.parse(localStorage.getItem('box'));

        for (i = 0; i < todos.length; i++) {
            if (todos[i] == element.textContent) {
                todos.splice(i, 1);
            };
        };
        
        localStorage.setItem('box', JSON.stringify(todos))
        todo.classList.add('fall');
        setTimeout(() => {
            todo.remove();
        }, 500);

    } else if (item.classList.contains('complete-button')) {
        const todo = e.target.parentElement;
        todo.classList.toggle('completed');

    };
};

function filterToDo(e) {
    const todos = document.querySelectorAll('.todo');
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
        }
    });
};