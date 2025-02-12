// src/components/HomePage/FeaturedProducts.js
"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ShopPage/ProductCard";

export default function FeaturedProducts() {
      const [category, setCategory] = useState("");
      const [products, setProducts] = useState([]);

      const fetchRandomCategory = async () => {
            try {
                  const response = await fetch("https://fakestoreapi.com/products/categories");
                  const categories = await response.json();
                  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                  setCategory(randomCategory);
                  fetchProductsByCategory(randomCategory);
            } catch (error) {
                  console.error("Error fetching categories:", error);
            }
      };

      const fetchProductsByCategory = async (category) => {
            try {
                  const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
                  const data = await response.json();
                  setProducts(data.slice(0, 4));
            } catch (error) {
                  console.error("Error fetching products:", error);
            }
      };

      useEffect(() => {
            fetchRandomCategory();
      }, []);

      return (
            <div className="container mx-auto p-4">
                  <h2 className="text-2xl font-bold mb-4 text-center">Recommended products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                              <ProductCard key={product.id} product={product} />
                        ))}
                  </div>
            </div>
      );
}
