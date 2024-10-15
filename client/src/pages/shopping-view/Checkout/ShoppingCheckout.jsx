import AddressForm from "@/components/AccountView/Address";
import { Button } from "@/components/ui/button";
import useAddressStore from "@/store/addressStore/useAddressStore";
import useCartStore from "@/store/cartStore/useCartStore";
import React from "react";

const ShoppingCheckout = () => {
  const { cart } = useCartStore();
  const { address } = useAddressStore();
  const cartItems = cart.items || [];
  const totalPrice = cartItems.reduce(
    (acc, item) =>
      acc + item.quantity * (item.productId.salePrice || item.productId.price),
    0
  );
  return (
    <div>
      <div>
        <img
          className="w-full h-[50vh] object-cover "
          src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="checkout image"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 mt-5 p-5 max-w-6xl mx-auto">
        <AddressForm />
        <div className=" flex flex-col gap-4 p-2 border-2 rounded-xl ">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 border rounded-md mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{item.productId.title}</h4>
                      <p className="text-gray-600">
                        {item.quantity} x{" "}
                        {item.productId.salePrice || item.productId.price} TK
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 font-semibold">
                      Total:{" "}
                      {item.quantity *
                        (item.productId.salePrice || item.productId.price)}{" "}
                      TK
                    </p>
                  </div>
                </div>
              ))}
              {/* Display the total price at the bottom */}
              <div className="mt-4 p-4 border-t flex items-center justify-between">
                <h4 className="font-semibold">Total Price:</h4>
                <p className="text-lg font-bold">{totalPrice} TK</p>
              </div>
              <div>
                <Button disabled className="w-full my-4">
                  Confirm Order
                </Button>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCheckout;
