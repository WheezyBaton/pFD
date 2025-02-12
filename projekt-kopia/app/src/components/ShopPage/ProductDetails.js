// src/components/ShopPage/ProductDetails.js
"use client";

import { useParams } from "next/navigation";
import { useFetch } from "@/hooks/useFetch";
import AddToCartButton from "@/components/ShopPage/AddToCartButton";

export default function ProductDetails() {
      const params = useParams();
      const { id } = params;

      const {
            data: product,
            loading: productLoading,
            error: productError,
      } = useFetch(id ? `https://fakestoreapi.com/products/${id}` : null);

      if (productLoading) {
            return <p className="text-center p-4">Loading...</p>;
      }

      if (productError) {
            return <p className="text-center p-4 text-red-500">An error occurred while downloading the product.</p>;
      }

      if (!product) {
            return <p className="text-center p-4">Product not found.</p>;
      }

      return (
            <div className="container mx-auto p-4 max-w-4xl">
                  <div className="border p-4 rounded shadow">
                        <img src={product.image} alt={product.title} className="w-full h-60 object-contain mb-2" />
                        <h2 className="text-2xl font-semibold">{product.title}</h2>
                        <p className="text-gray-700 text-lg">Category: {product.category}</p>
                        <p className="text-gray-900 text-xl font-bold">${product.price}</p>
                        <p className="text-gray-600 mt-2">{product.description}</p>
                        <AddToCartButton product={product} />
                  </div>
            </div>
      );
}
