const createOne = (Model) => async (req, res) => {
    try {
        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({ message: "No data provided" });
        }

        const newId = await Model.create(data);
        res.status(201).json({ 
            message: "Item created successfully", 
            id: newId 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// אפשר להוסיף כאן גם getAllOne וכו'
const getAll = (Model) => async (req, res) => {
    try {
        const items = await Model.getAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOne, getAll };