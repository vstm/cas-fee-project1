
export class TodoController
{

  constructor(todoStore) {
    this.todoStore = todoStore;
  }

  getTodos(req, res) {
    res.json(this.todoStore.getTodos());
  }

  getTodo(req, res) {
    res.json(this.todoStore.getTodo(req.params.id));
  }


}
