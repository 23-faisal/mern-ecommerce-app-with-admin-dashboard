import React from "react";
import { filterOptions } from "@/config/config";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ProductFilter = ({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  
}) => {
  const handleCheckboxChange = (optionId, isChecked, keyItem) => {
    if (isChecked) {
      if (keyItem === "category") {
        setSelectedCategories((prev) => [...prev, optionId]);
      } else {
        setSelectedBrands((prev) => [...prev, optionId]);
      }
    } else {
      if (keyItem === "category") {
        setSelectedCategories((prev) => prev.filter((cat) => cat !== optionId));
      } else {
        setSelectedBrands((prev) => prev.filter((brand) => brand !== optionId));
      }
    }
  };

  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="border-b p-4">
        <h2 className="text-lg font-sm font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <div key={keyItem} className="">
            <h3 className="text-base font-bold ">{keyItem}</h3>
            <div className="grid gap-2 mt-2">
              {filterOptions[keyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex items-center gap-2 font-medium"
                >
                  <input
                    type="checkbox"
                    id={option.id}
                    name={option.label}
                    checked={
                      keyItem === "category"
                        ? selectedCategories.includes(option.id)
                        : selectedBrands.includes(option.id)
                    }
                    onChange={(e) => {
                      handleCheckboxChange(
                        option.id,
                        e.target.checked,
                        keyItem
                      );
                    }}
                  />

                  {option.label}
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
