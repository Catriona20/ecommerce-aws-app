import { db } from "./src/db.js";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const products = [
    {
        productId: "1",
        name: "Premium Wireless Headphones",
        price: 299.99,
        description: "Noise-cancelling with crystal clear sound.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    },
    {
        productId: "2",
        name: "Minimalist Watch",
        price: 150.0,
        description: "Elegant design for the modern professional.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    },
    {
        productId: "3",
        name: "Smart Speaker",
        price: 89.99,
        description: "Your virtual assistant at home.",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500",
    },
    {
        productId: "4",
        name: "Mechanical Keyboard",
        price: 129.99,
        description: "Tactile and satisfying typing experience.",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500",
    },
];

const seed = async () => {
    try {
        for (const product of products) {
            await db.send(
                new PutCommand({
                    TableName: "Products",
                    Item: product,
                })
            );
            console.log("Inserted:", product.name);
        }

        console.log("✅ Seeding complete");
    } catch (err) {
        console.error("❌ Error:", err);
    }
};

seed();