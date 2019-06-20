import { TodoStore } from './dl/todo-store.js';

export class Bootstrapper
{
    static run(fn) {
        document.addEventListener('DOMContentLoaded', fn);
    }

    static bootstrapTodoController(controllerClass, appNode) {
        const store = new TodoStore();
        const controller = new controllerClass(appNode, store);
        return controller;
    }
}