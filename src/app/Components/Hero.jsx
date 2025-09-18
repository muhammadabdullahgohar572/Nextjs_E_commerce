"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AllData } from "./Cards";

const slideData = [
  {
    title: "Summer Collection",
    description: "Up to 40% off on new summer arrivals",
    src: "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Modern Electronics",
    description: "Latest gadgets with exclusive deals",
    src: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Home Essentials",
    description: "Upgrade your living space today",
    src: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    title: "Urban Fashion",
    description: "Trendy outfits for modern lifestyles",
    src: "https://plus.unsplash.com/premium_photo-1661964205360-b0621b5a9366?q=80&w=838&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
];

const Hero_Section = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
  };

  return (
    <>
      <div className="w-full relative">
        <Slider {...settings}>
          {slideData.map((slide, index) => (
            <div key={index} className="relative">
              {/* Background Image */}
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-[500px] object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center ">
                <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl mt-2 drop-shadow-md">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Hero_Section;
