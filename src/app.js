import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import logger from './middlewares/logger.js';
import equipmentRoutes from './routes/equipment.routes.js';
import playerRoutes from "./routes/player.routes.js";
// Ajoute les autres routes ici au fur et à mesure

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads")); // Serve photo
app.use(logger);
app.use('/equipment', equipmentRoutes);
// Routes
app.use("/players", playerRoutes);

// Lancer le serveur
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
