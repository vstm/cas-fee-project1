import Datastore from 'nedb';
import { Todo } from '../model/todo.js';

export class TodoStore
{
    /**
     * @param {Datastore} todoDb
     */
    constructor(todoDb) {
        this.todoDb = todoDb;
    }

    async getTodos(sortBy = "due", showFinished = false) {
        return Array.from(await this.todoDb
                .cfind(showFinished ? {} : { $where: function() { return this.done === null} })
                .sort({[sortBy]: -1})
                .exec()
            ).map(json => Todo.fromDatabase(json));
    }

    async getTodo(id) {
        return Todo.fromDatabase(await this.todoDb.findOne({ _id: id }));
    }

    async createTodo(newData) {
        const todo = Todo.fromJson(newData);
        const newTodo = await this.todoDb.insert(todo);
        return newTodo._id;
    }

    async updateTodo(id, newData) {
        const todo = Todo.fromJson(newData);
        await this.todoDb.update({ _id: id }, { $set: todo });
    }

    async patchTodo(id, patch) {
        await this.todoDb.update({ _id: id }, { $set: Todo.transformInput(patch, true) })
    }
}