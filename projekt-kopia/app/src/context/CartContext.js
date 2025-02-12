// src/context/CartContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
      return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
      const [cart, setCart] = useState([]);

      useEffect(() => {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                  setCart(JSON.parse(savedCart));
            }
      }, []);

      useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

      const addToCart = (product) => {
            setCart((prevCart) => {
                  const existingProduct = prevCart.find((item) => item.id === product.id);
                  if (existingProduct) {
                        return prevCart.map((item) =>
                              item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                        );
                  } else {
                        return [...prevCart, { ...product, quantity: product.quantity }];
                  }
            });
      };

      const removeFromCart = (productId) => {
            setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
      };

      const clearCart = () => {
            setCart([]);
      };

      const updateQuantity = (productId, quantity) => {
            setCart((prevCart) =>
                  prevCart.map((item) => (item.id === productId ? { ...item, quantity: quantity } : item))
            );
      };

      const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

      return (
            <CartContext.Provider
                  value={{
                        cart,
                        addToCart,
                        removeFromCart,
                        clearCart,
                        updateQuantity,
                        totalAmount,
                  }}
            >
                  {children}
            </CartContext.Provider>
      );
};
