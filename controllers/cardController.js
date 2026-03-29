const db = require('../config/db');

// Get cards of a list
const getCards = (req, res) => {
    const { listId } = req.params;
    db.query('SELECT * FROM cards WHERE list_id = ? ORDER BY position ASC', [listId], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// Create card
const createCard = (req, res) => {
    const { title, description, list_id, position } = req.body;
    db.query('INSERT INTO cards (title, description, list_id, position) VALUES (?, ?, ?, ?)', [title, description, list_id, position], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title, description, list_id, position });
    });
};

module.exports = { getCards, createCard };