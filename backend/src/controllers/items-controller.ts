import { ItemsModel } from "../modules";

export const createItem = async (req, res) => {
    const { name, category, cost, price } = req.body;

    if (!name || !cost) {
        res.status(404).json({ message: 'required name and cost' })
    }

    try {
        const createdItem = await ItemsModel.create({ name, category, cost, price });
        res.status(201).json({ success: 'Item Added Succusfully!', item: createdItem });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create todo' });
    }

}

export const getItems = async (req, res)=>{
    try {
        const modelItems = await ItemsModel.find({});
        res.status(201).json(modelItems) 
    } catch (error) {
        res.status(500).json({message:'Failed to get Items'});
    }
}