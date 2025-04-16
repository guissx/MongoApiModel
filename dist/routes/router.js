"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const example_controller_1 = require("../controllers/example.controller");
const router = (0, express_1.Router)();
router.use("/getexemple", example_controller_1.getAllExamples);
router.use("/postExemple", example_controller_1.createExample);
exports.default = router;
