import { Routes, Route } from "react-router-dom";
import Homepage from "../Component/Homepge/Homepage";
import Login from "../Component/Login/Login";
import Signup from "../Component/Signup/Signup";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Brands from "../pages/Brands";
import BrandDetail from "../pages/BrandDetail";
import ProductListing from "../pages/ProductListing";
import ProductDetail from "../pages/ProductDetail";
import Deals from "../pages/Deals";
import Cart from "../pages/Cart";
import TrackOrder from "../pages/TrackOrder";
import OrderConfirmation from "../pages/OrderConfirmation";
import MainLayout from "../layouts/MainLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route element={<MainLayout />}>
        <Route path="/categories" element={<Categories />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/brands/:brandSlug" element={<BrandDetail />} />
        <Route path="/shop/:category" element={<ProductListing />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Route>
    </Routes>
  );
}
