import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/ui/auth/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminLayout from "./components/ui/admin-view/layout";
import AdminDashboard from "./pages/admin-view/Dashboard/Dashboard";
import AdminFeatures from "./pages/admin-view/Features/Features";
import AdminOrders from "./pages/admin-view/Orders/Orders";
import AdminProducts from "./pages/admin-view/Products/Products";
import PageNotFound from "./pages/page not found/PageNotFound";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/Home/Home";
import ShoppingListing from "./pages/shopping-view/Product /Listing";
import ShoppingCheckOut from "./pages/shopping-view/Checkout/CheckOut";
import ShoppingAccount from "./pages/shopping-view/Account/Account";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/un-auth/UnAuth";
import userAuthStore from "./store/authStore/userAuthStore";

function App() {
  const isAuthenticated = userAuthStore((state) => state.isAuthenticated);
  const user = userAuthStore((state) => state.user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuth />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
