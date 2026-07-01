import express from "express";
import {
    getKeys,
    saveKeys
} from "../controllers/keyController.js";

const router = express.Router();

router.get("/", getKeys);
router.post("/", saveKeys);

export default router;