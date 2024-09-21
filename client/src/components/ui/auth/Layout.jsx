import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex items-center justify-center bg-black w-1/2 px-12 ">
        <div className="max-w-md space-y-6 text-center text-primary ">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to ShoppingX
          </h1>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
