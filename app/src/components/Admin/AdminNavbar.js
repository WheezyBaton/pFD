// src/components/Admin/AdminNavbar.js
"use client";

import Link from "next/link";

export default function AdminNavbar({ onLogout }) {
      return (
            <div className="fixed top-0 left-0 w-full h-20 bg-gray-800 flex flex-row items-center">
                  <div className="container mx-auto flex justify-between items-center">
                        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
                        <div className="flex space-x-4 items-center">
                              <Link href="/admin/sales" className="text-white hover:text-gray-300">
                                    Reports
                              </Link>
                              <Link href="/admin/products" className="text-white hover:text-gray-300">
                                    Products
                              </Link>
                              <Link href="/admin/users" className="text-white hover:text-gray-300">
                                    Users
                              </Link>
                              <Link href="/admin/orders" className="text-white hover:text-gray-300">
                                    Orders
                              </Link>
                              <button onClick={onLogout} className="bg-red-500 text-white p-2 rounded">
                                    Logout
                              </button>
                        </div>
                  </div>
            </div>
      );
}
