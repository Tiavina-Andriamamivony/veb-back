import express from "express";
import playerController from "../controllers/player.controller.js";

const router = express.Router();

router.get("/", playerController.getAll);
router.get("/:id", playerController.getOne);
router.post("/", playerController.create);
router.put("/:id", playerController.update);
router.delete("/:id", playerController.remove);

// Bonus
router.get("/:id/license-status", playerController.checkLicense);
router.get("/stats/top", playerController.getTopByStat);

export default router;
