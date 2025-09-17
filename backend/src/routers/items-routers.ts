import express from "express";
import { createItem, createItems, getItems, updateItems } from '../controllers';

export const itemRouter = express.Router();

itemRouter.get('/items', getItems);
itemRouter.post('/items', createItems);
itemRouter.post('/item', createItem);
itemRouter.patch('/items', updateItems);
