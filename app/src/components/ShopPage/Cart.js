// src/components/ShopPage/Cart.js
"use client";

import { useEffect, useReducer, useState } from "react";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/ShopPage/QuantitySelector";
import { getUserIdFromToken } from "@/utils/decodeToken";
import { useRouter } from "next/navigation";

const cartReducer = (state, action) => {
      switch (action.type) {
            case "ADD_ITEM":
                  return [...state, action.payload];
            case "REMOVE_ITEM":
                  return state.filter((item) => item.id !== action.payload);
            case "UPDATE_QUANTITY":
                  return state.map((item) =>
                        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                  );
            case "CLEAR_CART":
                  return [];
            default:
                  return state;
      }
};

export default function Cart() {
      const [state, dispatch] = useReducer(cartReducer, []);
      const { cart, removeFromCart, clearCart, updateQuantity, totalAmount } = useCart();
      const router = useRouter();
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [paymentStatus, setPaymentStatus] = useState(null);
      const [showAddressModal, setShowAddressModal] = useState(false);
      const [userAddress, setUserAddress] = useState("");

      useEffect(() => {
            dispatch({ type: "CLEAR_CART" });
            cart.forEach((item) => {
                  dispatch({
                        type: "ADD_ITEM",
                        payload: item,
                  });
            });
      }, [cart]);

      useEffect(() => {
            const token = localStorage.getItem("authToken");
            setIsLoggedIn(!!token);
      }, []);

      const verifyAddress = () => {
            const address = localStorage.getItem("userAddress");
            if (!address) {
                  alert("No delivery address. Redirection to profile...");
                  router.push("/profile");
                  return false;
            }

            setUserAddress(address);
            setShowAddressModal(true);
      };

      const simulatePayment = async () => {
            setShowAddressModal(false);

            const isPaymentSuccessful = confirm("Payment simulation, should it be successful?");

            if (isPaymentSuccessful) {
                  setPaymentStatus("success");
                  alert("Order accepted!");

                  const userId = getUserIdFromToken();
                  if (!userId) {
                        alert("The user ID could not be found. Log in again.");
                        return;
                  }

                  const date = new Date().toISOString().split("T")[0];
                  const products = cart.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                  }));

                  try {
                        const response = await fetch("https://fakestoreapi.com/carts", {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                    userId,
                                    date,
                                    products,
                              }),
                        });

                        const result = await response.json();
                        console.log("Order submitted successfully:", result);

                        clearCart();
                  } catch (error) {
                        console.error("Error submitting order:", error);
                        alert("An error occurred while submitting your order.");
                  }
            } else {
                  setPaymentStatus("failed");
                  alert("Payment failed.");
            }
      };

      const handlePayment = () => {
            if (!isLoggedIn) {
                  alert("Log in to make a purchase.");
                  router.push("/login");
                  return;
            }

            verifyAddress();
      };

      return (
            <div className="container mx-auto p-4 min-h-96">
                  {paymentStatus === "failed" && (
                        <p className="text-red-500 mb-4 text-center">Payment failed. Please try again.</p>
                  )}
                  <div className="space-y-4">
                        {cart.length === 0 ? (
                              <p className="text-center">Your cart is empty.</p>
                        ) : (
                              <div>
                                    {cart.map((product) => (
                                          <div
                                                key={product.id}
                                                className="xl:flex justify-between items-center border p-4 rounded mb-2"
                                          >
                                                <div className="flex items-center space-x-4">
                                                      <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="w-16 h-16 object-cover"
                                                      />
                                                      <div>
                                                            <h3 className="text-lg font-semibold">{product.title}</h3>
                                                            <p className="text-gray-600">${product.price}</p>
                                                      </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                      <QuantitySelector
                                                            initialQuantity={product.quantity}
                                                            onChange={(newQuantity) => {
                                                                  updateQuantity(product.id, newQuantity);
                                                                  dispatch({
                                                                        type: "UPDATE_QUANTITY",
                                                                        payload: {
                                                                              id: product.id,
                                                                              quantity: newQuantity,
                                                                        },
                                                                  });
                                                            }}
                                                      />
                                                      <button
                                                            onClick={() => {
                                                                  removeFromCart(product.id);
                                                                  dispatch({
                                                                        type: "REMOVE_ITEM",
                                                                        payload: product.id,
                                                                  });
                                                            }}
                                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                                      >
                                                            Delete
                                                      </button>
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        )}
                  </div>

                  {cart.length > 0 && (
                        <div className="mt-4">
                              <p className="font-bold">Total amount: ${totalAmount.toFixed(2)}</p>
                              {isLoggedIn ? (
                                    <button
                                          onClick={handlePayment}
                                          className="bg-purple-500 text-white p-2 rounded mt-2 w-full hover:bg-purple-600"
                                    >
                                          Buy now
                                    </button>
                              ) : (
                                    <div className="mt-4">
                                          <p className="text-gray-600 mb-2 text-center">Log in to make a purchase.</p>
                                          <button
                                                onClick={() => router.push("/login")}
                                                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
                                          >
                                                Log in
                                          </button>
                                    </div>
                              )}
                              <button
                                    onClick={() => {
                                          clearCart();
                                          dispatch({ type: "CLEAR_CART" });
                                    }}
                                    className="bg-gray-500 text-white p-2 rounded mt-2 w-full hover:bg-gray-600"
                              >
                                    Clear cart
                              </button>
                        </div>
                  )}

                  {showAddressModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Is this address correct?</h2>
                                    <p className="mb-4">{userAddress}</p>
                                    <div className="flex justify-end space-x-4">
                                          <button
                                                onClick={() => router.push("/profile")}
                                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                          >
                                                Change address
                                          </button>
                                          <button
                                                onClick={simulatePayment}
                                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                          >
                                                Yes, it is correct
                                          </button>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}
