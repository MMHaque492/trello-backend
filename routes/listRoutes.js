const express = require('express');
const router = express.Router();
const { getLists, createList } = require('../controllers/listController');

// Lists
router.get('/:boardId', getLists);
router.post('/', createList);

module.exports = router;