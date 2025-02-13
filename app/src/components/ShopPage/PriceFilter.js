//src/components/ShopPage/PriceFilter.js
"use client";

import { useState } from "react";

export default function PriceFilter({ onPriceChange }) {
      const [minPrice, setMinPrice] = useState("");
      const [maxPrice, setMaxPrice] = useState("");

      const handleFilterChange = () => {
            onPriceChange({ min: minPrice, max: maxPrice });
      };

      return (
            <div className="mb-4">
                  <div className="flex gap-2">
                        <input
                              type="number"
                              placeholder="Min Price"
                              value={minPrice}
                              onChange={(e) => setMinPrice(e.target.value)}
                              className="border p-2 rounded w-full"
                        />
                        <input
                              type="number"
                              placeholder="Max Price"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(e.target.value)}
                              className="border p-2 rounded w-full"
                        />
                        <button
                              onClick={handleFilterChange}
                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                              Filter
                        </button>
                  </div>
            </div>
      );
}
