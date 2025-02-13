// src/components/User/UserProfile.js
"use client";

import { useEffect, useState } from "react";
import EditProfileForm from "@/components/User/EditProfileForm";

export default function UserProfile({ userData }) {
      const [isEditing, setIsEditing] = useState(false);

      useEffect(() => {
            if (userData?.address) {
                  const address = `${userData.address.street} ${userData.address.number}, ${userData.address.city}, ${userData.address.zipcode}`;
                  localStorage.setItem("userAddress", address);
            }
      }, [userData]);

      if (!userData) {
            return <p>Loading user data...</p>;
      }

      return (
            <div className="space-y-8 w-96 mb-4">
                  <div>
                        <h2 className="text-xl font-semibold text-center mb-4">Personal Information</h2>
                        <div className="border p-4 rounded-lg shadow-md">
                              <p>
                                    <strong>First Name:</strong> {userData.name.firstname}
                              </p>
                              <p>
                                    <strong>Last Name:</strong> {userData.name.lastname}
                              </p>
                              <p>
                                    <strong>Email:</strong> {userData.email}
                              </p>
                              <p>
                                    <strong>Username:</strong> {userData.username}
                              </p>
                              <p>
                                    <strong>Phone:</strong> {userData.phone}
                              </p>
                        </div>
                  </div>
                  <div>
                        <h2 className="text-xl font-semibold text-center mb-4">Address</h2>
                        <div className="border p-4 rounded-lg shadow-md">
                              <p>
                                    <strong>City:</strong> {userData.address.city}
                              </p>
                              <p>
                                    <strong>Street:</strong> {userData.address.street}
                              </p>
                              <p>
                                    <strong>Number:</strong> {userData.address.number}
                              </p>
                              <p>
                                    <strong>Zip Code:</strong> {userData.address.zipcode}
                              </p>
                        </div>
                  </div>

                  <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                        Edit Profile
                  </button>

                  {isEditing && <EditProfileForm userData={userData} onClose={() => setIsEditing(false)} />}
            </div>
      );
}
