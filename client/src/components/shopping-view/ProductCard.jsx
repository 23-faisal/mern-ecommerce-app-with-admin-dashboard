// ProductCard.jsx
import React from "react";
import { Card } from "@/components/ui/card"; // Adjust the import based on your UI library
import { Button } from "@/components/ui/button"; // Adjust the import based on your UI library
import useCartStore from "@/store/cartStore/useCartStore";
import useAuthStore from "@/store/authStore/userAuthStore";

const ProductCard = ({
  product,
  isLoading,
  error,
  handleProductDetails,
  setProductId,
}) => {
  const { cart, addToCart } = useCartStore();
  const { user } = useAuthStore();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <div>Error: {error.message}</div>;

  if (product?.length === 0) {
    return <div>No products available.</div>;
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(user.id, product._id, 1); // Pass userId, productId, and quantity
    }
  };

  // see product is available in the cart

  const cartItems = cart?.items;

  return (
    <Card className="p-4 hover:shadow-lg hover:shadow-slate-500 transition ease-in-out duration-75">
      <div
        onClick={() => {
          setProductId(product._id);
          handleProductDetails();
        }}
      >
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
      </div>

      {cart?.items?.find((item) => item.productId._id === product._id) ? (
        // If the product exists in the cart, show some other button or text
        <Button disabled className="mt-6 w-full ">
          Already added in the cart
        </Button>
      ) : (
        // If the product does not exist in the cart, show Add to Cart button
        <Button onClick={handleAddToCart} className="mt-6 w-full ">
          Add To Cart
        </Button>
      )}
    </Card>
  );
};

export default ProductCard;
