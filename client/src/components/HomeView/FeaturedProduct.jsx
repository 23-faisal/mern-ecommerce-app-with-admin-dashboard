import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import useCartStore from "@/store/cartStore/useCartStore";
import useAuthStore from "@/store/authStore/userAuthStore";
import ProductDetailsDialog from "../shopping-view/ProductDetailsDialog";

const getFeaturedProducts = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/shop/products/latest-products`
  );
  return response.data;
};

const FeaturedProduct = () => {
  const { cart, addToCart } = useCartStore(); // Access cart and addToCart function from the store
  const { user } = useAuthStore(); // Get the user from the auth store
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog open/close
  const [selectedProductId, setSelectedProductId] = useState(null); // Track selected product ID

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["featuredProduct"],
    queryFn: getFeaturedProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (products?.length === 0) {
    return <div>No featured products available.</div>;
  }

  // Function to handle adding items to cart
  const handleAddToCart = (productId) => {
    if (user && productId) {
      addToCart(user.id, productId, 1); // Add product to cart with default quantity of 1
    }
  };

  // Function to open the dialog with the selected product
  const handleCardClick = (productId) => {
    setSelectedProductId(productId); // Set the selected product ID
    setDialogOpen(true); // Open the dialog
  };

  return (
    <div className="max-w-6xl mx-2 md:mx-auto mb-10">
      <h1 className="mt-10 mb-10 font-semibold text-xl md:text-2xl lg:text-3xl">
        Featured Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products?.data?.map((product) => {
          // Check if the product is already in the cart
          const isInCart = cart?.items?.find(
            (item) => item.productId._id === product._id
          );

          return (
            <div key={product._id}>
              <Card
                onClick={() => handleCardClick(product._id)}
                className="p-4 hover:shadow-lg hover:shadow-slate-500 transition ease-in-out duration-75"
              >
                <div>
                  <img
                    className="h-[250px] w-full object-cover"
                    src={product.image}
                    alt={product.title}
                  />
                  <h2 className="text-lg font-bold">{product.title}</h2>

                  {/* Brand & category */}
                  <div className="flex justify-between mt-4">
                    <span className="text-sm font-semibold text-muted-foreground">
                      {product?.category}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {product?.brand}
                    </span>
                  </div>

                  {/* Price */}
                  <div
                    className={`flex mt-4 ${
                      product.salePrice ? "justify-between" : "justify-end"
                    }`}
                  >
                    <span
                      className={`${
                        product.salePrice
                          ? "line-through text-muted-foreground"
                          : ""
                      } text-xl font-semibold`}
                    >
                      {product.price}
                    </span>
                    {product.salePrice && (
                      <span className="text-xl font-semibold">
                        {product?.salePrice}
                      </span>
                    )}
                  </div>

                  {/* Check stock */}
                  {product.totalStock === 0 && (
                    <p className="text-red-500 font-bold text-sm">
                      Out Of Stock
                    </p>
                  )}
                </div>

                {/* Add to cart or already in cart button */}
                {isInCart ? (
                  <Button disabled className="mt-6 w-full">
                    Already added to cart
                  </Button>
                ) : (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event
                      handleAddToCart(product._id);
                    }}
                    className="mt-6 w-full"
                  >
                    Add To Cart
                  </Button>
                )}
              </Card>
            </div>
          );
        })}
      </div>
      {/* Render the ProductDetailsDialog */}
      {selectedProductId && (
        <ProductDetailsDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          productId={selectedProductId}
          product={products?.data}
        />
      )}
    </div>
  );
};

export default FeaturedProduct;
