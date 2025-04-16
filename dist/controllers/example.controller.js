"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExample = exports.getAllExamples = void 0;
const ModelExemple_1 = __importDefault(require("../models/ModelExemple"));
const getAllExamples = async (req, res) => {
    try {
        const examples = await ModelExemple_1.default.find();
        res.status(200).json(examples);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar exemplos", error });
    }
};
exports.getAllExamples = getAllExamples;
const createExample = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newExample = new ModelExemple_1.default({ name, description });
        await newExample.save();
        res.status(201).json(newExample);
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar exemplo", error });
    }
};
exports.createExample = createExample;
