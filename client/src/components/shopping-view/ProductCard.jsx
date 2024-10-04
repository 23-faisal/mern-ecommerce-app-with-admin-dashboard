// ProductCard.jsx
import React from "react";
import { Card } from "@/components/ui/card"; // Adjust the import based on your UI library
import { Button } from "@/components/ui/button"; // Adjust the import based on your UI library
import loaderGif from "@/assets/loader.gif";
import Loader from "../common/loader";

const ProductCard = ({ product, isLoading, error }) => {
  // const navigate = useNavigate();

  // const handleViewDetails = () => {
  //   navigate(`/product/${product.id}`);
  // };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full">
        <img src={loaderGif} alt="Loading..." className="w-16 h-16" />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  if (product?.length === 0) {
    return <div>No products available.</div>;
  }

  return (
    <Card className="p-4 hover:shadow-lg hover:shadow-slate-500 transition ease-in-out duration-75">
      <img
        className="h-[250px] w-full object-cover "
        src={product.image}
        alt={product.title}
      />
      <h2 className="text-lg font-bold">{product.title}</h2>

      {/* brand & category */}

      <div className={`flex justify-between mt-4`}>
        <span className="text-sm font-semibold text-muted-foreground  ">
          {product?.category}
        </span>
        <span className={`text-sm font-semibold text-muted-foreground`}>
          {product?.brand}
        </span>
      </div>

      {/* price */}
      <div
        className={`${
          product.salePrice ? "justify-between" : "justify-end"
        }  flex  mt-4`}
      >
        <span
          className={`${
            product.salePrice ? "line-through text-muted-foreground " : ""
          } text-xl font-semibold`}
        >
          {product.price}
        </span>
        <span className="text-xl font-semibold">{product?.salePrice}</span>
      </div>
      <div>
        {!product && (
          <>
            <p className="text-red-500 font-bold text-sm">Out Of Stock</p>
          </>
        )}
      </div>
      <Button className="mt-6 w-full ">Add To cart</Button>
    </Card>
  );
};

export default ProductCard;
