import express from 'express';
import { pool } from './pool.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.get('/tasks', async (_req, res) => {
  const result = await pool.query('SELECT id, title, done, created_at FROM tasks ORDER BY created_at DESC');
  res.json(result.rows);
});

app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title?.trim()) {
    return res.status(400).json({ error: 'Le titre est requis' });
  }
  const result = await pool.query(
    'INSERT INTO tasks (title) VALUES ($1) RETURNING id, title, done, created_at',
    [title.trim()]
  );
  res.status(201).json(result.rows[0]);
});

app.patch('/tasks/:id', async (req, res) => {
  const { done } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING id, title, done, created_at',
    [done, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ error: 'Tâche introuvable' });
  res.json(result.rows[0]);
});

app.delete('/tasks/:id', async (req, res) => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Tâche introuvable' });
  res.status(204).send();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`api listening on port ${port}`));
