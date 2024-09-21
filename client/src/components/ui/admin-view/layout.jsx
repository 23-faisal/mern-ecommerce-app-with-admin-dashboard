import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar />
      <div className="flex flex-1 flex-col ">
        {/* admin header */}
        <AdminHeader />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
