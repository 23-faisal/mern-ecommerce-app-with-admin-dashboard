import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import OrderDetailsOnAdminSide from "@/components/ui/admin-view/OrderDetails";

const AdminOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  return (
    <div className="w-full">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Show Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>12/10/12</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>14000 ৳ </TableCell>
            <TableCell>
              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => setOpenDetailsDialog(!openDetailsDialog)}
              >
                <Button onClick={() => setOpenDetailsDialog(true)}>
                  View Details
                </Button>
                <OrderDetailsOnAdminSide />
              </Dialog>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrders;
