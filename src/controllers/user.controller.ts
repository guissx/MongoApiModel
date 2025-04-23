import { Request, Response } from "express";
import User from "../models/UserModel";

// GET ALL (ignora deletados)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ isDeleted: false }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários", error });
  }
};

// GET BY ID (ignora deletados)
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.params.id, isDeleted: false }).select("-password");
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuário", error });
  }
};

// CREATE
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  try {
    const newUser = new User({ name, password });
    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário", error });
  }
};

// UPDATE 
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { name, password, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "Usuário não encontrado ou está deletado" });
    } else {
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar usuário", error });
  }
};

// SOFT DELETE
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedUser = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true, updatedAt: new Date() },
      { new: true }
    );

    if (!deletedUser) {
      res.status(404).json({ message: "Usuário não encontrado ou já deletado" });
    } else {
      res.status(200).json({ message: "Usuário marcado como deletado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar usuário", error });
  }
};


export const restoreUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const restoredUser = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: true },
      { isDeleted: false, updatedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!restoredUser) {
      res.status(404).json({ message: "Usuário não encontrado ou não está deletado" });
    } else {
      res.status(200).json(restoredUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao restaurar usuário", error });
  }
};
