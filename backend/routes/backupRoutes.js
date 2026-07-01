import express from "express";

import {

getBackups,

restore

} from "../controllers/backupController.js";

import { removeBackup } from "../controllers/backupController.js";
import { create } from "../controllers/backupController.js";

const router=express.Router();

router.get("/",getBackups);
router.delete("/", removeBackup);
router.post("/restore",restore);
router.post("/", create);

export default router;