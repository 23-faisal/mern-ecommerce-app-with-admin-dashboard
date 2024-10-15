import Address from "@/components/AccountView/Address";
import Orders from "@/components/AccountView/Orders";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ShoppingAccount = () => {
  return (
    <>
      <div>
        <img
          className="w-full h-[60vh] object-cover"
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="cloth"
        />
      </div>

      <div className="w-6xl h-auto  mx-auto mt-10 p-2 border rounded-md mb-10">
        <Tabs defaultValue="orders" className="w-[300px]  sm:w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="address">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <Orders />
          </TabsContent>
          <TabsContent value="address">
            <Address />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ShoppingAccount;
