"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userData = localStorage.getItem("userData");
      
      if (!userData) {
        setError("User not found. Please log in again.");
        setLoading(false);
        return;
      }
      
      const { _id } = JSON.parse(userData);
      const response = await fetch(`/api/orders/${_id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.data);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Format date to readable string
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format currency in Pakistani Rupees
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ur-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading your orders...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchOrders}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-2 text-center"
        >
          Your Orders
        </motion.h1>
        
        <motion.p 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 text-center mb-8"
        >
          {orders.length} order{orders.length !== 1 ? "s" : ""} found
        </motion.p>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg text-center"
          >
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders yet</h3>
            <p className="text-gray-600">Your order history will appear here once you make a purchase.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {orders.map((order) => (
              <motion.div
                key={order._id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order #{order._id.slice(-6).toUpperCase()}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "delivered" 
                          ? "bg-green-100 text-green-800" 
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="text-gray-800 font-bold mt-1">
                        Total: {formatCurrency(order.total)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="font-medium text-gray-700 mb-4">Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={item._id || index} 
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-grow">
                          <h5 className="font-medium text-gray-800">{item.name}</h5>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-sm text-gray-600">Color: {item.color}</span>
                            <span className="text-sm text-gray-600">Size: {item.size}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <p className="font-medium text-gray-800">{formatCurrency(item.price)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-lg font-semibold text-gray-800">{formatCurrency(order.subtotal)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-lg font-bold text-blue-600">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Orders;