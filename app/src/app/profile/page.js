// src/app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import UserProfile from "@/components/User/UserProfile";
import OrderHistory from "@/components/User/OrderHistory";
import { decodeToken } from "@/utils/decodeToken";
import { useFetch } from "@/hooks/useFetch";

export default function ProfilePage() {
      const [userData, setUserData] = useState(null);
      const [error, setError] = useState(null);
      const token = localStorage.getItem("authToken");
      const decodedToken = token ? decodeToken(token) : null;
      const userId = decodedToken?.sub;

      const {
            data: fetchedUserData,
            loading: userLoading,
            error: userError,
      } = useFetch(userId ? `https://fakestoreapi.com/users/${userId}` : null);

      useEffect(() => {
            if (fetchedUserData) {
                  setUserData(fetchedUserData);
            }
      }, [fetchedUserData]);

      useEffect(() => {
            if (userError) {
                  setError(userError.message);
            } else if (!token) {
                  setError("The user is not logged in.");
            } else if (!userId) {
                  setError("Invalid token: missing user ID.");
            }
      }, [userError, token, userId]);

      if (userLoading) {
            return <p className="text-center">Loading user data...</p>;
      }

      if (error) {
            return <p className="text-red-500 text-center">{error}</p>;
      }

      if (!userData) {
            return <p className="text-center">No user data found.</p>;
      }

      return (
            <div className="container mx-auto p-4 xl:flex justify-around xl:mt-56 mb-80">
                  <UserProfile userData={userData} />
                  <OrderHistory userId={userData.id} />
            </div>
      );
}
