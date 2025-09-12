"use client";
import { useState, useEffect } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaTags,
  FaList,
  FaInfoCircle,
  FaShoppingCart,
  FaUserAlt,
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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-black/90 backdrop-blur-md shadow-lg"
          : "py-4 bg-gradient-to-r from-black via-gray-900 to-black"
      }`}
    >
      <div className="container  px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent tracking-wide">
              Shopes
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden ml-[3%] md:flex items-center space-x-8">
            {[
              { icon: <FaHome />, label: "Home" },
              { icon: <FaBoxOpen />, label: "Products" },
              { icon: <FaList />, label: "Categories" },
              { icon: <FaTags />, label: "Deals" },
              { icon: <FaInfoCircle />, label: "About" },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                {item.icon} <span>{item.label}</span>
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-5">
            {/* Search Bar */}
            <div className="hidden md:flex md:ml-[6%] items-center">
              <div className="relative flex items-center w-44 bg-gray-800 rounded-full px-3 py-2 transition-all duration-300 hover:bg-gray-700">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none w-full ml-2 text-sm text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Cart */}
            <a
              href="#"
              className="relative p-2 text-gray-300 hover:text-yellow-400"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </a>

            {/* User Account */}
            <a
              href="#"
              className="hidden md:block p-2 text-gray-300 hover:text-yellow-400"
            >
              <FaUserAlt className="w-6 h-6" />
            </a>

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
            {[
              { icon: <FaHome />, label: "Home" },
              { icon: <FaBoxOpen />, label: "Products" },
              { icon: <FaList />, label: "Categories" },
              { icon: <FaTags />, label: "Deals" },
              { icon: <FaInfoCircle />, label: "About" },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className="flex items-center space-x-2 py-2 px-4 text-gray-300 hover:text-yellow-400 font-medium"
              >
                {item.icon} <span>{item.label}</span>
              </a>
            ))}

            {/* Mobile Search */}
            <div className="px-4 pt-2">
              <div className="flex items-center w-full bg-gray-800 rounded-full px-3 py-2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none w-full ml-2 text-sm text-gray-200 placeholder-gray-500"
                />
              </div>
            </div>

            {/* Mobile Account */}
            <a
              href="#"
              className="flex items-center space-x-2 py-2 px-4 text-gray-300 hover:text-yellow-400 font-medium"
            >
              <FaUserAlt /> <span>My Account</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
