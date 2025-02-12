// src/components//SearchBar.js
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
      const router = useRouter();
      const [searchTerm, setSearchTerm] = useState("");
      const [searchResults, setSearchResults] = useState([]);
      const [allProducts, setAllProducts] = useState([]);
      const inputRef = useRef(null);

      useEffect(() => {
            const fetchProducts = async () => {
                  const response = await fetch("https://fakestoreapi.com/products");
                  const data = await response.json();
                  setAllProducts(data);
            };

            fetchProducts();
      }, []);

      useEffect(() => {
            if (searchTerm) {
                  const filteredProducts = allProducts.filter((product) =>
                        product.title.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setSearchResults(filteredProducts);
            } else {
                  setSearchResults([]);
            }
      }, [searchTerm, allProducts]);

      useEffect(() => {
            if (inputRef.current) {
                  inputRef.current.focus();
            }
      }, []);

      return (
            <div className="relative flex-grow">
                  <input
                        type="text"
                        placeholder="Wyszukaj produkty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ref={inputRef}
                  />
                  {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border rounded shadow-lg mt-2 z-50">
                              {searchResults.map((product) => (
                                    <div
                                          key={product.id}
                                          className="p-2 hover:bg-gray-100 cursor-pointer text-black"
                                          onClick={() => {
                                                router.push(`/product/${product.id}`);
                                                setSearchTerm("");
                                                setSearchResults([]);
                                          }}
                                    >
                                          {product.title}
                                    </div>
                              ))}
                        </div>
                  )}
            </div>
      );
}
