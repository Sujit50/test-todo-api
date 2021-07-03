const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const todoCtrl = require('./todo.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/todo - Get list of todo */
  .get(todoCtrl.list)

  /** POST /api/todo - Create new user */
  .post(validate(paramValidation.createTodo), todoCtrl.create);

router.route('/:todoId')
  /** GET /api/todo/:todoId - Get user */
  .get(todoCtrl.get)

  /** PUT /api/todo/:todoId - Update user */
  .put(validate(paramValidation.updateTodo), todoCtrl.update)

  /** DELETE /api/todo/:todoId - Delete user */
  .delete(todoCtrl.remove);

router.route('/complete/:todoId')
  /** PUT /api/todo/:todoId - Update user */
  .put(validate(paramValidation.updateStatusTodo), todoCtrl.updateStatus);

router.route('/archive/:todoId')
  /** PUT /api/todo/:todoId - Update user */
  .put(validate(paramValidation.updateStatusTodo), todoCtrl.markArchive);

/** Load user when API with todoId route parameter is hit */
router.param('todoId', todoCtrl.load);

module.exports = router;
