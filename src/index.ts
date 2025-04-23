import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/exempleroutes.js";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/exemple", router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
