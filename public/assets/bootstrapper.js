import { TodoStore } from './dl/todo-store.js';
import { TodoStoreRest } from './dl/todo-store-rest.js';
import { HttpService } from './services/http-service.js';

export class Bootstrapper
{
    static run(fn) {
        document.addEventListener('DOMContentLoaded', fn);
    }

    static bootstrapTodoController(controllerClass, appNode) {
        const httpService = new HttpService();
        const store = new TodoStoreRest(httpService);
        const controller = new controllerClass(appNode, store);
        return controller;
    }
}