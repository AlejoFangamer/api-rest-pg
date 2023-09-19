import express from "express";
import cors from "cors";
import "dotenv/config";
import { tasksRouter } from "./routes/tasks.js";

const app = express();
const port = process.env.PORT ?? 5000;

app.use(express.json());
app.use(cors());

app.use("/tasks", tasksRouter);

app.use((req,res) => {
  res.status(404).json({error:"Hola"});
})

app.listen(port, () => {
  console.log(`Servidor Escuchando en el puerto: http://localhost:${port}`);
});
