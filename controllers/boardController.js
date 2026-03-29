const db = require('../config/db');

// Get all boards
const getBoards = (req, res) => {
    db.query('SELECT * FROM boards', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Create new board
const createBoard = (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO boards (title, created_at) VALUES (?, NOW())', [title], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title });
    });
};

module.exports = { getBoards, createBoard };