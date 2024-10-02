import ProductFilter from "@/components/shopping-view/Filter";
import React from "react";
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

const ShoppingListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex  items-center justify-between ">
          <h1 className="text-lg font-semibold">All Products</h1>
          <div className="flex items-center gap-2 ">
            <span className="text-muted-foreground ">10 products</span>
          </div>
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
              <DropdownMenuRadioGroup>
                {sortOptions.map((option) => (
                  <DropdownMenuRadioItem key={option.id}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
