// src/components/Admin/OrderManagement.js
"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";

export default function OrderManagement() {
      const [expandedOrderId, setExpandedOrderId] = useState(null);
      const [userDetails, setUserDetails] = useState({});

      const { data: orders, loading: ordersLoading, error: ordersError } = useFetch("https://fakestoreapi.com/carts");

      useEffect(() => {
            if (expandedOrderId) {
                  const order = orders?.find((o) => o.id === expandedOrderId);
                  if (order && !userDetails[order.userId]) {
                        fetch(`https://fakestoreapi.com/users/${order.userId}`)
                              .then((response) => response.json())
                              .then((data) => {
                                    setUserDetails((prev) => ({ ...prev, [order.userId]: data }));
                              })
                              .catch((error) => {
                                    console.error("Error retrieving user data:", error);
                              });
                  }
            }
      }, [expandedOrderId, orders, userDetails]);

      const toggleOrderDetails = (orderId) => {
            setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
      };

      if (ordersLoading) {
            return <p className="p-4">Loading orders...</p>;
      }

      if (ordersError) {
            return <p className="p-4 text-red-500">Error loading orders: {ordersError.message}</p>;
      }

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Orders</h2>
                  <div>
                        {orders.map((order) => (
                              <div key={order.id} className="border p-4 rounded mb-2">
                                    <div className="cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                                          <h3 className="text-lg font-bold">Order #{order.id}</h3>
                                          <p className="text-gray-600">
                                                Date: {new Date(order.date).toLocaleDateString()}
                                          </p>
                                    </div>
                                    {expandedOrderId === order.id && (
                                          <div className="mt-4">
                                                <p>
                                                      <strong>Produkty:</strong>
                                                </p>
                                                <ul className="list-disc list-inside">
                                                      {order.products.map((product) => (
                                                            <li key={product.productId}>
                                                                  Product ID: {product.productId} - Quantity:{" "}
                                                                  {product.quantity}
                                                            </li>
                                                      ))}
                                                </ul>

                                                {userDetails[order.userId] && (
                                                      <div className="mt-4">
                                                            <h4 className="text-lg font-semibold">Customer data:</h4>
                                                            <p>
                                                                  <strong>Name and surname:</strong>{" "}
                                                                  {userDetails[order.userId].name.firstname}{" "}
                                                                  {userDetails[order.userId].name.lastname}
                                                            </p>
                                                            <p>
                                                                  <strong>Email:</strong>{" "}
                                                                  {userDetails[order.userId].email}
                                                            </p>
                                                            <p>
                                                                  <strong>Phone number:</strong>{" "}
                                                                  {userDetails[order.userId].phone}
                                                            </p>
                                                            <p>
                                                                  <strong>Adress:</strong>{" "}
                                                                  {userDetails[order.userId].address.city},{" "}
                                                                  {userDetails[order.userId].address.street}{" "}
                                                                  {userDetails[order.userId].address.number}
                                                            </p>
                                                            <p>
                                                                  <strong>Zip code:</strong>{" "}
                                                                  {userDetails[order.userId].address.zipcode}
                                                            </p>
                                                      </div>
                                                )}
                                          </div>
                                    )}
                              </div>
                        ))}
                  </div>
            </div>
      );
}
