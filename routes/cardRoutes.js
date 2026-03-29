const express = require('express');
const router = express.Router();
const { getCards, createCard } = require('../controllers/cardController');

// Cards
router.get('/:listId', getCards);
router.post('/', createCard);

module.exports = router;