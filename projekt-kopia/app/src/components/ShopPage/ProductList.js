// src/components/ShopPage/ProductList.js
"use client";

import { useMemo, useCallback, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import CategoryFilter from "@/components/ShopPage/CategoryFilter";
import PriceFilter from "@/components/ShopPage/PriceFilter";
import ProductCard from "@/components/ShopPage/ProductCard";

export default function ProductList() {
      const { data: products, loading, error } = useFetch("https://fakestoreapi.com/products");

      const [selectedCategory, setSelectedCategory] = useState("");
      const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });

      const handleCategoryChange = useCallback((category) => {
            setSelectedCategory(category);
      }, []);

      const handlePriceChange = useCallback(({ min, max }) => {
            setPriceFilter({ min, max });
      }, []);

      const filteredProducts = useMemo(() => {
            let filtered = products || [];

            if (selectedCategory) {
                  filtered = filtered.filter((product) => product.category === selectedCategory);
            }

            if (priceFilter.min !== "" || priceFilter.max !== "") {
                  const min = parseFloat(priceFilter.min) || 0;
                  const max = parseFloat(priceFilter.max) || Infinity;
                  filtered = filtered.filter((product) => product.price >= min && product.price <= max);
            }

            return filtered;
      }, [selectedCategory, priceFilter, products]);

      if (loading) {
            return <p className="text-center">Loading products...</p>;
      }

      if (error) {
            return <p className="text-center text-red-500">An error occurred: {error.message}</p>;
      }

      return (
            <div className="container mx-auto p-4">
                  <div className="xl:flex justify-between">
                        <CategoryFilter onCategoryChange={handleCategoryChange} />
                        <PriceFilter onPriceChange={handlePriceChange} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                              <ProductCard key={product.id} product={product} />
                        ))}
                  </div>
            </div>
      );
}
