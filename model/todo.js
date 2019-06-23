import { ModelTransformException } from '../exception/model-transform-exception.js';

const parseDate = date => {
    if (!date) {
        return null;
    }

    const parsedDate = Date.parse(date);

    if (isNaN(parsedDate)) {
        throw new Error(`The date "${date}" could not be parsed`);
    }

    return new Date(parsedDate);
}

export class Todo
{
    constructor() {
        this.created = new Date();
        this.title = '';
        this.description = '';
        this.done = null;
        this.due = null;
        this.priority = 1;
    }

    static fromDatabase(todoRow)
    {
        const result = new Todo();
        result.id = todoRow._id;
        result.created = todoRow.created;
        result.title = todoRow.title;
        result.description = todoRow.description;
        result.done = todoRow.done;
        result.due = todoRow.due;
        result.priority = todoRow.priority;
        return result;
    }

    static transformInput(rawInput, partial) {
        const result = {};

        const errors = [];

        if (!partial || typeof rawInput.title !== 'undefined') {
            if (typeof rawInput.title !== 'string') {
                errors.push({field: 'title', error: 'title must be a string'});
            }
    
            if (!rawInput.title) {
                errors.push({field: 'title', error: 'title can\'t be blank'});
            }
    
            result.title = rawInput.title;
        }

        if (!partial || typeof rawInput.description !== 'undefined') {
            if (typeof rawInput.description !== 'string') {
                errors.push({field: 'description', error: 'description must be a string'});
            }
    
            result.description = rawInput.description;
        }

        if (!partial || typeof rawInput.due !== 'undefined') {
            try {
                result.due = parseDate(rawInput.due);
            } catch(e) {
                errors.push({field: 'due', error: `${result.due} is not a valid date`});
            }
        }

        if (!partial || typeof rawInput.priority !== 'undefined') {
            result.priority = Number(rawInput.priority);

            if (isNaN(result.priority)) {
                errors.push({field: 'priority', error: `priority be a number`});
            }
    
            if (result.priority < 1 || result.priority > 5) {
                errors.push({field: 'priority', error: `priority must be between 1 and 5, ${result.priority} given`});
            }
        }

        // optional field
        if (typeof rawInput.isDone !== 'undefined') {
            if (typeof rawInput.isDone !== 'boolean') {
                errors.push({field: 'isDone', error: 'is done needs to be a boolean'});
            }

            const isDone = Boolean(rawInput.isDone)
            result.done = isDone ? new Date() : null;
        }

        if (errors.length > 0) {
            throw new ModelTransformException("Errors during ", errors);
        }

        return result;
    }

    static fromJson(todo) {
        const result = new Todo();

        const cleanInput = Todo.transformInput(todo, false);

        result.title = cleanInput.title;
        result.description = cleanInput.description;
        result.due = cleanInput.due;
        result.priority = cleanInput.priority;

        if (cleanInput.isDone) {
            result.done = new Date();
        }

        return result;
    }

    toJSON() {
        return {
            id: this.id,
            created: this.created,
            done: this.done,
            due: this.due,
            title: this.title,
            description: this.description,
            priority: this.priority,
        };
    }
}