import { Router } from "express";
import { pool } from "../db.js";

export const tasksRouter  = Router();

tasksRouter.get('/',async (req,res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }  
});

tasksRouter.get('/:id',async (req,res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM tasks WHERE id_task = ${id}`);
    if (result.rows.length <= 0) {
      return res.status(404).json({error: "No se encontró el elemento"})
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: err.message});
  }  
});