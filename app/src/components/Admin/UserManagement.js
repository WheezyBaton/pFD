// src/components/Admin/UserManagement.js
"use client";

import { useEffect, useState } from "react";

export default function UserManagement() {
      const [users, setUsers] = useState([]);
      const [expandedUserId, setExpandedUserId] = useState(null);
      const [userOrders, setUserOrders] = useState({});

      const fetchUsers = async () => {
            try {
                  const response = await fetch("https://fakestoreapi.com/users");
                  const data = await response.json();
                  setUsers(data);
            } catch (error) {
                  console.error("Error retrieving users:", error);
            }
      };

      const fetchUserOrders = async (userId) => {
            try {
                  const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
                  const data = await response.json();
                  setUserOrders((prev) => ({ ...prev, [userId]: data }));
            } catch (error) {
                  console.error("Error retrieving user orders:", error);
            }
      };

      useEffect(() => {
            fetchUsers();
      }, []);

      const toggleUserDetails = (userId) => {
            if (expandedUserId === userId) {
                  setExpandedUserId(null);
            } else {
                  setExpandedUserId(userId);
                  if (!userOrders[userId]) {
                        fetchUserOrders(userId);
                  }
            }
      };

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Users</h2>
                  <div>
                        {users.map((user) => (
                              <div key={user.id} className="border p-4 rounded mb-2">
                                    <div className="cursor-pointer" onClick={() => toggleUserDetails(user.id)}>
                                          <h3 className="text-lg font-bold">
                                                {user.name.firstname} {user.name.lastname}
                                          </h3>
                                          <p className="text-gray-600">{user.email}</p>
                                    </div>
                                    {expandedUserId === user.id && (
                                          <div className="mt-4">
                                                <p>
                                                      <strong>Adress:</strong> {user.address.city},{" "}
                                                      {user.address.street} {user.address.number}
                                                </p>
                                                <p>
                                                      <strong>Phone number:</strong> {user.phone}
                                                </p>
                                                <p>
                                                      <strong>ZIP code:</strong> {user.address.zipcode}
                                                </p>
                                                <h4 className="text-lg font-semibold mt-4">Orders:</h4>
                                                {userOrders[user.id]?.length > 0 ? (
                                                      userOrders[user.id].map((order) => (
                                                            <div key={order.id} className="border p-4 rounded mt-2">
                                                                  <p>
                                                                        <strong>Order ID:</strong> {order.id}
                                                                  </p>
                                                                  <p>
                                                                        <strong>Order date:</strong>{" "}
                                                                        {new Date(order.date).toLocaleDateString()}
                                                                  </p>
                                                                  <p>
                                                                        <strong>Products:</strong>
                                                                  </p>
                                                                  <ul className="list-disc list-inside">
                                                                        {order.products.map((product) => (
                                                                              <li key={product.productId}>
                                                                                    Product ID: {product.productId} -
                                                                                    Quantity: {product.quantity}
                                                                              </li>
                                                                        ))}
                                                                  </ul>
                                                            </div>
                                                      ))
                                                ) : (
                                                      <p>No orders</p>
                                                )}
                                          </div>
                                    )}
                              </div>
                        ))}
                  </div>
            </div>
      );
}
