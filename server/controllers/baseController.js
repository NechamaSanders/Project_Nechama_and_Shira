const createOne = (Model) => async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided" });
        }

        const newId = await Model.create(data);
        res.status(201).json({ 
            ...data,
            id: newId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateOne = (Model) => async (req, res) => {
    try {
        const affected = await Model.update(req.params.id, req.body);      
        if (!affected) return res.status(404).json({ message: "Item not found" });
        res.json(affected);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteOne = (Model) => async (req, res) => {
    try {
        const affected = await Model.remove(req.params.id);
        if (!affected) return res.status(404).json({ message: "Item not found" });
        res.json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getById = (Model, entityName = 'Item') => async (req, res) => {
    try {
        const item = await Model.getById(req.params.id);
        if (!item) return res.status(404).json({ message: `${entityName} not found` });
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getByUserId = (Model) => async (req, res) => {
    try {
        const items = await Model.getByUserId(req.params.userId);
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOne, getAll, getById, getByUserId, updateOne, deleteOne };