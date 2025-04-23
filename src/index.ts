import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import UsersRouters from "./routes/UsersRoutes";
import AuthRoutes from "./routes/authRoutes"


dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use((req, res, next) => {
  console.log(`Request recebido: ${req.method} ${req.url}`);
  next();
});

app.use("/users", UsersRouters);
app.use("/auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
