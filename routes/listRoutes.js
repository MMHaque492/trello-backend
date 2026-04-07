const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createList,
  getListsByBoard,
  updateList,
  deleteList
} = require('../controllers/listController');

router.route('/')
  .post(auth, createList);

router.route('/board/:boardId')
  .get(auth, getListsByBoard);

router.route('/:id')
  .put(auth, updateList)
  .delete(auth, deleteList);

module.exports = router;