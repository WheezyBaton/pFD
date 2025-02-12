// src/components/Navbar/Navbar.js
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/Navbar/SearchBar";

export default function Navbar() {
      const router = useRouter();
      const { isLoggedIn, logout } = useAuth();
      const { cart } = useCart();
      const [open, setOpen] = useState(false);

      return (
            <div className="fixed top-0 left-0 w-full h-20 bg-white shadow-md z-50 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                  <div className="h-full flex items-center justify-between md:hidden gap-4">
                        <Link href="/">
                              <div className="text-2xl tracking-wide">FakeStore</div>
                        </Link>
                        <SearchBar />
                        <div className="">
                              <Image
                                    src="/menu.png"
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="cursor-pointer"
                                    onClick={() => setOpen((prev) => !prev)}
                              />
                              {open && (
                                    <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-10">
                                          <Link href="/">HomePage</Link>
                                          <Link href="/products">Shop</Link>
                                          <Link href="/cart">Cart ({cart.length})</Link>
                                          {isLoggedIn ? (
                                                <>
                                                      <Link href="/profile">Profile</Link>
                                                      <Link href="/" onClick={logout}>
                                                            Logout
                                                      </Link>
                                                </>
                                          ) : (
                                                <Link href="/login">Login</Link>
                                          )}
                                    </div>
                              )}
                        </div>
                  </div>
                  <div className="hidden md:flex items-center justify-between gap-8 h-full">
                        <Link href="/" className="">
                              <div className="text-2xl tracking-wide">FakeStore</div>
                        </Link>
                        <SearchBar />
                        <div className="flex items-center gap-4">
                              <div className="flex items-center gap-4">
                                    <button
                                          onClick={() => router.push("/products")}
                                          className="relative p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                          Shop
                                    </button>
                                    <button
                                          onClick={() => router.push("/cart")}
                                          className="relative p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                          Cart ({cart.length})
                                    </button>
                              </div>
                              {isLoggedIn ? (
                                    <div className="flex items-center gap-4">
                                          <button
                                                onClick={() => router.push("/profile")}
                                                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                          >
                                                Profile
                                          </button>
                                          <button
                                                onClick={logout}
                                                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                          >
                                                Logout
                                          </button>
                                    </div>
                              ) : (
                                    <button
                                          onClick={() => router.push("/login")}
                                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                          Log in
                                    </button>
                              )}
                        </div>
                  </div>
            </div>
      );
}
