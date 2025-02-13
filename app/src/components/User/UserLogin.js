// src/components/User/UserLogin.js
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function UserLogin() {
      const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
      const { login } = useAuth();
      const router = useRouter();

      const handleSubmit = async (e) => {
            e.preventDefault();

            const userData = { username, password };

            try {
                  const response = await fetch("https://fakestoreapi.com/auth/login", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                  });

                  const data = await response.json();

                  if (response.ok && data.token) {
                        login(data.token);
                        setMessage("Login successful! Redirecting...");
                        router.push("/");
                  } else {
                        setMessage("Login failed. Please check your credentials.");
                  }
            } catch (error) {
                  setMessage("An error occurred during login.");
                  console.error("Error:", error);
            }
      };

      return (
            <div className="container mx-auto p-4 max-w-4xl">
                  <h1 className="text-2xl font-bold mb-4">User Login</h1>
                  <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                              <label className="block text-gray-700 font-bold mb-2">Username:</label>
                              <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="border p-2 rounded w-full text-black"
                                    required
                              />
                        </div>

                        <div>
                              <label className="block text-gray-700 font-bold mb-2">Password:</label>
                              <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="border p-2 rounded w-full text-black"
                                    required
                              />
                        </div>

                        <div className="mt-4">
                              <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                                    Login
                              </button>
                        </div>
                  </form>

                  <div className="mt-4 text-center">
                        <p className="text-gray-600 mb-2">Don't have an account yet?</p>
                        <button
                              onClick={() => router.push("/register")}
                              className="bg-green-500 text-white p-2 rounded w-full"
                        >
                              Register
                        </button>
                  </div>

                  {message && <p className="mt-4 text-center text-lg">{message}</p>}
            </div>
      );
}
