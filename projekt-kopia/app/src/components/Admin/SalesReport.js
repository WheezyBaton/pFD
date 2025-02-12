// src/components/Admin/SalesReport.js
"use client";

import { useEffect, useState } from "react";

export default function SalesReport() {
      const [orders, setOrders] = useState([]);
      const [startDate, setStartDate] = useState("2019-12-10");
      const [endDate, setEndDate] = useState("2020-10-10");

      const fetchOrders = async () => {
            try {
                  const response = await fetch(
                        `https://fakestoreapi.com/carts?startdate=${startDate}&enddate=${endDate}`
                  );
                  const data = await response.json();
                  setOrders(data);
            } catch (error) {
                  console.error("Error downloading orders:", error);
            }
      };

      useEffect(() => {
            fetchOrders();
      }, [startDate, endDate]);

      const totalSales = orders.reduce((total, order) => {
            return total + order.products.length;
      }, 0);

      return (
            <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">Sales report</h2>
                  <div className="mb-4">
                        <label className="block text-gray-700">Start date</label>
                        <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="border p-2 rounded"
                        />
                  </div>
                  <div className="mb-4">
                        <label className="block text-gray-700">End date:</label>
                        <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="border p-2 rounded"
                        />
                  </div>
                  <div className="mt-4">
                        <p className="text-lg">
                              <strong>Number of orders:</strong> {orders.length}
                        </p>
                        <p className="text-lg">
                              <strong>Total sales:</strong> {totalSales} products
                        </p>
                  </div>
            </div>
      );
}
