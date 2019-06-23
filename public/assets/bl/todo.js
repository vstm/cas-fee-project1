const parseDate = date => {
    if (!date || (typeof date === 'number' && isNaN(date))) {
        return null;
    }

    const parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
        return null;
    }

    return new Date(parsedDate);
}

export class Todo {
    constructor() {
        this.id = undefined;
        this.created = new Date();
        this.title = '';
        this.description = '';
        this.done = null;
        this.due = null;
        this.priority = 1;
    }

    static fromJson(todo) {
        const result = new Todo();
        result.id = todo.id;
        result.created = parseDate(todo.created);
        result.title = todo.title;
        result.description = todo.description;
        result.done = parseDate(todo.done);
        result.due = parseDate(todo.due);
        result.priority = Number(todo.priority);

        return result;
    }

    toJSON() {
        return {
            id: this.id,
            created: this.created.toISOString(),
            done: this.done ? this.done.toISOString() : null,
            due: this.due ? this.due.toISOString() : null,
            title: this.title,
            description: this.description,
            priority: this.priority,
        };
    }

    get isDone() {
        return this.done !== null;
    }

    set isDone(value) {
        this.done = value ? new Date() : null;
    }
}