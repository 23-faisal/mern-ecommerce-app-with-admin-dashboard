import React from "react";
import { filterOptions } from "@/config/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-sm font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem.id} className="">
            <h3 className="text-base font-bold ">{keyItem}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((options) => (
                <Label className="flex items-center gap-2 font-medium">
                  <Checkbox />
                  {options.label}
                </Label>
              ))}
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
