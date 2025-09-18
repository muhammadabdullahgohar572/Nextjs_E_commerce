"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lens } from "../../../components/ui/lens";
import Beams from "./Beams";
import Rays from "./Rays";

const MoreInformation = (props) => {
  const params = useParams();
  const router = useRouter();
  const id = props.id || params.id;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [hovering, setHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cart, setcart] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/items/${id}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, [id]);

  const add_cart = (item) => {
    try {
      let existingCart = [...cart];

      const itemExist = existingCart.some(
        (cartitems) => cartitems._id === item._id
      );

      if (itemExist) {
        // 🔹 remove item
        existingCart = existingCart.filter(
          (cartitems) => cartitems._id !== item._id
        );
      } else {
        // 🔹 add item
        existingCart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      setcart(existingCart);

      // 🔹 Notify Navbar instantly
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setcart(savedCart);
  }, []);

  const allImages = data ? [data.ItemsIamge] : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center mx-auto"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Homepage
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-[2%] bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back to Homepage Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
          className="mb-6 flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Homepage
        </motion.button>

        {/* Product Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Image Gallery */}
          <div className="md:w-1/2 p-6">
            <div
              className="relative rounded-xl overflow-hidden mb-4 flex items-center justify-center"
              style={{ minHeight: "400px", height: "auto" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Rays />
                    <Beams />
                    <Lens hovering={hovering} setHovering={setHovering}>
                      <div className="relative w-full h-full flex items-center justify-center">
                        {!imageLoaded && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                        <img
                          src={allImages[selectedImage]}
                          alt={data.Name}
                          className="w-auto max-w-full h-auto max-h-[400px] object-contain rounded-xl"
                          onLoad={() => setImageLoaded(true)}
                          style={{ display: imageLoaded ? "block" : "none" }}
                        />
                      </div>
                    </Lens>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Discount Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10"
              >
                {Math.round(
                  ((data.Price - data.DiscountPrice) / data.Price) * 100
                )}
                % OFF
              </motion.div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto py-2">
              {allImages.map((img, index) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden flex-shrink-0 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-6 md:p-8">
            <motion.h1
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              {data.Name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 mb-6"
            >
              {data.ItemsDescription}
            </motion.p>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center mb-4"
            >
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(data.Rating)
                        ? "fill-current"
                        : "stroke-current"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                {data.Rating} • {data.Reviews.length} reviews
              </span>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center mb-6"
            >
              <span className="text-3xl font-bold text-gray-900">
                ${data.DiscountPrice}
              </span>
              <span className="ml-3 text-lg text-gray-500 line-through">
                ${data.Price}
              </span>
            </motion.div>

            {/* Color Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex space-x-2">
                {data.Colors.map((color, index) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => setSelectedColor(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Size Selection */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
              <div className="flex space-x-3">
                {data.Size.map((size, index) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === index
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-700"
                    }`}
                    onClick={() => setSelectedSize(index)}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Quantity Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center mb-6"
            >
              <h3 className="text-sm font-medium text-gray-900 mr-4">
                Quantity
              </h3>
              <div className="flex items-center border rounded-lg">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </motion.button>
                <span className="px-4 py-1">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() =>
                    quantity < data.Stock && setQuantity(quantity + 1)
                  }
                >
                  +
                </motion.button>
              </div>
              <span className="ml-4 text-sm text-gray-500">
                {data.Stock} available
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="flex space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => add_cart(data)}
                className={`flex-1 py-3 px-6 rounded-lg font-medium shadow-md 
                  ${
                    cart.some((cartitems) => cartitems._id === data._id)
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                {cart.some((cartitems) => cartitems._id === data._id)
                  ? "Remove from Cart"
                  : "Add to Cart"}
              </motion.button>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-medium">SKU</p>
                  <p>{data.SKU}</p>
                </div>
                <div>
                  <p className="font-medium">Brand</p>
                  <p>{data.Brand}</p>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <p>{data.category}</p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-green-600">{data.Status}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MoreInformation;
