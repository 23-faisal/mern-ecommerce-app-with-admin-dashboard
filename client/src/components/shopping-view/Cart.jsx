import React from "react";
import useCartStore from "@/store/cartStore/useCartStore";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import useAuthStore from "@/store/authStore/userAuthStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItem } =
    useCartStore();
  const { user } = useAuthStore();
  const numberOfItems = cart?.items?.length || 0;
  const navigate = useNavigate();

  const cartItems = cart?.items;

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.quantity * item.productId.price,
    0
  );

  const totalSalePrice = cartItems?.reduce(
    (acc, item) =>
      acc + item.quantity * (item.productId.salePrice || item.productId.price),
    0
  );

  return (
    <div>
      {/* cart sheet */}
      <div className=" ">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="relative" variant="outline">
              <ShoppingCart /> <span className="sr-only">User cart</span>
              {numberOfItems > 0 && (
                <span
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center"
                  style={{ transform: "translate(50%, -50%)" }}
                >
                  {numberOfItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            className="xl:w-[500px] xl:max-w-none sm:w-[600px] sm:max-w-[600px]  w-full "
            side="right"
          >
            <SheetHeader>
              <SheetTitle className="font-bold text-2xl ">Cart </SheetTitle>
              <SheetDescription className="font-semibold pb-6">
                All your selected products are here.
              </SheetDescription>
            </SheetHeader>

            <div className=" h-[80vh] overflow-y-auto">
              {/* Cart items for larger screen */}
              <div className="space-y-4 max-h-90vh hidden sm:block">
                {cartItems?.length > 0 ? (
                  cartItems?.map((item, _i) => (
                    <div
                      key={_i}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h4 className="font-semibold">
                            {item.productId.title}
                          </h4>
                          {/* Remove item from cart */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              removeItem(user.id, item.productId._id);
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>

                        {/*  */}
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Decrease quantity */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            decreaseQuantity(user.id, item.productId._id);
                          }}
                          disabled={item.quantity === 1} // Disable if quantity is 1 to avoid going below 1
                        >
                          <Minus />
                        </Button>

                        {/* Display quantity */}
                        <span>{item.quantity}</span>

                        {/* Increase quantity */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            increaseQuantity(user.id, item.productId._id);
                          }}
                        >
                          <Plus size={16} />
                        </Button>
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">
                            {!item.productId.salePrice
                              ? item.quantity * item.productId.price
                              : item.quantity * item.productId.salePrice}{" "}
                            TK.
                          </p>

                          {item.productId.salePrice && (
                            <>
                              <p className="text-sm text-red-600 line-through font-semibold">
                                {item.quantity * item.productId.price}
                                TK.
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>

              {/* cart for smaller screen */}

              <div className="space-y-4 max-h-90vh sm:hidden">
                {cartItems?.length > 0 ? (
                  cartItems?.map((item, _i) => (
                    <div
                      key={_i}
                      className="flex items-center justify-between p-1 border rounded-md"
                    >
                      <div className="flex items-center space-x-1">
                        <img
                          src={item.productId.image}
                          alt={item.productId.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex flex-col items-start gap-2">
                          <h4 className="font-semibold">
                            {item.productId.title}
                          </h4>
                          <div className="flex items-center gap-3">
                            {/* Decrease quantity */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                decreaseQuantity(user.id, item.productId._id);
                              }}
                              disabled={item.quantity === 1} // Disable if quantity is 1 to avoid going below 1
                            >
                              <Minus />
                            </Button>

                            {/* Display quantity */}
                            <span>{item.quantity}</span>

                            {/* Increase quantity */}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                increaseQuantity(user.id, item.productId._id);
                              }}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                          {/* Remove item from cart */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              removeItem(user.id, item.productId._id);
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>

                        {/*  */}
                      </div>
                      <div className="flex items-center space-x-2">
                        <div>
                          <p className="text-sm text-gray-600 font-semibold">
                            {!item.productId.salePrice
                              ? item.quantity * item.productId.price
                              : item.quantity * item.productId.salePrice}{" "}
                            TK
                          </p>

                          {item.productId.salePrice && (
                            <>
                              <p className="text-sm text-red-600 line-through font-semibold">
                                {item.quantity * item.productId.price} TK
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>

              {/*  */}

              {/* Total Prices at the Bottom */}
              {totalSalePrice ? (
                <>
                  <div className="mt-4 p-4 border-t">
                    {/* <div className="flex justify-between">
                <h4 className="font-semibold">Total Price:</h4>
                <p>{totalPrice} TK</p>
              </div> */}
                    <div className="flex justify-between">
                      <h4 className="font-semibold">Total Price:</h4>
                      <div className="flex items-center gap-4">
                        {!(totalPrice === totalSalePrice) && (
                          <>
                            <p className="text-red-500">
                              (Saved total{" "}
                              {Math.ceil(
                                ((totalPrice - totalSalePrice) /
                                  totalSalePrice) *
                                  100
                              )}
                              %)
                            </p>
                          </>
                        )}
                        <p className="font-semibold">{totalSalePrice} TK</p>
                      </div>
                    </div>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button
                          onClick={() => navigate("/shop/checkout")}
                          className="w-full mt-4"
                        >
                          Checkout
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <SheetFooter>
              <SheetClose asChild></SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Cart;
