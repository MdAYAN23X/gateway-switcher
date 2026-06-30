import express from "express";
import { GATEWAYS } from "../config/gateways.js";

const router = express.Router();

router.get("/", (req, res) => {

    res.json({
        success:true,
        gateways:GATEWAYS
    });

});

export default router;