import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductFilter from "@/components/shopping-view/Filter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config/config";
import axios from "axios";
import ProductCard from "@/components/shopping-view/ProductCard";

const fetchProducts = async (filters) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/products`,
    { params: filters }
  );
  return response?.data?.data;
};

const ShoppingListing = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", selectedCategories, selectedBrands, sortOption],
    queryFn: () =>
      fetchProducts({
        categories: selectedCategories.join(","),
        brands: selectedBrands.join(","),
        sort: sortOption,
      }),
    enabled: true,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between ">
          <h1 className="text-lg font-semibold">All Products</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-1"
                size="sm"
                variant="outline"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                Sort By
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] ">
              <DropdownMenuRadioGroup
                value={sortOption}
                onValueChange={setSortOption}
              >
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.id} value={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="p-4 grid grid-cols-1   lg:grid-cols-3 gap-4 ">
          {product?.map((product) => (
            <div key={product._id} className="">
              {/* Render product details here */}
              <ProductCard
                isLoading={isLoading}
                error={error}
                product={product}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
