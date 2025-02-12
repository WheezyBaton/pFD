// src/components/ShopPage/CategoryFilter.js
"use client";

import { useFetch } from "@/hooks/useFetch";

export default function CategoryFilter({ onCategoryChange }) {
      const {
            data: categories,
            loading: categoriesLoading,
            error: categoriesError,
      } = useFetch("https://fakestoreapi.com/products/categories");

      if (categoriesLoading) {
            return (
                  <div className="mb-4">
                        <select className="border p-2 rounded w-full cursor-pointer" disabled>
                              <option value="">Loading categories...</option>
                        </select>
                  </div>
            );
      }

      if (categoriesError) {
            return (
                  <div className="mb-4">
                        <select className="border p-2 rounded w-full cursor-pointer" disabled>
                              <option value="">Error loading categories</option>
                        </select>
                  </div>
            );
      }

      return (
            <div className="mb-4">
                  <select
                        className="border p-2 rounded w-full cursor-pointer"
                        onChange={(e) => onCategoryChange(e.target.value)}
                  >
                        <option value="">All</option>
                        {categories.map((category) => (
                              <option key={category} value={category}>
                                    {category}
                              </option>
                        ))}
                  </select>
            </div>
      );
}
