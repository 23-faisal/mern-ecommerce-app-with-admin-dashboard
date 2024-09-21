import React from "react";
import { useNavigate } from "react-router-dom";

const UnAuth = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center gap-4">
      <h1 className="text-xl font-semibold ">
        You don't have any permission to access this page
      </h1>
    </div>
  );
};

export default UnAuth;
