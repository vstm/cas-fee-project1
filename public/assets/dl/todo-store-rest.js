import { Todo } from "../bl/todo.js";

export const TODO_SERVICE_BASE_URL = "/todo";

export class TodoStoreRest {
  constructor(httpService, baseUrl = TODO_SERVICE_BASE_URL) {
    this.httpService = httpService;
    this.baseUrl = baseUrl;
  }

  async loadTodos() {
    return (await this.httpService.send("GET", this.baseUrl))
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
