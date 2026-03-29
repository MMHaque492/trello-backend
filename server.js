require('dotenv').config();
const express = require('express');
const cors = require('cors');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/boards', boardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));