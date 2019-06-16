import { BaseController } from './base-controller.js';

const SORT_OPTIONS = {
  due: {
    label: 'Finish date',
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
    label: 'Created date',
    sort(a, b) {
      return a.created - b.created; // sort asc be created date -> newest first
    }
  },
  priority: {
    label: 'Priority',
    sort(a, b) {
      return b.priority - a.priority; // sort desc by prio -> highest first
    }
  },
};

const SORT_OPTIONS_DEFAULT = 'due';
const VIEW_SETTINGS_KEY = 'view-settings';

export class TodoListController extends BaseController {
  constructor(appNode, store) {
    super(appNode);
    this.store = store;
    this.viewSettings = Object.assign({sorting: SORT_OPTIONS_DEFAULT, showFinished: true}, this.loadViewSettings());
    this.styles = this.loadStyles();
  }

  loadStyles() {
    const styles = document.querySelectorAll('link[rel="alternate stylesheet"]');
    return [{id: "", title: "Standard"}, ...Array.from(styles).map((stylenode) => ({id: stylenode.id, title: stylenode.title}))]
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

    this.appNode.addEventListener("click", event => {
      if (event.target.matches("[data-done-checkbox]")) {
        this._doneClickHandler(event);
        return;
      }

      if (event.target.matches("[data-expand-action]")) {
        this._collapseClickHandle(event);
        return;
      }
    });

    this.appNode.addEventListener('change', event => {
      if (event.target.matches('.view-settings input')) {
        this._changeHandler(event);
        return;
      }

      if (event.target.matches('select[name="style"]')) {
        this._changeStyleHandler(event);
        return;        
      }
    });
  }

  renderView(todos) {
    const template = this.loadTemplate("todo-list-template");

    this.appNode.innerHTML = template({
      viewSettings: {...this.viewSettings, sortOptions: SORT_OPTIONS, styles: this.styles},
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
    const id = Number(event.target.dataset.doneCheckbox);

    const updated = this.store.patchTodo(id, (todo) => {
      todo.isDone = event.target.checked;
      return true;
    })

    if (updated) {
      this.renderView();
    }
  }

  _collapseClickHandle(event) {
    console.log(event);
    const todoItemElement = event.target.closest('.todo-item') ;

    if (!todoItemElement) {
      console.warn('Collapse click handler called but no .todo-item found');
    }

    todoItemElement.classList.toggle('todo-item--expanded');
  }

  _changeHandler(event) {
    if (event.target.matches('[name=showFinished]')) {
      this.viewSettings.showFinished = event.target.checked;
    } else if(event.target.matches('[name=sorting]')) {
      this.viewSettings.sorting = this.appNode.querySelector('.view-settings input[name=sorting]:checked').value;
    }

    this.saveViewSettings(this.viewSettings);
    this.renderView();
  }

  _changeStyleHandler(event) {
    this.switchStyle(event.target.value);
  }

  switchStyle(newStyle) {
    const styleNodes = Array.from(document.querySelectorAll('link[rel="alternate stylesheet"]'));

    for(let styleNode of styleNodes) {
      styleNode.disabled = true;
      if (styleNode.id === newStyle) {
        styleNode.disabled = false;
      }
    }
  }
}
