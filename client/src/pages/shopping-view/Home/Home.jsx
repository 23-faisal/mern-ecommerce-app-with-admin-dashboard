import ImageSlider from "@/components/HomeView/Carosel";
import FeaturedProduct from "@/components/HomeView/FeaturedProduct";
import HomeCard from "@/components/HomeView/HomeCard";

import React from "react";

const ShoppingHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full h-[30vh] md:h-[60vh] ">
        <ImageSlider />
      </div>
      <div className="flex-grow">
        <HomeCard />
      </div>
      <div>
        <FeaturedProduct />
      </div>
    </div>
  );
};

export default ShoppingHome;
