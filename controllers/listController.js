const db = require('../config/db');

const getLists = (req, res) => {
    const { boardId } = req.params;
    
    // Complex Query to get Lists and their Cards together
    const sql = `
        SELECT l.id as listId, l.title as listTitle, 
               c.id as cardId, c.title as cardTitle
        FROM lists l
        LEFT JOIN cards c ON l.id = c.list_id
        WHERE l.board_id = ?
        ORDER BY l.position, c.position
    `;

    db.query(sql, [boardId], (err, results) => {
        if (err) return res.status(500).json(err);
        
        // Data Formatting: Group cards inside lists
        const formattedData = results.reduce((acc, row) => {
            let list = acc.find(l => l.id === row.listId);
            if (!list) {
                list = { id: row.listId, title: row.listTitle, cards: [] };
                acc.push(list);
            }
            if (row.cardId) {
                list.cards.push({ id: row.cardId, title: row.cardTitle });
            }
            return acc;
        }, []);

        res.json(formattedData);
    });
};

module.exports = { getLists };