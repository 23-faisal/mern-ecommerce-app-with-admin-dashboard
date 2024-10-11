import Address from "@/components/AccountView/Address";
import Orders from "@/components/AccountView/Orders";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const ShoppingAccount = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 ">
      <Tabs
        defaultValue="account"
        className="  w-[300px] sm:w-[500px] md:w-[800px] "
      >
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
  );
};

export default ShoppingAccount;
