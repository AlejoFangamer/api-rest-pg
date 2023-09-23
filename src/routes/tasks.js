import { Router } from "express";
import { pool } from "../db.js";

export const tasksRouter = Router();

tasksRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

tasksRouter.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const result = await pool.query(`SELECT * FROM tasks WHERE id_task = $1`, [
      id,
    ]);

    if (result.rows.length <= 0) {
      return res.status(404).json({ error: "No se encontró el elemento" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

tasksRouter.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const create = await pool.query(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [title],
    );
    res.status(201).json(create.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

tasksRouter.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const result = pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id_task = $3",
      [title, completed, id]
    );

    res.status(200).send(`Tarea con el ID: ${id} fue modificada exitosamente`)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

tasksRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await pool.query("DELETE FROM tasks WHERE id_task = $1", [id]);
    res.status(200).send(`Tarea con el ID: ${id} fue borrada exitosamente`)
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
