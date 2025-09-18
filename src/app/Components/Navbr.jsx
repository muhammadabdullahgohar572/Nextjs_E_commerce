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
  FaSearch,
  FaUser,
  FaTimes,
  FaBars
} from "react-icons/fa";
import logo from "../imgs/christmas_2012_new_2855-removebg-preview.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const path = usePathname();
  const router = useRouter();

  // ✅ Auth Check
  const Auth = async () => {
    try {
      const UserToken = localStorage.getItem("userData");
      if (!UserToken) {
        if (!["/Pages/Login", "/Pages/Signup"].includes(path)) {
          router.push("/Pages/Login");
        }
      } else {
        const parsedData = JSON.parse(UserToken);
        setUser(parsedData);
        if (["/Pages/Login", "/Pages/Signup"].includes(path)) {
          router.push("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ API Call for Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/items/categories", { cache: "no-store" });
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const counter = () => {
    const counterItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCount(counterItems.length);
  };
  
  // ✅ Run Auth on Path change
  useEffect(() => {
    Auth();
    counter();

    window.addEventListener("cartUpdated", counter);
    return () => {
      window.removeEventListener("cartUpdated", counter);
    };
  }, [path]);

  // ✅ Dropdown Handlers
  const handleMouseEnter = () => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setDropdownTimeout(null);
    setShowDropdown(true);
  };
  
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowDropdown(false);
    }, 300);
    setDropdownTimeout(timeout);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    router.push("/Pages/Login");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaBoxOpen />, label: "Products", path: "../Pages/product" },
    { icon: <FaTags />, label: "Contact us", path: "../Pages/Deals" },
    { icon: <FaInfoCircle />, label: "About", path: "../Pages/About" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-black/95 backdrop-blur-md shadow-lg"
          : "py-3 bg-gradient-to-r from-black via-gray-900 to-black"
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 ml-6">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors">
                <FaList /> <span>Categories</span>
              </button>
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-black/95 rounded-lg shadow-md border border-gray-800 py-2 z-50">
                  {categories.length > 0 ? (
                    categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/categories/${cat}`}
                        className="block px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors hover:bg-gray-800"
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
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/Pages/Cart"
              className="relative p-2 text-gray-300 hover:text-yellow-400"
            >
              <FaShoppingCart className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* ✅ If User is Logged In */}
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/Pages/Profile"
                  className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <FaUser className="text-black text-sm" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              // ✅ If User is NOT Logged In
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  href="/Pages/Login"
                  className="px-4 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/Pages/Signup"
                  className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-yellow-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black/95 p-4 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto space-y-4">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="flex items-center space-x-3 text-gray-300 font-medium w-full py-2"
              >
                <FaList /> <span>Categories</span>
              </button>
              {mobileCatOpen && (
                <div className="mt-2 ml-6 space-y-2 border-l border-gray-700 pl-4">
                  {categories.length > 0 ? (
                    categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/categories/${cat}`}
                        className="block py-2 text-gray-400 hover:text-yellow-400 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="py-2 text-gray-500">No Categories</p>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Mobile Login/Logout */}
            {user ? (
              <div className="flex flex-col space-y-3 pt-2 border-t border-gray-800">
                <Link
                  href="/Pages/Profile"
                  className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                    <FaUser className="text-black text-sm" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors text-left"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3 pt-2 border-t border-gray-800">
                <Link
                  href="/Pages/Login"
                  className="px-4 py-2 text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/Pages/Signup"
                  className="px-4 py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}