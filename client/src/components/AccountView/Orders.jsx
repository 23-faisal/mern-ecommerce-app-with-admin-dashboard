import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Orders = () => {
  return (
    <div>
      <Card className=" w-[300px] sm:w-[500px] md:w-[800px]">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>All your orders are here</CardDescription>
        </CardHeader>
        <CardContent>
          {/* we'll work on here */}

          {/*  */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Orders;
