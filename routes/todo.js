import express from "express";
import {TodoController} from '../controller/todo-controller.js';

const asyncRoute = (handler) => 
    (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

/**
 * @param {TodoController} controller 
 */
export const todoRoutes = controller => {
  const router = express.Router();

  router.get('/', asyncRoute(controller.getTodos.bind(controller)));
  router.post('/', asyncRoute(controller.createTodo.bind(controller)));

  router.get('/:id', asyncRoute(controller.getTodo.bind(controller)));
  router.put('/:id', asyncRoute(controller.updateTodo.bind(controller)));

  return router;
};
