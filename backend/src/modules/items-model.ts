import mongoose from "mongoose";

const ItemSModleSchema = new mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    cost: {
        type: Number
    },
    price: {
        type: Number
    },
    itemId:{
        type: String
    }
});

export const ItemsModel = mongoose.model('Items', ItemSModleSchema);
