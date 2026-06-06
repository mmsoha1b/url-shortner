import express, { type Application } from "express";
import apiRoutes from "./api/routes/index.js";

const app: Application = express();

app.use(express.json());

app.use("/api/v1", apiRoutes);

export default app;
