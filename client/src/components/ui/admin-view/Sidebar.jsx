import { Shield } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../../ui/sheet";

import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";

export const adminSideBarMenuItem = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSideBarMenuItem.map((menuItem) => {
        const isActive = location.pathname === menuItem.path; // Check if the current path matches the menu item's path

        return (
          <div
            onClick={() => {
              navigate(menuItem.path);
              setOpen && setOpen(false);
            }}
            key={menuItem.id}
            className={`flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer hover:bg-muted hover:text-foreground ${
              isActive
                ? "bg-muted text-foreground font-bold"
                : "text-muted-foreground"
            }`}
          >
            {menuItem.icon}
            {menuItem.label}
          </div>
        );
      })}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full ">
            <SheetHeader className="border-b mt-5 pb-4">
              <SheetTitle className="text-2xl font-bold">
                Admin Panel
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <MenuItems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Shield size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
