const Joi = require('joi');

module.exports = {
  // POST /api/todo
  createTodo: {
    body: {
      task: Joi.string().required(),
    }
  },

  // UPDATE /api/todo/:todoID
  updateTodo: {
    body: {
      task: Joi.string().required(),
    },
    params: {
      todoId: Joi.string().hex().required()
    }
  },

  // UPDATE /api/todo/:todoID
  updateStatusTodo: {
    params: {
      todoId: Joi.string().hex().required()
    }
  },
};
