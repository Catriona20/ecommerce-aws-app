import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { localCart } from './cart.js';

// ─────────────────────────────────────────
// LOCAL IN-MEMORY STORE (dev fallback)
// ─────────────────────────────────────────
const localOrders = {};

const router = Router();

// GET /api/orders
router.get('/', requireAuth, (req, res) => {
  const userId = req.user.sub;
  console.log(`[Orders GET] userId=${userId}, orders=${(localOrders[userId] || []).length}`);
  res.json(localOrders[userId] || []);
});

// POST /api/orders  — checkout: convert cart → order
router.post('/', requireAuth, (req, res) => {
  const userId = req.user.sub;

  const cartItems = localCart[userId] || [];
  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  if (!localOrders[userId]) localOrders[userId] = [];

  const order = {
    id: `ORD-${Date.now()}`,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: cartItems.length,
    total: req.body.total || 0,
    status: 'Processing',
  };

  localOrders[userId].push(order);

  // Clear cart after checkout
  localCart[userId] = [];

  console.log(`[Orders POST] userId=${userId}, orderId=${order.id}`);
  res.status(201).json(order);
});

export default router;