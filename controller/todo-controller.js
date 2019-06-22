
export class TodoController
{
  constructor(todoStore) {
    this.todoStore = todoStore;
  }

  async getTodos(req, res) {
    res.json(await this.todoStore.getTodos());
  }

  async getTodo(req, res) {
    res.json(await this.todoStore.getTodo(req.params.id));
  }

  async createTodo(req, res) {
    const id = await this.todoStore.createTodo(req.body);
    const newTodoLink = `/todo/${id}`;
    res.status(201).append('Location', newTodoLink);
    res.json({created: newTodoLink});
  }

  async updateTodo(req, res) {
    await this.todoStore.updateTodo(req.params.id, req.body);
    res.status(204).end();
  }
}
