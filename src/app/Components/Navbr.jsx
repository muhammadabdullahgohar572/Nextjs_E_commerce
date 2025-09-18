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
  FaBars,
  FaChevronDown,
  FaEnvelope,
} from "react-icons/fa";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
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
        // Fallback categories for demo
        setCategories(["Electronics", "Clothing", "Home", "Sports", "Books"]);
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

  // ✅ Search Handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
      setShowSearch(false);
    }
  };

  const navLinks = [
    { icon: <FaHome className="text-sm" />, label: "Home", path: "/" },
    {
      icon: <FaBoxOpen className="text-sm" />,
      label: "Products",
      path: "/Pages/product",
    },
    {
      icon: <FaTags className="text-sm" />,
      label: "Contact us",
      path: "/Pages/Deals",
    },
    {
      icon: <FaInfoCircle className="text-sm" />,
      label: "About",
      path: "/Pages/About",
    },
  ];

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2 bg-black/95 backdrop-blur-md shadow-lg"
            : "py-3 bg-gradient-to-r from-black via-gray-900 to-black"
        }`}
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 text-gray-300 hover:text-yellow-400 mr-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>

              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-yellow-400">
                  SHOPMATE
                </span>
              </Link>
            </div>

            {/* Desktop Search Bar - Always Visible */}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.path}
                  className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 font-medium transition-colors py-2 text-sm xl:text-base"
                >
                  {item.icon} <span>{item.label}</span>
                </Link>
              ))}

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 font-medium transition-colors py-2 text-sm xl:text-base">
                  <FaList className="text-sm" /> <span>Categories</span>{" "}
                  <FaChevronDown className="text-xs" />
                </button>
                {showDropdown && (
                  <div className="absolute left-0 mt-2 w-48 bg-black/95 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                    {categories.length > 0 ? (
                      categories.map((cat, idx) => (
                        <Link
                          key={idx}
                          href={`/categories/${cat}`}
                          className="block px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors hover:bg-gray-800 text-sm"
                        >
                          {cat}
                        </Link>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500 text-sm">
                        Loading categories...
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Search Button - Mobile */}
              <button
                className="md:hidden p-2 text-gray-300 hover:text-yellow-400"
                onClick={() => setShowSearch(!showSearch)}
              >
                <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/Pages/Cart"
                className="relative p-2 text-gray-300 hover:text-yellow-400"
              >
                <FaShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* ✅ If User is Logged In */}
              {user ? (
                <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                  {/* User Dropdown (only info, no logout) */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 p-2">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                        <FaUser className="text-black text-xs md:text-sm" />
                      </div>
                      <span className="font-medium text-sm hidden xl:block">
                        {user.username}
                      </span>
                    </button>

                    {/* User Info Dropdown */}
                    <div className="absolute right-0 mt-2 w-64 bg-black/95 rounded-lg shadow-xl border border-gray-700 py-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="font-medium text-white text-sm">
                          Welcome back!
                        </p>
                      </div>
                      <div className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                            <FaUser className="text-black text-sm" />
                          </div>
                          <div>
                            <p className="font-medium text-white text-sm">
                              {user.username}
                            </p>
                            <p className="text-gray-400 text-xs flex items-center">
                              <FaEnvelope className="mr-1 text-xs" />{" "}
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Logout Button alag se */}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 bg-red-600 text-white text-xs rounded-md hover:bg-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // ✅ If User is NOT Logged In
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    href="/Pages/Login"
                    className="px-2 py-1 text-gray-300 hover:text-yellow-400 font-medium transition-colors text-xs md:text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/Pages/Signup"
                    className="px-2 py-1 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors text-xs md:text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          {showSearch && (
            <div className="md:hidden mt-3">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 pl-4 pr-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 p-1"
                >
                  <FaSearch className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Content */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 bg-black/95 p-4 rounded-lg shadow-lg max-h-[70vh] overflow-y-auto space-y-4 absolute left-4 right-4 top-full">
            {/* User Info if logged in */}
            {user && (
              <div className="flex items-center space-x-3 pb-3 border-b border-gray-800">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <FaUser className="text-black text-xs" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center">
                    <FaEnvelope className="mr-1 text-xs" /> {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.path}
                className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 font-medium transition-colors py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} <span>{item.label}</span>
              </Link>
            ))}

            {/* Mobile Categories */}
            <div>
              <button
                onClick={() => setMobileCatOpen(!mobileCatOpen)}
                className="flex items-center space-x-3 text-gray-300 font-medium w-full py-2 justify-between text-sm"
              >
                <div className="flex items-center space-x-3">
                  <FaList className="text-sm" /> <span>Categories</span>
                </div>
                <FaChevronDown
                  className={`transition-transform text-xs ${
                    mobileCatOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileCatOpen && (
                <div className="mt-2 ml-6 space-y-2 border-l border-gray-700 pl-4">
                  {categories.length > 0 ? (
                    categories.map((cat, idx) => (
                      <Link
                        key={idx}
                        href={`/categories/${cat}`}
                        className="block py-2 text-gray-400 hover:text-yellow-400 transition-colors text-sm"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setMobileCatOpen(false);
                        }}
                      >
                        {cat}
                      </Link>
                    ))
                  ) : (
                    <p className="py-2 text-gray-500 text-sm">
                      Loading categories...
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ✅ Mobile Login/Logout */}
            <div className="pt-3 border-t border-gray-800 space-y-3">
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-500 transition-colors text-center text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/Pages/Login"
                    className="block py-2 text-center text-gray-300 hover:text-yellow-400 font-medium transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/Pages/Signup"
                    className="block py-2 text-center bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-400 transition-colors text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <div className="h-16 lg:h-14"></div>
    </>
  );
}
