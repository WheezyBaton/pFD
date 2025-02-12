// src/components/ShopPage/AddToCartButton.js
"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/ShopPage/QuantitySelector";

export default function AddToCartButton({ product }) {
      const { addToCart } = useCart();
      const [quantity, setQuantity] = useState(1);

      const handleAddToCart = (e) => {
            e.stopPropagation();
            addToCart({ ...product, quantity });
      };

      return (
            <div className="space-y-2">
                  <QuantitySelector initialQuantity={quantity} onChange={(newQuantity) => setQuantity(newQuantity)} />
                  <button
                        onClick={handleAddToCart}
                        className="mt-2 bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                  >
                        Add to Cart
                  </button>
            </div>
      );
}
