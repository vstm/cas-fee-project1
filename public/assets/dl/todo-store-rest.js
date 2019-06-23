import { Todo } from "../bl/todo.js";

export const TODO_SERVICE_BASE_URL = "/todo";

export class TodoStoreRest {
  constructor(httpService, baseUrl = TODO_SERVICE_BASE_URL) {
    this.httpService = httpService;
    this.baseUrl = baseUrl;
  }

  _buildQs(options) {
    return Object.entries(options).map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
  }

  async loadTodos(sort = 'due', showFinished) {
    const qs = this._buildQs({ sort, showFinished: showFinished ? 'true' : 'false' });
    return (await this.httpService.send("GET", this.baseUrl + '?' + qs))
      .map(todo => Todo.fromJson(todo));
  }

  async removeTodo() {
    throw new Error("Deleting TODO's not supported yet");
  }

  async getTodo(todoId) {
    return Todo.fromJson(
      await this.httpService.send("GET", `${this.baseUrl}/${todoId}`)
    );
  }

  async addTodo(todo) {
    await this.httpService.send("POST", `${this.baseUrl}`, todo);
  }

  async updateTodo(todo) {
    await this.httpService.send("PUT", `${this.baseUrl}/${todo.id}`, todo);
  }

  async setTodoDoneStatus(id, status) {
    await this.httpService.send('PATCH', `${this.baseUrl}/${id}`, {isDone: status});
  }
}
