import { BaseController } from './base-controller.js';

const SORT_OPTIONS = {
  due: {
    label: 'Finish date',
  },
  created: {
    label: 'Created date',
  },
  priority: {
    label: 'Priority',
  },
};

const SORT_OPTIONS_DEFAULT = 'due';


export class TodoListController extends BaseController {
  constructor(appNode, store) {
    super(appNode);
    this.store = store;
    this.viewSettings = Object.assign({sorting: SORT_OPTIONS_DEFAULT, showFinished: true}, this.viewSettings);
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

  async renderView() {
    const template = this.loadTemplate("todo-list-template");

    const sorting = SORT_OPTIONS.hasOwnProperty(this.viewSettings.sorting) ? this.viewSettings.sorting : SORT_OPTIONS_DEFAULT;

    this.appNode.innerHTML = template({
      viewSettings: {...this.viewSettings, sortOptions: SORT_OPTIONS, styles: this.styles},
      todos: await this.store.loadTodos(sorting, this.viewSettings.showFinished)
    });
  }

  async _doneClickHandler(event) {
    await this.store.setTodoDoneStatus(event.target.dataset.doneCheckbox, event.target.checked);
    this.renderView();
  }

  _collapseClickHandle(event) {
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
    this.saveViewSettings(this.viewSettings);
  }
}
