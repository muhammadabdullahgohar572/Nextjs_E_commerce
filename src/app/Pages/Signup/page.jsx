"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaLock,
  FaPhone,
  FaEnvelope,
  FaHome,
  FaCity,
  FaVenusMars,
} from "react-icons/fa";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    PhoneNumber: "", // ✅ backend ke sath match
    email: "",
    address: "",
    city: "",
    Gender: "Male", // ✅ backend ke sath match
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/Signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const response = await res.json();
      if (res.ok && response.message === "Account created successfully") {
        localStorage.setItem("userData", JSON.stringify(response.data));
        toast.success("🎉 Signup Successful!", {
          position: "top-center",
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(response.message || "Signup Failed ❌", {
          position: "top-center",
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-center",
        theme: "dark",
      });
    }
  };

  // Animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1688561809321-e51e8a4d6651?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // ✅ ecommerce image
      }}
    >
      <div className="absolute inset-0 "></div>
      <ToastContainer />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-black/80 p-10 rounded-2xl shadow-2xl w-[70%] max-w-5xl backdrop-blur-lg"
      >
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl font-extrabold text-center text-white mb-10 tracking-wider"
        >
          🛒 Create Your E-Commerce Account
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "username", icon: <FaUser />, type: "text", placeholder: "Username" },
            { name: "password", icon: <FaLock />, type: "password", placeholder: "Password" },
            { name: "PhoneNumber", icon: <FaPhone />, type: "text", placeholder: "Phone Number" }, // ✅
            { name: "email", icon: <FaEnvelope />, type: "email", placeholder: "Email" },
            { name: "address", icon: <FaHome />, type: "text", placeholder: "Address" },
            { name: "city", icon: <FaCity />, type: "text", placeholder: "City" },
          ].map((field, i) => (
            <motion.div
              key={field.name}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex items-center border-b border-gray-500 py-3"
            >
              <span className="text-white mr-3">{field.icon}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full bg-transparent text-white focus:outline-none"
              />
            </motion.div>
          ))}

          {/* Gender */}
          <motion.div
            custom={6}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex items-center border-b border-gray-500 py-3 col-span-1 md:col-span-2"
          >
            <FaVenusMars className="text-white mr-3" />
            <select
              name="Gender" // ✅ backend match
              value={formData.Gender}
              onChange={handleChange}
              className="w-full bg-transparent text-white focus:outline-none"
            >
              <option className="bg-black" value="Male">Male</option>
              <option className="bg-black" value="Female">Female</option>
              <option className="bg-black" value="Other">Other</option>
            </select>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#22c55e", color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="col-span-1 md:col-span-2 bg-white text-black py-4 rounded-lg font-bold mt-6 shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
