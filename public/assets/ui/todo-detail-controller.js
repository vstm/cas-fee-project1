import { BaseController } from './base-controller.js';
import { Todo } from '../bl/todo.js';

export class TodoDetailController extends BaseController {

    constructor(appNode, store) {
        super(appNode);
        this.store = store;
    }

    async editAction(params) {
        let todo;
        let editMode = false;
    
        if (params.get('edit')) {
            todo = await this.store.getTodo(params.get('edit'));
            editMode = true;
        } else {
            todo = new Todo();
        }
    
        const template = this.loadTemplate('todo-create-template');
    
        this.appNode.innerHTML = template({editMode, todo});
    
        this.appNode.querySelector('form').addEventListener('submit', event => this._formSubmitHandler(event, editMode, todo));
    }

    async _formSubmitHandler(event, editMode, todoObject) {
        event.preventDefault();
    
        // let todoObject = editMode ? todo : new Todo();
        const data = new FormData(event.target);
        for (let kvPair of data) {
            if (kvPair[0] === "due") {
                todoObject[kvPair[0]] = kvPair[1] && new Date(kvPair[1]);
                continue;
            }
            todoObject[kvPair[0]] = kvPair[1];
        }

        if (!editMode) {
            await this.store.addTodo(todoObject);
        } else {
            await this.store.updateTodo(todoObject);
        }
        
        window.location = 'index.html';
    }
}