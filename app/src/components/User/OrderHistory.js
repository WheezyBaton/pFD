// src/components/User/OrderHistory.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderHistory({ userId }) {
      const [orders, setOrders] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const fetchOrderHistory = async () => {
                  try {
                        const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
                        if (!response.ok) {
                              throw new Error("Failed to fetch order history.");
                        }
                        const data = await response.json();
                        setOrders(data);
                  } catch (error) {
                        setError(error.message);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchOrderHistory();
      }, [userId]);

      const fetchProductDetails = async (productId) => {
            try {
                  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                  if (!response.ok) {
                        throw new Error("Failed to fetch product details.");
                  }
                  return await response.json();
            } catch (error) {
                  console.error("Error fetching product:", error);
                  return null;
            }
      };

      useEffect(() => {
            if (orders.length > 0) {
                  const fetchAllProductDetails = async () => {
                        const updatedOrders = await Promise.all(
                              orders.map(async (order) => {
                                    const productsWithDetails = await Promise.all(
                                          order.products.map(async (product) => {
                                                const productDetails = await fetchProductDetails(product.productId);
                                                return {
                                                      ...product,
                                                      name: productDetails?.title || "Unknown product",
                                                };
                                          })
                                    );
                                    return {
                                          ...order,
                                          products: productsWithDetails,
                                    };
                              })
                        );
                        setOrders(updatedOrders);
                  };

                  fetchAllProductDetails();
            }
      }, [orders]);

      if (loading) {
            return <p>Loading order history...</p>;
      }

      if (error) {
            return <p className="text-red-500">{error}</p>;
      }

      if (orders.length === 0) {
            return <p>No orders found.</p>;
      }

      return (
            <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-center">Order History</h2>
                  {orders.map((order) => (
                        <div key={order.id} className="border p-4 rounded-lg shadow-md">
                              <p>
                                    <strong>Order ID:</strong> {order.id}
                              </p>
                              <p>
                                    <strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}
                              </p>
                              <p>
                                    <strong>Products:</strong>
                              </p>
                              <ul className="list-disc list-inside">
                                    {order.products.map((product) => (
                                          <li key={product.productId}>
                                                <Link
                                                      href={`/product/${product.productId}`}
                                                      className="text-blue-500 hover:underline"
                                                >
                                                      {product.name}
                                                </Link>{" "}
                                                - Quantity: {product.quantity}
                                          </li>
                                    ))}
                              </ul>
                        </div>
                  ))}
            </div>
      );
}
