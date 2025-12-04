const VALID_STATUSES = ['todo', 'in_progress', 'done'];

function validateTask(body) {
  const errors = [];

  if (!body.title || typeof body.title !== 'string' || body.title.trim() === '') {
    errors.push('Title is required.');
  }

  if (!body.status || !VALID_STATUSES.includes(body.status)) {
    errors.push('Status must be one of: todo, in_progress, done.');
  }

  if (!body.dueDate) {
    errors.push('Due date/time is required.');
  } else if (isNaN(Date.parse(body.dueDate))) {
    errors.push('Invalid due date.');
  }

  return errors;
}

module.exports = { validateTask };
