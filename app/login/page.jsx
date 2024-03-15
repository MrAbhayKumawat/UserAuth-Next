"use client"
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from 'next/navigation';
function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Form validation logic
            let errors = {};
            let isValid = true;

            if (!formData.email.trim()) {
                errors.email = "Email is required";
                isValid = false;
            }

            if (!formData.password.trim()) {
                errors.password = "Password is required";
                isValid = false;
            }

            // If form is invalid, set errors and return
            if (!isValid) {
                setErrors(errors);
                return;
            }

            const res = await axios.post("/api/login", formData);

            // Form is valid, proceed with form submission
            
            // Check if login was successful
            if (true) {
                // Reset form data
                setFormData({ email: "", password: "" });
                localStorage.setItem("userinfo",JSON.stringify(res.data))
                router.push("/profile");
                
                // Show success message
                toast.success("Login successful!");
            } else {
                // Show error message
                toast.error("Incorrect email or password");
            }
        } catch (error) {
            // Handle form submission error
            console.error("Form submission error:", error);
            // Show error message
            toast.error("Failed to login. Please try again later.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear validation error for the field
    };

    return (
        <>
            <form className="max-w-sm mx-auto w-96" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@flowbite.com"
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Your password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5"></div>
                    <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Don't have an account?
                        <Link href={"/register"} className="text-blue-600">
                            Register
                        </Link>
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
