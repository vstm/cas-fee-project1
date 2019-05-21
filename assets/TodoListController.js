class TodoListController extends BaseController {
  constructor(appNode, store) {
    super(appNode);
    this.store = store;
  }

  listAction() {
    this.renderView();

    this.appNode.addEventListener("click", event =>
      this._doneClickHandler(event)
    );
  }

  renderView(todos) {
    const template = this.loadTemplate("todo-list-template");

    this.appNode.innerHTML = template({
      todos: todos || this.store.loadTodos()
    });
  }

  _doneClickHandler(event) {
    if (!event.target.matches("[data-done-checkbox]")) {
      return;
    }

    const id = Number(event.target.dataset.doneCheckbox);

    const todos = this.store.loadTodos();

    let updated = false;
    for (let todo of todos) {
      if (todo.id === id) {
        todo.isDone = event.target.checked;
        updated = this.store.updateTodo(todo);
        break;
      }
    }

    if (updated) {
      this.renderView(todos);
    }
  }
}
