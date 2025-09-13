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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaBoxOpen />, label: "Products", path: "/products" },
    { icon: <FaList />, label: "Categories", path: "/categories" },
    { icon: <FaTags />, label: "Deals", path: "/deals" },
    { icon: <FaInfoCircle />, label: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-black/90 backdrop-blur-md shadow-lg"
          : "py-4 bg-gradient-to-r from-black via-gray-900 to-black"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent tracking-wide">
              Shopes
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

        {/* Mobile Menu */}
        <div
          className={`md:hidden mt-3 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="py-4 space-y-4 bg-black/95 rounded-lg shadow-md">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 py-2 px-4 text-gray-300 hover:text-yellow-400 font-medium"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Account Actions */}
            <div className="px-4 pt-2 border-t border-gray-800">
              <Link
                href="/login"
                className="block w-full text-center py-2 mb-2 text-gray-300 font-medium border border-gray-700 rounded-md hover:border-yellow-400 hover:text-yellow-400 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block w-full text-center py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
