"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CardBody, CardContainer, CardItem } from "../../../../components/ui/3d-card";
import Link from "next/link";

const Categories = (props) => {
  const params = useParams();
 const categoryParam = props.cat || params.cat;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 const category = decodeURIComponent(categoryParam);
  const DataFetch = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/items/categories/${category}`, { cache: "no-store" });
      const json = await res.json();

      if (json.success) {
        setData(json.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      DataFetch();
    }
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-3">
            Category: {category}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all products from {category} collection
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl border border-gray-200 h-full animate-pulse"
              >
                <div className="aspect-square rounded-xl bg-gray-200 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {data.map((item) => (
              <ProductCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {!isLoading && data.length === 0 && (
          <div className="text-center text-gray-600 text-lg sm:text-xl mt-10 sm:mt-16 py-6 sm:py-8 bg-white rounded-xl shadow-sm">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

function ProductCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const price = parseFloat(item.Price);
  const discountPrice = parseFloat(item.DiscountPrice);
  const hasDiscount = discountPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <CardContainer className="inter-var cursor-pointer h-full w-full">
      <CardBody
        className="bg-white cursor-pointer p-3 sm:p-5 relative group/card border border-gray-200 hover:border-gray-300 rounded-2xl h-full flex flex-col justify-between transition-all duration-300 ease-out hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-10 flex justify-between">
          <div className="bg-black text-white text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
            {item.category}
          </div>

          {hasDiscount && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-sm">
              {discountPercent}% OFF
            </div>
          )}
        </div>

        <div className="pt-3 sm:pt-4">
          <CardItem
            translateZ="100"
            rotateX={isHovered ? 10 : 0}
            rotateZ={isHovered ? -5 : 0}
            className="w-full"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 relative">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <img
                src={item.ItemsIamge || "/placeholder.png"}
                className={`h-full w-full object-cover group-hover/card:scale-105 transition-transform duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                alt={item.ItemsDescription || "Product image"}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </CardItem>
        </div>

        <div className="mt-4 sm:mt-5 flex-1 flex flex-col">
          <CardItem
            translateZ="50"
            className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2 leading-tight h-12 sm:h-14 overflow-hidden"
          >
            {item.ItemsDescription}
          </CardItem>

          <div className="mt-auto space-y-2">
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

            <Link href={`/moreInfromationproduct/${item._id}`}>
              <CardItem
                translateZ="15"
                as="button"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-black text-white text-xs border border-gray-300 sm:text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
              >
                View More Information
              </CardItem>
            </Link>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}
