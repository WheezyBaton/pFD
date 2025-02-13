//src/components/User/UserRegister.js
"use client";

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
      firstname: Yup.string().required("First name is required"),
      lastname: Yup.string().required("Last name is required"),
      city: Yup.string().required("City is required"),
      street: Yup.string().required("Street is required"),
      number: Yup.number()
            .positive("Number must be positive")
            .integer("Number must be an integer")
            .required("Street number is required"),
      zipcode: Yup.string().required("Zip code is required"),
      phone: Yup.string().required("Phone number is required"),
});

export default function UserRegister() {
      const [message, setMessage] = useState("");

      const handleSubmit = async (values) => {
            const userData = {
                  email: values.email,
                  username: values.username,
                  password: values.password,
                  name: {
                        firstname: values.firstname,
                        lastname: values.lastname,
                  },
                  address: {
                        city: values.city,
                        street: values.street,
                        number: values.number,
                        zipcode: values.zipcode,
                        geolocation: {
                              lat: "-37.3159",
                              long: "81.1496",
                        },
                  },
                  phone: values.phone,
            };

            try {
                  const response = await fetch("https://fakestoreapi.com/users", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify(userData),
                  });

                  const data = await response.json();

                  if (response.ok) {
                        setMessage(`User registered successfully! ID: ${data.id}`);
                  } else {
                        setMessage(`Registration failed: ${data.error || "Unknown error"}`);
                  }
            } catch (error) {
                  setMessage("An error occurred during registration.");
                  console.error("Error:", error);
            }
      };

      return (
            <div className="container mx-auto p-4 max-w-4xl">
                  <Formik
                        initialValues={{
                              email: "",
                              username: "",
                              password: "",
                              firstname: "",
                              lastname: "",
                              city: "",
                              street: "",
                              number: "",
                              zipcode: "",
                              phone: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                  >
                        <Form className="space-y-4">
                              <div className="xl:flex justify-around">
                                    <div>
                                          <p className="font-bold text-2xl text-center mb-5">
                                                Person:
                                          </p>
                                          <div className="shadow-md p-4 mt-auto mb-4">
                                                <div>
                                                      <label className="block text-gray-700 font-bold mb-2">
                                                            Email:
                                                      </label>
                                                      <Field
                                                            type="email"
                                                            name="email"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="email"
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-gray-700 font-bold mb-2">
                                                            Username:
                                                      </label>
                                                      <Field
                                                            type="text"
                                                            name="username"
                                                            className="border p-2 rounded w-full text-black"
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
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="password"
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
                                                            name="firstname"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="firstname"
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
                                                            name="lastname"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="lastname"
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-gray-700 font-bold mb-2">
                                                            Phone Number:
                                                      </label>
                                                      <Field
                                                            type="text"
                                                            name="phone"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="phone"
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                                    <div>
                                          <p className="font-bold text-2xl text-center mb-5">
                                                Adress:
                                          </p>
                                          <div className="shadow-md p-4 mt-auto mb-4">
                                                <div>
                                                      <label className="block text-gray-700 font-bold mb-2">
                                                            City:
                                                      </label>
                                                      <Field
                                                            type="text"
                                                            name="city"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="city"
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
                                                            name="street"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="street"
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-gray-700 font-bold mb-2">
                                                            Street Number:
                                                      </label>
                                                      <Field
                                                            type="number"
                                                            name="number"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="number"
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
                                                            name="zipcode"
                                                            className="border p-2 rounded w-full text-black"
                                                      />
                                                      <ErrorMessage
                                                            name="zipcode"
                                                            component="div"
                                                            className="text-red-500 text-sm"
                                                      />
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="mt-4">
                                    <button
                                          type="submit"
                                          className="bg-blue-500 text-white p-2 rounded w-full"
                                    >
                                          Register
                                    </button>
                              </div>
                        </Form>
                  </Formik>
                  {message && <p className="mt-4 text-center text-lg">{message}</p>}
            </div>
      );
}
