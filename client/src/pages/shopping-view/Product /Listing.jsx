import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetailsDialog";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");

  // Sync state with URL query parameters
  useEffect(() => {
    const categories = searchParams.get("categories") || "";
    const brands = searchParams.get("brands") || "";
    const sort = searchParams.get("sort") || "";

    if (categories) setSelectedCategories(categories.split(","));
    if (brands) setSelectedBrands(brands.split(","));
    if (sort) setSortOption(sort);
  }, [searchParams]);

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

  // Handle filter or sort change

  const handleFilterChange = (newCategories, newBrands, newSort) => {
    const params = new URLSearchParams();

    if (newCategories.length > 0) {
      params.append("categories", newCategories.join(","));
    }
    if (newBrands.length > 0) {
      params.append("brands", newBrands.join(","));
    }
    if (newSort) {
      params.append("sort", newSort);
    }

    setSearchParams(params); // This updates the URL
  };

  // Call handleFilterChange when filters or sort options are updated
  useEffect(() => {
    handleFilterChange(selectedCategories, selectedBrands, sortOption);
  }, [selectedCategories, selectedBrands, sortOption]);

  // Handle product details dialog open
  const handleProductDetails = () => {
    setOpen(true); // Open dialog when a product is clicked
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
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
                handleProductDetails={handleProductDetails}
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
        <div>
          <ProductDetailsDialog
            open={open}
            setOpen={setOpen}
            productId={productId}
            product={product}
          />
        </div>
        <div className="p-4 grid grid-cols-1   lg:grid-cols-3 gap-4 ">
          {product?.map((product) => (
            <div key={product._id} className="">
              {/* Render product details here */}
              <ProductCard
                isLoading={isLoading}
                error={error}
                product={product}
                handleProductDetails={handleProductDetails}
                setProductId={setProductId}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
