class TodoDetailController extends BaseController {

    constructor(appNode, store) {
        super(appNode);
        this.store = store;
    }

    editAction(params) {
        let todo;
        let editMode = false;
    
        if (params.get('edit')) {
            todo = this.store.getTodo(Number(params.get('edit')));
            editMode = true;
        } else {
            todo = new Todo();
        }
    
        const template = this.loadTemplate('todo-create-template');
    
        this.appNode.innerHTML = template({editMode, todo});
    
        this.appNode.querySelector('form').addEventListener('submit', event => this._formSubmitHandler(event, editMode, todo));
    }

    _formSubmitHandler(event, editMode, todoObject) {
        event.preventDefault();
    
        // let todoObject = editMode ? todo : new Todo();
        const data = new FormData(event.target);
        for (let kvPair of data) {
            if (kvPair[0] === "due") {
                todoObject[kvPair[0]] = new Date(kvPair[1]);
                continue;
            }
            todoObject[kvPair[0]] = kvPair[1];
        }

        if (!editMode) {
            this.store.addTodo(todoObject);
        } else {
            this.store.updateTodo(todoObject);
        }
        
        window.location = 'index.html';
    }
}