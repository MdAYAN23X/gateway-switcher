import express from "express";

import {

getBackups,

restore

} from "../controllers/backupController.js";

const router=express.Router();

router.get("/",getBackups);

router.post("/restore",restore);

export default router;