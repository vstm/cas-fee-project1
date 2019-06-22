//import Datastore from 'nedb';

export class TodoStore
{
    /**
     * @param {Datastore} todoDb
     */
    constructor(todoDb) {
        console.log(todoDb);
        this.todoDb = todoDb;
    }

    getTodos() {
        return this.todoDb.find();
    }

    getTodo(id) {
        return this.todoDb.findOne({ _id: id});
    }

    createTodo(newData) {
        console.log(newData);
    }

    updateTodo(id, newData) {
        console.log(id, newData);
    }
}