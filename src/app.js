import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

import playerRoutes from "./routes/player.routes.js";
// Ajoute les autres routes ici au fur et à mesure
app.use('/players', playerRoutes);

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads")); // Serve photo

// Routes
app.use("/players", playerRoutes);

// Lancer le serveur
const PORT =  3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
