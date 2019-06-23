import { TodoStore } from '../model/todo-store.js';
import { ModelTransformException } from '../exception/model-transform-exception.js';

export class TodoController
{
  /**
   * 
   * @param {TodoStore} todoStore 
   */
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
    try {
      const id = await this.todoStore.createTodo(req.body);
      const newTodoLink = `/todo/${id}`;
      res.status(201).append('Location', newTodoLink);
      res.json({created: newTodoLink});
    } catch (e) {
      if (e instanceof ModelTransformException) {
        res.status(400).json(e.errors);
        return;
      }
      throw e;
    }
  }

  async updateTodo(req, res) {
    try {
      await this.todoStore.updateTodo(req.params.id, req.body);
      res.status(204).end();
    } catch(e) {
      if (e instanceof ModelTransformException) {
        res.status(400).json(e.errors);
        return;
      }
      throw e;
    }
  }

  async patchTodo(req, res) {
    try {
      await this.todoStore.patchTodo(req.params.id, req.body);
      res.status(204).end();
    } catch(e) {
      if (e instanceof ModelTransformException) {
        res.status(400).json(e.errors);
        return;
      }
      throw e;
    }
  }
}
