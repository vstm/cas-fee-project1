const SORT_OPTIONS = {
  due: {
    label: 'By finish date',
    sort(a, b) {
      // todos without due date have lower prio
      if (a.due === null && b.due === null) {
        return 0;
      } else if(a.due === null) {
        return 1;
      } else if(b.due === null) {
        return -1;
      }

      return a.due - b.due; // sort asc by due date -> closest first
    }
  },
  created: {
    label: 'By created date',
    sort(a, b) {
      return a.created - b.created; // sort asc be created date -> newest first
    }
  },
  priority: {
    label: 'By priority',
    sort(a, b) {
      return b.priority - a.priority; // sort desc by prio -> highest first
    }
  },
};

const SORT_OPTIONS_DEFAULT = 'due';
const VIEW_SETTINGS_KEY = 'view-settings';

class TodoListController extends BaseController {
  constructor(appNode, store) {
    super(appNode);
    this.store = store;
    this.viewSettings = Object.assign({sorting: SORT_OPTIONS_DEFAULT, showFinished: true}, this.loadViewSettings());
  }

  saveViewSettings(settings) {
    window.localStorage.setItem(VIEW_SETTINGS_KEY, JSON.stringify(settings));
  }

  loadViewSettings() {
    try {
      const str = window.localStorage.getItem(VIEW_SETTINGS_KEY);

      if (!str) {
        return {};
      }

      return JSON.parse(str);
    } catch (e) {
      console.error(e);
      return {};
    }
  }

  listAction() {
    this.renderView();

    this.appNode.addEventListener("click", event =>
      this._doneClickHandler(event)
    );

    this.appNode.addEventListener('change', event => this._changeHandler(event))
  }

  renderView(todos) {
    const template = this.loadTemplate("todo-list-template");

    this.appNode.innerHTML = template({
      viewSettings: {...this.viewSettings, sortOptions: SORT_OPTIONS},
      todos: this._applyViewSettings(todos || this.store.loadTodos())
    });
  }

  _applyViewSettings(todos) {
    const sortOption = SORT_OPTIONS[this.viewSettings.sorting] || SORT_OPTIONS[SORT_OPTIONS_DEFAULT];

    const result = todos.sort(sortOption.sort);

    if (this.viewSettings.showFinished) {
      return result;
    }

    return result.filter(todo => !todo.isDone);
  }

  _doneClickHandler(event) {
    if (!event.target.matches("[data-done-checkbox]")) {
      return;
    }

    const id = Number(event.target.dataset.doneCheckbox);

    const updated = this.store.patchTodo(id, (todo) => {
      todo.isDone = event.target.checked;
      return true;
    })

    if (updated) {
      this.renderView();
    }
  }

  _changeHandler(event) {
    if (!event.target.matches('.view-settings input')) {
      return;
    }

    if (event.target.matches('[name=showFinished]')) {
      this.viewSettings.showFinished = event.target.checked;
    } else if(event.target.matches('[name=sorting]')) {
      this.viewSettings.sorting = this.appNode.querySelector('.view-settings input[name=sorting]:checked').value;
    }

    this.saveViewSettings(this.viewSettings);
    this.renderView();
  }
}
