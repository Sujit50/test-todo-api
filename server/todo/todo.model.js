const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Todo Schema
 */
const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['INCOMPLETE', 'COMPLETE'],
    default: 'INCOMPLETE'
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TodoSchema.method({
});

/**
 * Statics
 */
TodoSchema.statics = {
  /**
   * Get Todo
   * @param {ObjectId} id - The objectId of todo.
   * @returns {Promise<Todo, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((todo) => {
        if (todo) {
          return todo;
        }
        const err = new APIError('No such data exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List todo in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Todo to be skipped.
   * @returns {Promise<Todo[]>}
   */
  list({ skip = 0, limit = 50, status } = {}) {
    const todo = this.find();
    if (status) {
      todo.where('status').equals(status);
    }
    todo.sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
    return todo;
  }
};

/**
 * @typedef Todo
 */
module.exports = mongoose.model('Todo', TodoSchema);
