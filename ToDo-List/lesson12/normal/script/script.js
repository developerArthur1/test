'use strict';
const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed'),
    labelError = document.querySelector('.error'),
    parsedArray = JSON.parse(localStorage.getItem('todoData'));

    let todoData = [];

if (parsedArray)
{
    for(let i = 0; i < parsedArray.length; i++)
    {
        todoData.push(parsedArray[i]);
    };
    render();
}


function render () {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' + 
        '</div>';

        if (item.completed)
        {
            todoCompleted.append(li);
        }
        else
        {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete'),
              btnRemoveLi = li.querySelector('.todo-remove');
            
        btnRemoveLi.addEventListener('click', function () {
            todoData.splice(index, 1);
            localStorage.setItem('todoData', JSON.stringify(todoData));  
            render();
        })

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            localStorage.setItem('todoData', JSON.stringify(todoData));  
            render();
        });
    })
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim())
    {
        labelError.style.display = 'none';

        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);
        headerInput.value = '';
        render();
        localStorage.setItem('todoData', JSON.stringify(todoData));  
    }
    else
    {
        headerInput.value = '';
        labelError.style.display = 'inline-block';
    }
});

render();