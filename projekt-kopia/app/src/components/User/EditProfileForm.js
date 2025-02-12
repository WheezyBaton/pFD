// src/components/User/EditProfileForm.js
"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      name: Yup.object({
            firstname: Yup.string().required("First name is required"),
            lastname: Yup.string().required("Last name is required"),
      }),
      address: Yup.object({
            city: Yup.string().required("City is required"),
            street: Yup.string().required("Street is required"),
            number: Yup.number()
                  .typeError("The number must be a number")
                  .positive("The number must be positive")
                  .required("Number is required"),
            zipcode: Yup.string().required("Zip code is required"),
      }),
      phone: Yup.string().required("Phone number is required"),
});

export default function EditProfileForm({ userData, onClose }) {
      const [message, setMessage] = useState("");

      const handleSubmit = async (values) => {
            try {
                  const response = await fetch(`https://fakestoreapi.com/users/${userData.id}`, {
                        method: "PATCH",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(values),
                  });

                  if (!response.ok) {
                        throw new Error("Failed to update user details.");
                  }

                  const data = await response.json();
                  setMessage("User data has been updated!");
                  console.log("Updated data:", data);
            } catch (error) {
                  setMessage(`Error: ${error.message}`);
            }
      };

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
                        <Formik
                              initialValues={{
                                    email: userData.email,
                                    username: userData.username,
                                    password: "",
                                    name: {
                                          firstname: userData.name.firstname,
                                          lastname: userData.name.lastname,
                                    },
                                    address: {
                                          city: userData.address.city,
                                          street: userData.address.street,
                                          number: userData.address.number,
                                          zipcode: userData.address.zipcode,
                                    },
                                    phone: userData.phone,
                              }}
                              validationSchema={validationSchema}
                              onSubmit={handleSubmit}
                        >
                              {({ isSubmitting }) => (
                                    <Form className="">
                                          <div className="xl:flex justify-center gap-8">
                                                <div className="">
                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Username:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="username"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="username"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Password:
                                                            </label>
                                                            <Field
                                                                  type="password"
                                                                  name="password"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="password"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>
                                                </div>
                                                <div className="">
                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Email:
                                                            </label>
                                                            <Field
                                                                  type="email"
                                                                  name="email"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="email"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  First Name:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="name.firstname"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="name.firstname"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Last Name:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="name.lastname"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="name.lastname"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Phone:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="phone"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="phone"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>
                                                </div>
                                                <div className="">
                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  City:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="address.city"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="address.city"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Street:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="address.street"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="address.street"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Number:
                                                            </label>
                                                            <Field
                                                                  type="number"
                                                                  name="address.number"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="address.number"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>

                                                      <div>
                                                            <label className="block text-gray-700 font-bold mb-2">
                                                                  Zip Code:
                                                            </label>
                                                            <Field
                                                                  type="text"
                                                                  name="address.zipcode"
                                                                  className="w-full p-2 border rounded-lg"
                                                            />
                                                            <ErrorMessage
                                                                  name="address.zipcode"
                                                                  component="div"
                                                                  className="text-red-500 text-sm"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          {message && (
                                                <p className="text-green-500 text-sm text-center mt-4">{message}</p>
                                          )}

                                          <div className="flex justify-center space-x-4 mt-4">
                                                <button
                                                      type="button"
                                                      onClick={onClose}
                                                      className="bg-gray-500 text-white p-2 rounded"
                                                >
                                                      Cancel
                                                </button>
                                                <button
                                                      type="submit"
                                                      disabled={isSubmitting}
                                                      className="bg-blue-500 text-white p-2 rounded"
                                                >
                                                      {isSubmitting ? "Saving..." : "Save"}
                                                </button>
                                          </div>
                                    </Form>
                              )}
                        </Formik>
                  </div>
            </div>
      );
}
