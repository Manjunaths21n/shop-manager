import { ItemsModel } from "../modules";

export const createItem = async (req: any, res: any) => {
    const { name, category, cost, price, itemId } = req.body;

    if (!name || !cost) {
        res.status(404).json({ message: 'required name and cost' })
    }

    try {
        const createdItem = await ItemsModel.insertOne({ name, category, cost, price, itemId });
        // const createdItem = await ItemsModel.create({ name, category, cost, price, itemId });
        res.status(201).json({ success: 'Item Added Succusfully!', item: createdItem });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create item' });
    }

}
export const createItems = async (req: any, res: any) => {
    try {
        const items = Array.isArray(req.body) ? req.body : [req.body];

        const allowedFields = ["name", "category", "cost", "price", "itemId"];

        const validatedItems = items.map((item: any) => {
            const picked: Record<string, any> = {};
            for (const key of allowedFields) {
                if (item[key] !== undefined) {
                    picked[key] = item[key];
                }
            }

            // Required validation
            if (!picked.name || picked.cost === undefined) {
                throw new Error("Each item must have a name and cost");
            }

            return picked;
        });

        // Insert all valid items
        const createdItems = await ItemsModel.insertMany(validatedItems);

        res.status(201).json({
            success: true,
            message: "Items added successfully!",
            items: createdItems,
        });

    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: err.message || "Failed to create items",
        });
    }
};

export const getItems = async (req: any, res: any) => {
    try {
        const modelItems = await ItemsModel.find({});
        res.status(201).json(modelItems)
    } catch (error) {
        res.status(500).json({ message: 'Failed to get Items' });
    }
}


export const deleteItems = async (req: any, res: any) => {
    try {
        const ids = req.body;
        // Validate request body
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body must be a non-empty array",
            });
        }

        // Bulk delete using $in
        const result = await ItemsModel.deleteMany({ itemId: { $in: ids } });

        return res.status(200).json({
            success: true,
            message: "Bulk delete completed",
            deletedCount: result.deletedCount,
        });

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete items",
            error: err.message,
        });
    }
};


export const updateItems = async (req: any, res: any) => {
    try {
        if (!Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body must be a non-empty array",
            });
        }

        const allowedFields = ["name", "category", "cost", "price"];

        // Build bulk operations
        const operations = req.body.map((item: any) => {
            if (!item.itemId) {
                throw new Error("Each update must include itemId");
            }

            const updates = Object.fromEntries(
                Object.entries(item).filter(([key]) => allowedFields.includes(key))
            );

            if (Object.keys(updates).length === 0) {
                throw new Error(`No valid fields provided for itemId: ${item.itemId}`);
            }

            return {
                updateMany: {
                    filter: { itemId: item.itemId },
                    update: { $set: updates },
                },
            };
        });

        const result = await ItemsModel.bulkWrite(operations, { ordered: false });

        res.status(200).json({
            success: true,
            message: "Bulk update completed",
            matched: result.matchedCount,
            modified: result.modifiedCount,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update items",
            error: err.message,
        });
    }
};
