import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB Atlas conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar com o MongoDB Atlas:", error);
    process.exit(1);
  }
};
