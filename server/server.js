const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/index');

const app = express();

 app.use(cors());
 app.use(express.json());

app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});