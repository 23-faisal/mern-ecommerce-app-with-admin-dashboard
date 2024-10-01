import { HousePlug, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useAuthStore from "@/store/authStore/userAuthStore";
import { shoppingViewMenuItem } from "@/config/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";

const MenuItems = ({ onMenuItemClick }) => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 items-center gap-6 lg:flex-row ">
      {shoppingViewMenuItem.map((menu) => (
        <div key={menu.id}>
          <Link className="text-sm font-medium" to={menu.path}>
            {menu.label}
          </Link>
        </div>
      ))}
      <div className="flex flex-col gap-4 lg:hidden">
        <Button
          onClick={() => {
            navigate("/shop/account");
          }}
          variant="outline"
          className="flex items-center gap-2 bg-green-500 text-white "
        >
          <ShoppingCart />
          Cart
        </Button>
        <Button
          onClick={() => {
            navigate("/shop/account");
          }}
          variant="outline"
          className="flex items-center gap-2 bg-teal-500 text-white "
        >
          <User />
          Account
        </Button>
        <Button
          onClick={logout}
          variant="outline"
          className="flex items-center gap-2 bg-red-500 text-white "
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </nav>
  );
};

const HeaderRight = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline">
        <ShoppingCart /> <span className="sr-only">User cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black cursor-pointer">
            <AvatarFallback className="text-white uppercase font-extrabold bg-black">
              {user.userName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Logged in as: {user.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <User />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const sheetCloseRef = useRef();
  const handleMenuItemClick = (e) => {
    e.preventDefault();
    sheetCloseRef.current.close();
  };

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex items-center h-16 justify-between px-4 md:px-6">
        <Link
          className="flex items-center gap-2 text-teal-500  "
          to="/shop/home"
        >
          <HousePlug className="h-6 w-6 " />
          <span className="font-bold text-2xl ">SoppingX</span>
        </Link>
        {/* Show Menu in Navbar when screen is large */}
        <div className="hidden lg:flex items-center gap-6">
          <MenuItems /> {/* Show menu items and logout button */}
        </div>

        {/* Mobile Menu using Sheet component */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <MenuItems onMenuItemClick={handleMenuItemClick} />
              <SheetFooter>
                <SheetClose ref={sheetCloseRef} asChild></SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navbar right */}
        <div className="hidden lg:block">
          <HeaderRight />
        </div>
      </div>
    </div>
  );
};

export default ShoppingHeader;
