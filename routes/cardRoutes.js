const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createCard,
  getCardsByList,
  updateCard,
  moveCard,
  deleteCard
} = require('../controllers/cardController');

router.route('/')
  .post(auth, createCard);

router.route('/list/:listId')
  .get(auth, getCardsByList);

router.route('/:id')
  .put(auth, updateCard)
  .delete(auth, deleteCard);

router.put('/:id/move', auth, moveCard);

module.exports = router;