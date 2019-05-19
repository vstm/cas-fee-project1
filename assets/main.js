Handlebars.registerHelper("checkedIf", function(fieldValue, value) {
    return (value === undefined || typeof value === "object" ? fieldValue : (fieldValue === value)) ? "checked" : "";
});

Handlebars.registerHelper("formatDate", function(datetime, nullValue) {
    if (!datetime) {
        return nullValue;
    }
    
    return moment(datetime).fromNow();
});

Handlebars.registerHelper("formatEditDate", function(datetime) {
    if (!datetime) {
        return "";
    }
    
    return moment(datetime).format('YYYY-MM-DD');
});

Handlebars.registerHelper('formatPriority', function(value, sign) {
    return sign.repeat(value);
});

const parseDate = date => {
    if (!date || (typeof date === 'number' && isNaN(date))) {
        return null;
    }

    const parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
        return null;
    }

    return new Date(parsedDate);
}

class Todo {
    constructor() {
        this.id = Date.now();
        this.created = new Date();
        this.title = '';
        this.description = '';
        this.done = null;
        this.due = null;
        this.priority = 1;
    }

    static fromJson(todo) {
        const result = new Todo();
        result.id = Number(todo.id);
        result.created = parseDate(todo.created);
        result.title = todo.title;
        result.description = todo.description;
        result.done = parseDate(todo.done);
        result.due = parseDate(todo.due);
        result.priority = Number(todo.priority);

        return result;
    }

    toJSON() {
        return {
            id: this.id,
            created: this.created.toISOString(),
            done: this.done ? this.done.toISOString() : null,
            due: this.due ? this.due.toISOString() : null,
            title: this.title,
            description: this.description,
            priority: this.priority,
        };
    }

    get isDone() {
        return this.done !== null;
    }

    set isDone(value) {
        this.done = value ? new Date() : null;
    }
}

function loadTemplate(templateId) 
{
    const templateNode = document.getElementById(templateId);
    if (!templateNode) {
        throw new Error(`Template with id "${templateId}" not found`);
    }
    return Handlebars.compile(templateNode.innerHTML);
}

function todoListController(appNode)
{
    if (!appNode) {
        throw new Error("Invalid app node given");
    }

    const template = loadTemplate('todo-list-template');

    appNode.innerHTML = template({
        'todos': loadTodos(),
    });

    appNode.addEventListener('click', function(event) {
        if (!event.target.matches('[data-done-checkbox]')) {
            return;
        }

        const id = Number(event.target.dataset.doneCheckbox);

        const todos = loadTodos();

        let updated = false;
        for (let todo of todos) {
            if (todo.id === id) {
                todo.isDone = event.target.checked;
                updated = updateTodo(todo);
                break;
            }
        }

        if (updated) {
            appNode.innerHTML = template({
                'todos': todos,
            });
        }
    });
}

function todoCreateController(appNode, params)
{
    if (!appNode) {
        throw new Error("Invalid app node given");
    }

    let todo;
    let editMode = false;

    if (params.get('edit')) {
        todo = getTodo(Number(params.get('edit')));
        editMode = true;
    } else {
        todo = new Todo();
    }

    const template = loadTemplate('todo-create-template');

    appNode.innerHTML = template({editMode, todo});

    appNode.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();

        let todoObject = editMode ? todo : new Todo();
        const data = new FormData(event.target);
        for (let kvPair of data) {
            if (kvPair[0] === "due") {
                todoObject[kvPair[0]] = new Date(kvPair[1]);
                continue;
            }
            todoObject[kvPair[0]] = kvPair[1];
        }

        if (!editMode) {
            addTodo(todoObject);
        } else {
            updateTodo(todoObject);
        }
        
        window.location = 'index.html';
    });
}

const TODO_DATA_KEY = 'todo-data';

function loadTodos() {
    const todos = window.localStorage.getItem(TODO_DATA_KEY);

    if (todos === null) {
        return [];
    }

    try {
        return JSON.parse(todos).map(todo => Todo.fromJson(todo));
    } catch(e) {
        console.error(e);

        return [];
    }
}

function storeTodos(todos) {
    window.localStorage.setItem(TODO_DATA_KEY, JSON.stringify(todos.map(todo => todo.toJSON())));
}

function removeTodo(idToRemove) {
    const todos = loadTodos();

    const newTodos = todos.filter((todo) => todo.id !== idToRemove);

    storeTodos(newTodos);

    return todos.length > newTodos.length;
}

function getTodo(todoId) {
    const todos = loadTodos();

    for(let todo of todos) {
        if (todo.id === todoId) {
            return todo;
        }
    }

    return null;   
}

function addTodo(todo) {
    const todos = loadTodos();

    todos.push(todo);

    storeTodos(todos);
}

function updateTodo(todo) {
    const todos = loadTodos();

    let updated = false;
    for (let index in todos) {
        if (todos[index].id === todo.id) {
            updated = true;
            todos[index] = todo;
            break;
        }
    }

    if (updated) {
        storeTodos(todos);
    }

    return updated;
}