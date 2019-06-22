import Datastore from 'nedb';

export class TodoStore
{
    /**
     * @param {Datastore} todoDb
     */
    constructor(todoDb) {
        this.todoDb = todoDb;
    }

    async getTodos() {
        return await this.todoDb.find({});
    }

    async getTodo(id) {
        return await this.todoDb.findOne({ _id: id });
    }

    async createTodo(newData) {
        const newTodo = await this.todoDb.insert(newData);
        return newTodo._id;
    }

    async updateTodo(id, newData) {
        await this.todoDb.update({ _id: id }, { $set: newData });
    }
}