const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get Full Board Data (Lists + Cards)
router.get('/:id', async (req, res) => {
    try {
        const [lists] = await db.query('SELECT * FROM lists WHERE board_id = ? ORDER BY position', [req.params.id]);
        const [cards] = await db.query('SELECT * FROM cards WHERE list_id IN (SELECT id FROM lists WHERE board_id = ?) ORDER BY position', [req.params.id]);

        const data = lists.map(list => ({
            ...list,
            cards: cards.filter(card => card.list_id === list.id)
        }));
        res.json(data);
    } catch (err) { res.status(500).json(err); }
});

// Update Card Position (Drag and Drop)
router.put('/move-card', async (req, res) => {
    const { cardId, newListId, newPosition } = req.body;
    try {
        await db.query('UPDATE cards SET list_id = ?, position = ? WHERE id = ?', [newListId, newPosition, cardId]);
        res.json({ message: "Card moved successfully" });
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;