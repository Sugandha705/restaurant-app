
import Order from '../models/Order.js';
import Table from '../models/Table.js';

import Food from '../models/Food.js';


export const createOrder = async (req, res) => {
  try {
    const { items, table: tableId } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ error: 'Order items required' });

    // Fetch actual prices from Food collection
    const enrichedItems = await Promise.all(
      items.map(async (it) => {
        const food = await Food.findById(it.food);
        if (!food) throw new Error(`Food item not found: ${it.food}`);
        return {
          name: food.title,
          food: food._id,
          price: food.price,
          quantity: it.quantity || 1,
        };
      })
    );

    // Calculate total
    const total = enrichedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      user: req.user._id,
      items: enrichedItems,
      total,
      table: tableId,
    });

    // Optionally mark table as occupied
    if (tableId) await Table.findByIdAndUpdate(tableId, { status: 'occupied' });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




// export const createOrder = async (req, res) => {
//   try {
//     const { items, table: tableId } = req.body;
//     if (!items || !items.length) return res.status(400).json({ error: 'Order items required' });

//     const total = items.reduce((acc, it) => acc + (it.price || 0) * (it.quantity || 1), 0);

//     const order = await Order.create({ user: req.user._id, items, total, table: tableId });

//     // optionally set table to occupied
//     if (tableId) {
//       await Table.findByIdAndUpdate(tableId, { status: 'occupied' });
//     }

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

export const getOrders = async (req, res) => {
  try {
    const filter = {};
    if (req.user.role === 'customer') filter.user = req.user._id;
    const orders = await Order.find(filter).populate('user', 'name email').populate('table');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('table');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    // ensure customers can only fetch their orders
    if (req.user.role === 'customer' && order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    order.status = status || order.status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
