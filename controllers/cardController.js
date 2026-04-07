const Card = require('../models/CardModel');
const List = require('../models/ListModel');

exports.createCard = async (req, res) => {
  try {
    const { title, listId } = req.body;
    const cardsCount = await Card.count({ where: { listId } });
    const card = await Card.create({ title, listId, position: cardsCount });
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getCardsByList = async (req, res) => {
  try {
    const cards = await Card.findAll({
      where: { listId: req.params.listId },
      order: [['position', 'ASC']]
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });
    await card.update({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      labels: req.body.labels
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.moveCard = async (req, res) => {
  try {
    const { newListId, newPosition } = req.body;
    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ msg: 'Card not found' });

    // Adjust positions in old list
    await Card.update(
      { position: sequelize.literal('position - 1') },
      { where: { listId: card.listId, position: { [Op.gt]: card.position } } }
    );

    // Update card
    await card.update({ listId: newListId, position: newPosition });

    // Adjust positions in new list (shift right)
    await Card.update(
      { position: sequelize.literal('position + 1') },
      { where: { listId: newListId, position: { [Op.gte]: newPosition }, id: { [Op.ne]: card.id } } }
    );

    res.json(card);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    await Card.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Card deleted' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};