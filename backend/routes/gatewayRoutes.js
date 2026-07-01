import express from "express";
import { GATEWAYS } from "../config/gateways.js";
import { switchGateway } from "../controllers/gatewayController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        success: true,
        gateways: GATEWAYS
    });
});

router.post("/switch", switchGateway);

export default router;