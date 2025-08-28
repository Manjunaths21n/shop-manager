import express from "express";
import { createItem, getItems } from '../controllers';

export const itemRouter = express.Router();

itemRouter.get('/items', getItems);
itemRouter.post('/items', createItem);