import Item from '../model/Item.js';

// GET /api/items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.userId }).sort({ order: 1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/items
export const addItem = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });

  try {
    const count = await Item.countDocuments({ user: req.userId });
    const item = new Item({ title, description, order: count, user: req.userId });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/items/reorder
export const reorderItems = async (req, res) => {
  const { items } = req.body; // items: [{ _id, order }, ...]
  if (!Array.isArray(items)) return res.status(400).json({ message: 'Invalid body' });

  try {
    // Option: use bulkWrite for efficiency
    const ops = items.map(it => ({
      updateOne: {
        filter: { _id: it._id, user: req.userId },
        update: { $set: { order: it.order } }
      }
    }));
    if (ops.length) {
      await Item.bulkWrite(ops);
    }
    res.json({ message: 'Order updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
