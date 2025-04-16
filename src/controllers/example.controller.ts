import { Request, Response } from "express"; 
import Example from "../models/ModelExemple";


export const getAllExamples = async (req: Request, res: Response): Promise<void> => {
  try {
    const examples = await Example.find();
    res.status(200).json(examples);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar exemplos", error });
  }
};


export const createExample = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;

  try {
    const newExample = new Example({ name, description });
    await newExample.save();
    res.status(201).json(newExample);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar exemplo", error });
  }
};
