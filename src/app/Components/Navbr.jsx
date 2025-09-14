"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaList,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import logo from "../imgs/christmas_2012_new_2855-removebg-preview.png";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileCatOpen, setMobileCatOpen] = useState(false); // NEW: mobile categories toggle

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // API Call for Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/items/categories");
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  const navLinks = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaBoxOpen />, label: "Products", path: "/products" },
    { icon: <FaTags />, label: "Deals", path: "/deals" },
    { icon: <FaInfoCircle />, label: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-0 bg-black/90 backdrop-blur-md shadow-lg"
          : "py-0 bg-gradient-to-r from-black via-gray-900 to-black"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src={logo}
                alt="Brand Logo"
                width={120}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden ml-[3%] md:flex items-center space-x-8">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Controlled Dropdown for Desktop */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                <FaList /> <span>Categories</span>
              </button>
              {showDropdown && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-black/95 rounded-lg shadow-md"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {categories.length > 0 ? (
                    categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/categories/${cat}`}
                        className="block px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No Categories</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-5">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-300 hover:text-yellow-400"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

            {/* Login and Signup Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-yellow-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/95 p-4 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto space-y-3">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Categories with Toggle */}
            <div>
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="flex items-center space-x-2 text-gray-400 font-medium w-full"
              >
                <FaList /> <span>Categories</span>
              </button>
              {mobileCatOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {categories.length > 0 ? (
                    categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/categories/${cat}`}
                        className="block text-gray-300 hover:text-yellow-400 transition-colors"
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500">No Categories</p>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Login/Signup */}
            <div className="flex flex-col space-y-2">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
