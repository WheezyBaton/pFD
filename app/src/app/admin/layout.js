// src/app/admin/layout.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNavbar from "@/components/Admin/AdminNavbar";

export default function AdminLayout({ children }) {
      const router = useRouter();
      const [isAuthenticated, setIsAuthenticated] = useState(false);

      useEffect(() => {
            const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
            if (!isLoggedIn) {
                  const password = prompt("Enter your administrator password:");
                  if (password === "admin123") {
                        localStorage.setItem("adminLoggedIn", "true");
                        setIsAuthenticated(true);
                  } else {
                        alert("Invalid password. Redirecting to the home page...");
                        router.push("/");
                  }
            } else {
                  setIsAuthenticated(true);
            }
      }, [router]);

      const handleLogout = () => {
            localStorage.removeItem("adminLoggedIn");
            setIsAuthenticated(false);
            router.push("/");
      };

      if (!isAuthenticated) {
            return <p className="text-center">Checking authentication...</p>;
      }

      return (
            <div>
                  <AdminNavbar onLogout={handleLogout} />
                  {children}
            </div>
      );
}
