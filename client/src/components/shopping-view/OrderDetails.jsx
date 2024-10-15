import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

const OrderDetails = () => {
  return (
    <div>
      {/* we'll work on here */}
      <div>
        <div className="flex items-center justify-between mb-4 font-semibold text-md text-slate-700 ">
          <p>Order Id</p>
          <p>123456789</p>
        </div>
        <div className="flex items-center justify-between mb-4 font-semibold text-md text-slate-700 ">
          <p>Order Date</p>
          <p>12/3/24</p>
        </div>
        <div className="flex items-center justify-between mb-4 font-semibold text-md text-slate-700 ">
          <p>Order Price</p>
          <p>14000 ৳ </p>
        </div>
        <div className="flex items-center justify-between font-semibold text-md text-slate-700 ">
          <p>Order Status</p>
          <p>Pending</p>
        </div>
      </div>

      <Separator />
      <div className="mt-6">
        <p className="font-semibold text-lg">Product Details</p>
        <div className="flex items-center justify-between mt-4">
          <p>Women product </p>
          <p>1500 ৳</p>
        </div>
      </div>

      <div className="mt-6">
        <Label className="font-semibold text-lg"> Shipping Info</Label>
        <div className="mt-4 flex flex-col gap-2 text-slate-700">
          <p>Address: Bangladesh</p>
          <p>City: Dhaka</p>
          <p>Zip Code: 1207</p>
          <p>Phone: 01234567890</p>
          <p>Notes: Please deliver the package in front of the door</p>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default OrderDetails;
