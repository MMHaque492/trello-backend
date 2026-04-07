const List = require('../models/ListModel');
const Board = require('../models/BoardModel');

exports.createList = async (req, res) => {
  try {
    const { title, boardId } = req.body;
    const board = await Board.findByPk(boardId);
    if (!board) return res.status(404).json({ msg: 'Board not found' });
    const isMember = await board.hasMember(req.user.id);
    if (!isMember) return res.status(401).json({ msg: 'Not authorized' });

    const listsCount = await List.count({ where: { boardId } });
    const list = await List.create({ title, boardId, position: listsCount });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getListsByBoard = async (req, res) => {
  try {
    const lists = await List.findAll({
      where: { boardId: req.params.boardId },
      order: [['position', 'ASC']]
    });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    await list.update({ title: req.body.title, position: req.body.position });
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await List.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'List deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};