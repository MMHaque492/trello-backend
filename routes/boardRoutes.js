const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard
} = require('../controllers/boardController');

router.route('/')
  .post(auth, createBoard)
  .get(auth, getBoards);

router.route('/:id')
  .get(auth, getBoardById)
  .put(auth, updateBoard)
  .delete(auth, deleteBoard);

module.exports = router;