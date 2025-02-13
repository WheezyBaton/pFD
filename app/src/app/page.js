// src/app/page.js
"use client";

import Slider from "@/components/HomePage/Slider";
import FeaturedProducts from "@/components/HomePage/FeaturedProducts";

export default function Home() {
      return (
            <div className="">
                  <Slider />
                  <div className="mt-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64">
                        <FeaturedProducts />
                  </div>
            </div>
      );
}
