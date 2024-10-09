import {
  Baby,
  BabyIcon,
  Footprints,
  LoaderPinwheel,
  ShirtIcon,
  WatchIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import Nike from "@/assets/brandLogo/nike.png";
import Adidas from "@/assets/brandLogo/adidas.png";
import Puma from "@/assets/brandLogo/puma.png";
import Levis from "@/assets/brandLogo/levis.png";
import Zara from "@/assets/brandLogo/zara.png";
import HM from "@/assets/brandLogo/hm.png";

const categoriesWithICons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: LoaderPinwheel },
  { id: "baby", label: "Baby", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: Footprints },
];

const brandsWithImage = [
  { id: "nike", label: "Nike", image: Nike },
  { id: "adidas", label: "Adidas", image: Adidas },
  { id: "puma", label: "Puma", image: Puma },
  { id: "levi", label: "Levi's", image: Levis },
  { id: "zara", label: "Zara", image: Zara },
  { id: "h&m", label: "H&M", image: HM },
];

const HomeCard = () => {
  return (
    <div className="max-w-6xl mx-4 md:mx-2 lg:mx-auto  my-16  ">
      <h1 className="mt-10 md:mt-32 mb-10 md:mb-10 font-semibold  text-xl md:text-2xl lg:text-3xl  ">
        Shop By Category
      </h1>
      {/* category */}
      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
        {categoriesWithICons.map((item, _i) => (
          <div key={_i}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-100">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <item.icon className="w-8 md:w-12 h-8 md:h-12 mb-4 text-pretty" />
                <span className="font-semibold ">{item.label}</span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/*  */}

      {/* Shop By Brands */}

      <div className="container mx-auto px-4 lg:px-0">
        <h1 className="mt-20 mb-10 font-semibold  text-xl md:text-2xl lg:text-3xl ">
          Shop By Brands
        </h1>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          {brandsWithImage.map((item, _i) => (
            <div key={_i}>
              <Card className="cursor-pointer hover:shadow-lg transition-shadow ease-in-out duration-100">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    className="w-full h-12 sm:h-20 object-fill"
                    src={item.image}
                    alt={item.label}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/*  */}

    </div>
  );
};

export default HomeCard;
