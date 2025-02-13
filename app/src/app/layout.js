// src/app/layout.js
"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
      variable: "--font-geist-sans",
      subsets: ["latin"],
});

const geistMono = Geist_Mono({
      variable: "--font-geist-mono",
      subsets: ["latin"],
});

export default function RootLayout({ children }) {
      const pathname = usePathname();

      const isAdminPage = pathname.startsWith("/admin");

      return (
            <html lang="en">
                  <body>
                        <AuthProvider>
                              <CartProvider>
                                    {!isAdminPage && <Navbar />}
                                    <main className="mt-20">{children}</main>
                                    {!isAdminPage && <Footer />}
                              </CartProvider>
                        </AuthProvider>
                  </body>
            </html>
      );
}
