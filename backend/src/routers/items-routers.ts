import express from "express";
import { createItem, createItems, deleteItems, getItems, updateItems } from '../controllers';
import { createDemoItems } from "../controllers/demo-controller";

export const itemRouter = express.Router();

itemRouter.get('/items', getItems);
itemRouter.post('/items', createItems);
itemRouter.post('/item', createItem);
itemRouter.patch('/items', updateItems);
itemRouter.delete('/items', deleteItems);