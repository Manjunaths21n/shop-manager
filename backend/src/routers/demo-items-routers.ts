import express from "express";
import { createDemoItems } from "../controllers/demo-controller";

export const demoItemRouter = express.Router();

demoItemRouter.get('/', createDemoItems);
