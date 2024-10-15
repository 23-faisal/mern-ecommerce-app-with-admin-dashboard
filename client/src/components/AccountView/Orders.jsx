import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

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
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] px-4 py-2">Order ID</TableHead>
                <TableHead className="px-4 py-2">Order Date</TableHead>
                <TableHead className="px-4 py-2">Order Status</TableHead>
                <TableHead className="px-4 py-2">Amount</TableHead>
                <TableHead className="px-4 py-2">
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="w-[100px] px-4 py-2">INV001</TableCell>
                <TableCell className="px-4 py-2">11/10/24</TableCell>
                <TableCell className="px-4 py-2">Pending</TableCell>
                <TableCell className="px-4 py-2">$250.00</TableCell>
                <TableCell className="px-4 py-2">
                  <Button>View Details</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

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
