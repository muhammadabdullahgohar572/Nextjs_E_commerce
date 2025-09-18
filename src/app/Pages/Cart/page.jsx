"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaShoppingCart,
  FaTrash,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaCheck,
  FaExclamationTriangle,
  FaStore,
  FaCreditCard,
  FaUser,
  FaShoppingBag,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [userData, setUserData] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const route = useRouter();

  // Load cart and user data
  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);
      const getData = JSON.parse(localStorage.getItem("cart")) || [];
      setCartData(getData);

      const user = JSON.parse(localStorage.getItem("userData")) || {};
      setUserData(user);

      calculateTotals(getData);

      // Simulate loading for better UX
      setTimeout(() => setIsLoading(false), 500);
    };

    loadData();
  }, []);

  const calculateTotals = (cartItems) => {
    const subTotal = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.DiscountPrice || item.Price || 0);
      const quantity = parseInt(item.quantity || 1);
      return sum + price * quantity;
    }, 0);

    setSubtotal(subTotal);
    setTotal(subTotal);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = cartData.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    // Animation for removal
    const itemElement = document.getElementById(`cart-item-${id}`);
    if (itemElement) {
      itemElement.classList.add("fade-out");
      setTimeout(() => {
        const updatedCart = cartData.filter((item) => item._id !== id);
        setCartData(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        calculateTotals(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
      }, 300);
    }
  };

  const clearCart = () => {
    const cartContainer = document.getElementById("cart-items-container");
    if (cartContainer) {
      cartContainer.classList.add("fade-out");
      setTimeout(() => {
        setCartData([]);
        localStorage.setItem("cart", JSON.stringify([]));
        calculateTotals([]);
        window.dispatchEvent(new Event("cartUpdated"));
      }, 500);
    }
  };

  // Handle color selection
  const selectColor = (id, color) => {
    const updatedCart = cartData.map((item) =>
      item._id === id ? { ...item, selectedColor: color } : item
    );

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setValidationErrors((prev) => prev.filter((error) => error.itemId !== id));
  };

  // Handle size selection
  const selectSize = (id, size) => {
    const updatedCart = cartData.map((item) =>
      item._id === id ? { ...item, selectedSize: size } : item
    );

    setCartData(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setValidationErrors((prev) => prev.filter((error) => error.itemId !== id));
  };

  // Validate cart before checkout
  const validateCart = () => {
    const errors = [];

    cartData.forEach((item) => {
      if (item.Colors && item.Colors.length > 0 && !item.selectedColor) {
        errors.push({
          itemId: item._id,
          message: `Please select a color for ${item.Name}`,
        });
      }

      if (item.Size && item.Size.length > 0 && !item.selectedSize) {
        errors.push({
          itemId: item._id,
          message: `Please select a size for ${item.Name}`,
        });
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!userData || !userData.id) {
      alert("Please log in to proceed with checkout");
      return;
    }

    if (!validateCart()) {
      return;
    }

    setIsCheckingOut(true);
    const orderData = {
      userId: userData.id,
      username: userData.username,
      email: userData.email,
      PhoneNumber: userData.phoneNumber,
      items: cartData.map((item) => ({
        productId: item._id,
        name: item.Name,
        quantity: item.quantity ? parseInt(item.quantity, 10) : 1, // ✅ Default 1
        price: item.DiscountPrice || item.Price,
        color: item.selectedColor,
        size: item.selectedSize,
        image: item.ItemsIamge,
      })),

      subtotal: subtotal,
      total: total,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage(
          `Order placed successfully for ${
            userData.username
          }! Total: Rs-${total.toFixed(2)}`
        );

        // Success animation
        setTimeout(() => {
          clearCart();
          setIsCheckingOut(false);
          route.push("/");
        }, 2000);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
      setIsCheckingOut(false);
    }
  };

  const formatCurrency = (value) => {
    if (isNaN(value) || value === null || value === undefined) {
      return "0.00";
    }
    return value.toFixed(2);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="flex space-x-4">
                      <div className="w-24 h-24 bg-gray-300 rounded"></div>
                      <div className="flex-1 space-y-3">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="fixed top-20 right-4 z-50 animate-bounce-in">
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg">
              <div className="flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                <p>{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center mb-6">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300 transform hover:-translate-x-1"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold ml-4 flex items-center">
            <FaShoppingBag className="mr-3 text-blue-600" /> Shopping Cart
          </h1>
        </div>

        {cartData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
            <div className="flex justify-center">
              <div className="relative">
                <FaShoppingCart className="text-6xl text-gray-300 mb-4" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  0
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <FaStore className="mr-2" /> Browse Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div
                id="cart-items-container"
                className="bg-white rounded-lg shadow-md overflow-hidden animate-fade-in"
              >
                <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                  <h2 className="text-xl font-semibold flex items-center">
                    <FaShoppingCart className="mr-2 text-blue-600" /> Cart Items
                    ({cartData.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 flex items-center transition-colors duration-300 transform hover:scale-105"
                  >
                    <FaTrash className="mr-1" /> Clear Cart
                  </button>
                </div>

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 animate-shake">
                    <div className="flex items-center">
                      <FaExclamationTriangle className="text-red-500 mr-2" />
                      <h3 className="text-red-800 font-medium">
                        Please complete your selections:
                      </h3>
                    </div>
                    <ul className="mt-2 list-disc list-inside text-red-700">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="divide-y">
                  {cartData.map((item) => {
                    const hasColorError = validationErrors.some(
                      (error) =>
                        error.itemId === item._id &&
                        error.message.includes("color")
                    );
                    const hasSizeError = validationErrors.some(
                      (error) =>
                        error.itemId === item._id &&
                        error.message.includes("size")
                    );

                    return (
                      <div
                        id={`cart-item-${item._id}`}
                        key={item._id}
                        className="p-4 flex flex-col sm:flex-row items-start transition-all duration-300 animate-fade-in"
                      >
                        <img
                          src={item.ItemsIamge}
                          alt={item.Name}
                          className="w-24 h-24 object-cover rounded-lg mr-4 shadow-md transition-transform duration-300 hover:scale-105"
                        />

                        <div className="flex-grow mb-4 sm:mb-0">
                          <h3 className="text-lg font-semibold hover:text-blue-600 transition-colors">
                            {item.Name}
                          </h3>
                          <p className="text-gray-600">{item.Brand}</p>

                          {/* Color Selection */}
                          <div className="mt-2">
                            <p className="text-sm font-medium">Color:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.Colors &&
                                item.Colors.map((color) => (
                                  <button
                                    key={color}
                                    onClick={() => selectColor(item._id, color)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                                      item.selectedColor === color
                                        ? "ring-2 ring-blue-500 scale-110"
                                        : "ring-1 ring-gray-300"
                                    } ${
                                      hasColorError
                                        ? "ring-2 ring-red-500 animate-pulse"
                                        : ""
                                    }`}
                                    style={{
                                      backgroundColor: color.toLowerCase(),
                                    }}
                                    title={color}
                                  >
                                    {item.selectedColor === color && (
                                      <FaCheck className="mx-auto text-white text-xs" />
                                    )}
                                  </button>
                                ))}
                            </div>
                            {hasColorError && (
                              <p className="text-red-500 text-xs mt-1 animate-pulse">
                                Please select a color
                              </p>
                            )}
                          </div>

                          {/* Size Selection */}
                          <div className="mt-2">
                            <p className="text-sm font-medium">Size:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {item.Size &&
                                item.Size.map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => selectSize(item._id, size)}
                                    className={`px-3 py-1 text-sm border rounded transition-all duration-200 ${
                                      item.selectedSize === size
                                        ? "bg-blue-500 text-white border-blue-500 scale-105"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    } ${
                                      hasSizeError
                                        ? "border-red-500 ring-2 ring-red-500 animate-pulse"
                                        : ""
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                            </div>
                            {hasSizeError && (
                              <p className="text-red-500 text-xs mt-1 animate-pulse">
                                Please select a size
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  (item.quantity || 1) - 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <FaMinus />
                            </button>
                            <span className="px-3 py-1 bg-white min-w-[2rem] text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <FaPlus />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-semibold">
                              Rs-
                              {formatCurrency(
                                (item.DiscountPrice || item.Price || 0) *
                                  (item.quantity || 1)
                              )}
                            </p>
                            {item.DiscountPrice &&
                              item.DiscountPrice < item.Price && (
                                <p className="text-sm text-gray-500 line-through">
                                  Rs-
                                  {formatCurrency(
                                    (item.Price || 0) * (item.quantity || 1)
                                  )}
                                </p>
                              )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700 p-2 transition-colors duration-300 transform hover:scale-110"
                            aria-label="Remove item"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 animate-fade-in-up">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-blue-600" /> Order Summary
                </h2>

                {userData && userData.id && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="font-medium flex items-center">
                      <FaUser className="mr-2 text-blue-600" /> Shipping to:
                    </p>
                    <p className="mt-1">{userData.username}</p>
                    <p>{userData.email}</p>
                    {userData.phoneNumber && <p>{userData.phoneNumber}</p>}
                  </div>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartData.length} items)</span>
                    <span>Rs-{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-blue-600">
                      Rs-{formatCurrency(total)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Inclusive of all taxes
                  </p>
                </div>

                <button
                  onClick={handleCheckout}
                  className={`w-full py-3 rounded-lg font-semibold mb-4 transition-all duration-300 flex items-center justify-center ${
                    validationErrors.length > 0
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
                  } ${isCheckingOut ? "animate-pulse" : ""}`}
                  disabled={validationErrors.length > 0 || isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="mr-2" /> Proceed to Checkout
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  You won't be charged until the next step
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(50px);
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateY(10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeIn 0.7s ease-out forwards;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out;
        }
        .fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Cart;
