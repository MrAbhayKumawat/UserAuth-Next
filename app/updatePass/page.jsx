"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "", Newpassword: "" });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let errors = {};
      let isValid = true;

      if (!formData.email.trim()) {
        errors.email = "Email is required";
        isValid = false;
      }

      if (!formData.Newpassword.trim()) {
        errors.Newpassword = "NewPassword is required";
        isValid = false;
      }

      if (!isValid) {
        setErrors(errors);
        return;
      }

      const res = await axios.put("/api/updatePass", formData);

      console.log("true block", res.data);
      if (res.data.msg == "Updated data successfully") {
        setFormData({ email: "", Newpassword: "" });
        router.push("/login");

        toast.success("Password Updated successful!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to UpdatePas. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <>
      <form className="max-w-sm mx-auto w-96" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            email
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
            htmlFor="Newpassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New password
          </label>
          <input
            type="password"
            id="Newpassword"
            name="Newpassword"
            placeholder="New password
                      "
            value={formData.Newpassword}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          {errors.Newpassword && (
            <p className="text-red-500 text-sm mt-1">{errors.Newpassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-96 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update Password
        </button>
      </form>
    </>
  );
}

export default ForgotPassword;
