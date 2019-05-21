'use strict';

const { Router } = require('express');

const { create, update } = require('./schema');
const { validateRequestSchema } = require('../../utils/index');

const router = new Router();

/**
 * Register the routes to the respective handlers
 * @param {{ userController: UserController}}
 * @returns {Express.Router}
 */
function getRoutes({ userController }) {
  return () => {
    router
      .get('/:id', userController.getById.bind(userController))
      .put('/:id', validateRequestSchema(update, 'body'),
        userController.getOverall.bind(userController));

    router
      .get('/', userController.getAll.bind(userController))
      .post('/', validateRequestSchema(create, 'body'),
        userController.create.bind(userController));


    return router;
  };
}

module.exports = getRoutes;

