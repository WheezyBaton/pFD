// src/components/ShopPage/QuantitySelector.js
"use client";

import { useState } from "react";

export default function QuantitySelector({ initialQuantity = 1, onChange }) {
      const [quantity, setQuantity] = useState(initialQuantity);

      const handleChange = (e) => {
            const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity > 0) {
                  setQuantity(newQuantity);
                  onChange(newQuantity);
            }
      };

      return (
            <div className="flex items-center space-x-2">
                  <label className="text-gray-700">Quantity:</label>
                  <input
                        type="number"
                        value={quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-16 p-2 border rounded-lg text-center text-black"
                  />
            </div>
      );
}
