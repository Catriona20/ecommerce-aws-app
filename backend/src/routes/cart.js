import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

// ─────────────────────────────────────────
// LOCAL IN-MEMORY STORE (dev fallback)
// ─────────────────────────────────────────
export const localCart = {};

const router = Router();

// GET /api/cart
router.get('/', requireAuth, (req, res) => {
  const userId = req.user.sub;
  console.log(`[Cart GET] userId=${userId}, items=${(localCart[userId] || []).length}`);
  res.json(localCart[userId] || []);
});

// PUT /api/cart/:productId  — add / increment
router.put('/:productId', requireAuth, (req, res) => {
  const userId = req.user.sub;
  const productId = req.params.productId;

  if (!localCart[userId]) localCart[userId] = [];

  const existing = localCart[userId].find(i => i.productId === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    localCart[userId].push({ productId, quantity: 1 });
  }

  console.log(`[Cart PUT] userId=${userId}, productId=${productId}`);
  res.json({ success: true, cart: localCart[userId] });
});

// POST /api/cart/add  — alternate add route
router.post('/add', requireAuth, (req, res) => {
  const userId = req.user.sub;
  const { productId, quantity = 1 } = req.body;

  if (!localCart[userId]) localCart[userId] = [];

  const existing = localCart[userId].find(i => i.productId === String(productId));
  if (existing) {
    existing.quantity += quantity;
  } else {
    localCart[userId].push({ productId: String(productId), quantity });
  }

  console.log(`[Cart POST /add] userId=${userId}, productId=${productId}`);
  res.json({ message: 'Added to cart', cart: localCart[userId] });
});

// DELETE /api/cart/:productId
router.delete('/:productId', requireAuth, (req, res) => {
  const userId = req.user.sub;
  const productId = req.params.productId;

  if (localCart[userId]) {
    localCart[userId] = localCart[userId].filter(i => i.productId !== productId);
  }

  res.json({ deleted: true, cart: localCart[userId] || [] });
});

export default router;