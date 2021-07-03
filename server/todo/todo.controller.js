const Todo = require('./todo.model');

/**
 * Load todo and append to req.
 */
function load(req, res, next, id) {
  Todo.get(id)
    .then((todo) => {
      req.todo = todo; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get todo
 * @returns {Todo}
 */
function get(req, res) {
  return res.json(req.todo);
}

/**
 * Create new todo
 * @property {string} req.body.todo
 * @returns {Todo}
 */
function create(req, res, next) {
  const todo = new Todo({ task: req.body.task });

  todo.save()
    .then(savedTask => res.json(savedTask))
    .catch(e => next(e));
}

/**
 * Update existing todo
 * @property {string} req.body.task
 * @returns {Todo}
 */
function update(req, res, next) {
  const todo = req.todo;
  todo.task = req.body.task;

  todo.save()
    .then(savedTask => res.json(savedTask))
    .catch(e => next(e));
}

/**
 * Update existing todo
 * @property {string} req.body.task
 * @returns {Todo}
 */
function updateStatus(req, res, next) {
  const todo = req.todo;
  const statusMap = { COMPLETE: 'INCOMPLETE', INCOMPLETE: 'COMPLETE' };
  const currentStatus = req.todo.status;
  const newStatus = statusMap[currentStatus];
  todo.status = newStatus;

  todo.save()
    .then(savedTask => res.json(savedTask))
    .catch(e => next(e));
}

/**
 * Update existing todo
 * @property {string} req.body.task
 * @returns {Todo}
 */
function markArchive(req, res, next) {
  const todo = req.todo;
  const statusMap = { true: false, false: true };
  const currentStatus = req.todo.archived;
  const newStatus = statusMap[currentStatus];
  todo.archived = newStatus;

  todo.save()
    .then(savedTask => res.json(savedTask))
    .catch(e => next(e));
}

/**
 * Get todo list.
 * @property {number} req.query.skip - Number of todo to be skipped.
 * @property {number} req.query.limit - Limit number of todo to be returned.
 * @returns {Todo[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0, status } = req.query;
  Todo.list({ limit, skip, status })
    .then(todo => res.json(todo))
    .catch(e => next(e));
}

/**
 * Delete todo.
 * @returns {Todo}
 */
function remove(req, res, next) {
  const todo = req.todo;
  todo.remove()
    .then(deletedTodo => res.json(deletedTodo))
    .catch(e => next(e));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  updateStatus,
  markArchive,
};
