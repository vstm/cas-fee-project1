import { Todo } from '../bl/todo.js';

const TODO_DATA_KEY = "todo-data";

export class TodoStore {
  loadTodos() {
    const todos = window.localStorage.getItem(TODO_DATA_KEY);

    if (todos === null) {
      return [];
    }

    try {
      return JSON.parse(todos).map(todo => Todo.fromJson(todo));
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  storeTodos(todos) {
    window.localStorage.setItem(
      TODO_DATA_KEY,
      JSON.stringify(todos.map(todo => todo.toJSON()))
    );
  }

  removeTodo(idToRemove) {
    const todos = this.loadTodos();

    const newTodos = todos.filter(todo => todo.id !== idToRemove);

    this.storeTodos(newTodos);

    return todos.length > newTodos.length;
  }

  getTodo(todoId) {
    const todos = this.loadTodos();

    for (let todo of todos) {
      if (todo.id === todoId) {
        return todo;
      }
    }

    return null;
  }

  addTodo(todo) {
    const todos = this.loadTodos();

    todos.push(todo);

    this.storeTodos(todos);
  }

  updateTodo(todo) {
    const todos = this.loadTodos();

    let updated = false;
    for (let index in todos) {
      if (todos[index].id === todo.id) {
        updated = true;
        todos[index] = todo;
        break;
      }
    }

    if (updated) {
      this.storeTodos(todos);
    }

    return updated;
  }

  /**
   * @param {Number} id
   * @param {function(Todo):boolean} patchFn
   */
  patchTodo(id, patchFn) {
    const todos = this.loadTodos();

    let updated = false;
    for (let index in todos) {
      if (todos[index].id === id) {
        patchFn(todos[index]);
        updated = true;
        break;
      }
    }

    if (updated) {
      this.storeTodos(todos);
    }

    return updated;
  }
}
