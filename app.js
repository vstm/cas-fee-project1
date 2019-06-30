import express from 'express';
import path from 'path';
import logger from 'morgan';
import Datastore from 'nedb-promise';

import { TodoController } from './controller/todo-controller.js';
import { TodoStore } from './model/todo-store.js';
import { todoRoutes } from './routes/todo.js';

export const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const dbName = path.join(__dirname, 'test.db');

const todoDb = new Datastore({filename: dbName, autoload: true})
const todoStore = new TodoStore(todoDb);
const todoController  = new TodoController(todoStore);

app.use('/lib', express.static(path.join(__dirname, 'node_modules/handlebars/dist')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules/moment/min')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/todo', todoRoutes(todoController))