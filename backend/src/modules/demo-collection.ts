import mongoose from "mongoose";

const DemoCollectionsSchema = new mongoose.Schema({
    name: { type: String },
    age: { type: Number }
})


export const DemoCollectionModule = mongoose.model('DemoCollections', DemoCollectionsSchema)