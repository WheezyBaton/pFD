// src/components/ShopPage/ProductCard.js
"use client";

import { useRouter } from "next/navigation";
import AddToCartButton from "@/components/ShopPage/AddToCartButton";

export default function ProductCard({ product }) {
      const router = useRouter();

      return (
            <div className="border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="w-full h-48 flex items-center justify-center mb-4">
                        <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-contain cursor-pointer"
                              onClick={() => router.push(`/product/${product.id}`)}
                        />
                  </div>
                  <h2
                        className="text-lg font-semibold mb-2 truncate cursor-pointer"
                        title={product.title}
                        onClick={() => router.push(`/product/${product.id}`)}
                  >
                        {product.title}
                  </h2>
                  <p className="text-xl font-bold text-gray-800 mb-4">${product.price}</p>
                  <div className="mt-auto">
                        <AddToCartButton product={product} />
                  </div>
            </div>
      );
}
