import { Router } from 'express';

const router = Router();

// Mock data (matches the original UI design)
const products = [
  { id: 1, name: "Premium Wireless Headphones", price: 299.99, description: "Noise-cancelling with crystal clear sound.", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
  { id: 2, name: "Minimalist Watch", price: 150.00, description: "Elegant design for the modern professional.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
  { id: 3, name: "Smart Speaker", price: 89.99, description: "Your virtual assistant at home.", image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500" },
  { id: 4, name: "Mechanical Keyboard", price: 129.99, description: "Tactile and satisfying typing experience.", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },
];

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

export default router;