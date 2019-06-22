import express from 'express';
import path from 'path';
import logger from 'morgan';
import Datastore from 'nedb-promise';

import TodoController from './controller/todo-controller.js';
import TodoStore from './model/todo-store.js';

export const app = express();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const dbName = path.join(__dirname, '/test.db');

const db = new Datastore({filename: dbName, autoload: true})
const store = new TodoStore(db);
const controller  = new TodoController(store);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
