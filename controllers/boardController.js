const Board = require('../models/BoardModel');
const User = require('../models/UserModel');

exports.createBoard = async (req, res) => {
  try {
    const { title, background } = req.body;
    const board = await Board.create({
      title,
      ownerId: req.user.id,
      background
    });
    // Add owner as member
    await board.addMember(req.user.id);
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ association: 'boards', include: ['owner'] }]
    });
    res.json(user.boards);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id, {
      include: ['owner', { association: 'members', attributes: ['id', 'name', 'email'] }]
    });
    if (!board) return res.status(404).json({ msg: 'Board not found' });
    const isMember = await board.hasMember(req.user.id);
    if (!isMember) return res.status(401).json({ msg: 'Not authorized' });
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ msg: 'Board not found' });
    if (board.ownerId !== req.user.id)
      return res.status(401).json({ msg: 'Only owner can edit' });
    await board.update({ title: req.body.title, background: req.body.background });
    res.json(board);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ msg: 'Board not found' });
    if (board.ownerId !== req.user.id)
      return res.status(401).json({ msg: 'Only owner can delete' });
    await board.destroy();
    res.json({ msg: 'Board removed' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};