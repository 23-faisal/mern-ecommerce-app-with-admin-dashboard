import React from "react";
import { Button } from "@/components/ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import useAuthStore from "@/store/authStore/userAuthStore";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/auth/login");
  };
  return (
    
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(!open)} className="lg:hidden">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogOut}
          className="inline-flex gap-2 items-center rounded-md px-4 font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
