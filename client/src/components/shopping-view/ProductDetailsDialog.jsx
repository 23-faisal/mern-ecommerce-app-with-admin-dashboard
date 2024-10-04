// src/components/shopping-view/ProductDetailsDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";

const ProductDetailsDialog = ({ open, setOpen, productId, product }) => {
  const selectedProduct = product?.find((p) => p._id === productId);

  if (!selectedProduct) {
    return null;
  }

  return (
    <Dialog className="rounded-xl" open={open} onOpenChange={setOpen}>
      <DialogContent className=" flex flex-col  md:grid md:grid-cols-2 md:gap-8 sm:p-12 max-w-[90vw] h-auto">
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <div>
          <img
            height={600}
            width={600}
            className="w-full h-60 md:h-full  rounded-lg aspect-square object-cover "
            src={selectedProduct.image}
            alt={selectedProduct.image}
          />
        </div>
        <div className="flex flex-col gap-4 ">
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold">
              {selectedProduct?.title}
            </h1>
            <p className="text-primary mt-4 overflow-y-auto max-h-[100px] md:max-h-[400px]">
              {selectedProduct?.description}
            </p>
          </div>

          {/* price */}
          <div
            className={`${
              selectedProduct.salePrice ? "justify-between" : "justify-end"
            }  flex  `}
          >
            <p
              className={`${
                selectedProduct.salePrice
                  ? "line-through text-muted-foreground "
                  : ""
              } text-xl font-semibold`}
            >
              {selectedProduct.price}
            </p>
            <p className="text-xl font-semibold">
              {selectedProduct?.salePrice}
            </p>
          </div>

          {/*  */}
          <div className={`flex justify-between`}>
            <span className="text-sm font-semibold text-muted-foreground  ">
              {selectedProduct?.category}
            </span>
            <span className={`text-sm font-semibold text-muted-foreground`}>
              {selectedProduct?.brand}
            </span>
          </div>
          {/*  */}

          {/*  */}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className=" h-4 w-4 md:h-5 md:w-5 fill-primary" />
              <StarIcon className=" h-4 w-4 md:h-5 md:w-5 fill-primary" />
              <StarIcon className=" h-4 w-4 md:h-5 md:w-5 fill-primary" />
              <StarIcon className=" h-4 w-4 md:h-5 md:w-5 fill-primary" />
              <StarIcon className=" h-4 w-4 md:h-5 md:w-5 fill-primary" />
            </div>
            <p className="font-semibold md:text-xl "> (4.8)</p>
          </div>
          {/*  */}
          <div>
            <Button className="w-full ">Add to Cart</Button>
          </div>
          {/*  */}

          <Separator />

          <div>
            <h1 className="text-xl md:text-2xl font-extrabold">Review</h1>
            <div className="mt-4 overflow-y-auto max-h-[100px] md:max-h-[200px]">
              <div className="grid gap-4">
                {/*  */}

                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="font-bold">FA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-semibold ">Faisal Ahmed</h1>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                    </div>
                    <p>
                      Ideal for everyday use or special events, our footwear is
                      the perfect blend of elegance and practicality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="font-bold">KH</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-semibold ">Kakashi Hatake</h1>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                    </div>
                    <p>
                      Ideal for everyday use or special events, our footwear is
                      the perfect blend of elegance and practicality.
                    </p>
                  </div>
                </div>
                {/*  */}
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="font-bold">DA</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="font-semibold ">D. Ace</h1>
                    <div className="flex items-center gap-0.5">
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                      <StarIcon className="h-4 w-4 fill-primary" />
                    </div>
                    <p>
                      Designed with a focus on both fashion and function, these
                      shoes offer excellent support .
                    </p>
                  </div>
                  {/*  */}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
