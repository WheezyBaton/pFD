// src/components/HomePage/Slider.js
"use client";

import { useState, useLayoutEffect } from "react";
import Image from "next/image";

const slides = [
      {
            id: 1,
            title: "Electronics",
            description: "Sale! up to 50% off!",
            img: "https://images.pexels.com/photos/33278/disc-reader-reading-arm-hard-drive.jpg?auto=compress&cs=tinysrgb&w=1200",
            bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
      },
      {
            id: 2,
            title: "Jewelery",
            description: "Sale! up to 50% off!",
            img: "https://images.pexels.com/photos/1670723/pexels-photo-1670723.jpeg?auto=compress&cs=tinysrgb&w=1200",
            bg: "bg-gradient-to-r from-pink-50 to-blue-50",
      },
      {
            id: 3,
            title: "Men Clothing Colletions",
            description: "Sale! up to 50% off!",
            img: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=1200",
            bg: "bg-gradient-to-r from-blue-50 to-green-50",
      },
      {
            id: 4,
            title: "Women Clothing Colletions",
            description: "Sale! up to 50% off!",
            img: "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=1200",
            bg: "bg-gradient-to-r from-green-50 to-yellow-50",
      },
];

const Slider = () => {
      const [current, setCurrent] = useState(0);

      useLayoutEffect(() => {
            const interval = setInterval(() => {
                  setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            }, 5000);
            return () => clearInterval(interval);
      }, []);

      return (
            <div className="h-[calc(100vh-80px)] overflow-hidden relative">
                  <div
                        className="w-max h-full flex transition-all ease-in-out duration-1000"
                        style={{ transform: `translateX(-${current * 100}vw)` }}
                  >
                        {slides.map((slide) => (
                              <div className={`${slide.bg} w-screen h-full flex flex-col xl:flex-row`} key={slide.id}>
                                    <div className="w-full xl:w-1/2 h-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center p-4">
                                          <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
                                          <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
                                                {slide.title}
                                          </h1>
                                    </div>
                                    <div className="w-full xl:w-1/2 h-1/2 xl:h-full relative">
                                          <Image src={slide.img} alt="" fill sizes="100%" className="object-cover" />
                                    </div>
                              </div>
                        ))}
                  </div>

                  <div className="absolute m-auto left-1/2 bottom-8 flex gap-4 transform -translate-x-1/2">
                        {slides.map((slide, index) => (
                              <div
                                    className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center transition-transform duration-300 ${
                                          current === index ? "scale-150" : ""
                                    }`}
                                    key={slide.id}
                                    onClick={() => setCurrent(index)}
                              >
                                    {current === index && (
                                          <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
                                    )}
                              </div>
                        ))}
                  </div>
            </div>
      );
};

export default Slider;
