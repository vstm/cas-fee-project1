import { Todo } from "../bl/todo.js";

export const TODO_SERVICE_BASE_URL = "/todo";

export class TodoStoreRest {
  constructor(httpService, baseUrl = TODO_SERVICE_BASE_URL) {
    this.httpService = httpService;
    this.baseUrl = baseUrl;
  }

  loadTodos() {
    return this.httpService
      .send("GET", this.baseUrl)
      .map(todo => Todo.fromJson(todo));
  }

  removeTodo(id) {
    throw new Error("Deleting TODO's not supported yet");
  }

  getTodo(todoId) {
    return Todo.fromJson(
      this.httpService.send("GET", `${this.baseUrl}/${todoId}`)
    );
  }

  addTodo(todo) {
    this.httpService.send("POST", `${this.baseUrl}`, todo);
  }

  updateTodo(todo) {
    this.httpService.send("PUT", `${this.baseUrl}/${todo.id}`, todo);
  }

  /**
   * @param {Number} id
   * @param {function(Todo):boolean} patchFn
   */
  patchTodo(id, patchFn) {
    throw new Error("Pathicng TODO's not supported yet");
  }
}
