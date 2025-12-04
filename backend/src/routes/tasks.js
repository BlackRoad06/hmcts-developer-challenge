const express = require('express');
const router = express.Router();
const db = require('../db');
const { validateTask } = require('../validation');

router.post('/', (req, res) => {
  const { title, description = null, status, dueDate } = req.body;

  const errors = validateTask(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const sql = `
    INSERT INTO tasks (title, description, status, due_date)
    VALUES (?, ?, ?, ?)
  `;
  const params = [title.trim(), description, status, dueDate];

  db.run(sql, params, function (err) {
    if (err) return res.status(500).json({ error: 'Failed to create task.' });

    return res.status(201).json({
      id: this.lastID,
      title: title.trim(),
      description,
      status,
      dueDate
    });
  });
});

module.exports = router;
