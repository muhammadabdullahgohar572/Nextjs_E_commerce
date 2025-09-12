"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";

export function AllData() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 loading state

  const DataFetch = async () => {
    try {
      setLoading(true); // start loading
      const dataget = await fetch("/api/items");
      const jsonconvert = await dataget.json();
      setData(jsonconvert.data);
      setFilteredData(jsonconvert.data);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(jsonconvert.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    DataFetch();
  }, []);

  const filterByCategory = useCallback(
    (category) => {
      setSelectedCategory(category);
      if (category === "All") {
        setFilteredData(data);
      } else {
        setFilteredData(data.filter((item) => item.category === category));
      }
    },
    [data]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3">
            Product Showcase
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of products with exclusive discounts
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-1 sm:px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-gray-900 to-black text-white font-bold shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm hover:shadow-md border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {filteredData.map((item) => (
                <ProductCard key={item._id} item={item} />
              ))}
            </div>

            {filteredData.length === 0 && (
              <div className="text-center text-gray-600 text-lg sm:text-xl mt-10 sm:mt-16 py-6 sm:py-8 bg-white rounded-xl shadow-sm">
                {data.length === 0
                  ? "No products available at the moment."
                  : "No products found in this category."}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ProductCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate discount percentage
  const price = parseFloat(item.Price);
  const discountPrice = parseFloat(item.DiscountPrice);
  const hasDiscount = discountPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <CardContainer className="inter-var h-full">
      <CardBody
        className="bg-white p-3 sm:p-5 relative group/card border border-gray-200 hover:border-gray-300 rounded-2xl h-full flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges Container */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex justify-between">
          {/* Category Tag */}
          <div className="bg-black text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            {item.category}
          </div>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </div>
          )}
        </div>

        {/* Product Image */}
        <div className="pt-3 sm:pt-4">
          <CardItem
            translateZ="100"
            rotateX={isHovered ? 10 : 0}
            rotateZ={isHovered ? -5 : 0}
            className="w-full"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
              <img
                src={item.ItemsIamge || "/placeholder.png"}
                className="h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                alt={item.ItemsDescription || "Product image"}
              />
            </div>
          </CardItem>
        </div>

        {/* Product Info */}
        <div className="mt-4 sm:mt-5 flex-1 flex flex-col">
          <CardItem
            translateZ="50"
            className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2 leading-tight h-12 sm:h-14 overflow-hidden"
          >
            {item.ItemsDescription}
          </CardItem>

          {/* Price and CTA */}
          <div className="mt-auto">
            <div className="flex items-center flex-wrap mb-2 sm:mb-3 gap-1">
              {hasDiscount ? (
                <>
                  <span className="text-lg sm:text-xl font-bold text-gray-900">
                    Rs {discountPrice.toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm line-through text-gray-400 ml-1 sm:ml-2">
                    Rs {price.toFixed(2)}
                  </span>
                  <span className="ml-auto text-xs sm:text-sm font-bold text-red-600">
                    Save Rs {(price - discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-lg sm:text-xl font-bold text-gray-900">
                  Rs {price.toFixed(2)}
                </span>
              )}
            </div>

            <CardItem
              translateZ="20"
              as="button"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors shadow-md hover:shadow-lg"
            >
              Add to Cart
            </CardItem>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
