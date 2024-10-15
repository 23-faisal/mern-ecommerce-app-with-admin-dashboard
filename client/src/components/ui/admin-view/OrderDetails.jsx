import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";

import { Button } from "../button";

import { Separator } from "../separator";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const OrderDetailsOnAdminSide = () => {
  const [status, setStatus] = useState("Pending");

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const getStatusColor = () => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "In Process":
        return "bg-blue-500 text-white";
      case "Is Shipping":
        return "bg-teal-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>See order details</DialogDescription>
        </DialogHeader>
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
        <div>
          <p className="font-semibold text-lg">Product Details</p>
          <div className="flex items-center justify-between mt-4">
            <p>Women product </p>
            <p>1500 ৳</p>
          </div>
          <div>
            <div className="mt-5">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className={`w-full ${getStatusColor()}`}>
                  <span>{status}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Is Shipping">Is Shipping</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className='w-full mt-4'>Update Form Status</Button>
          </div>
        </div>
        {/*  */}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </div>
  );
};

export default OrderDetailsOnAdminSide;
