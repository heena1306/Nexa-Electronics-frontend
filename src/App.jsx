import React from "react";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import NexaToast from "./components/NexaToast";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <CartProvider>
      <AppRoutes />
      <NexaToast />
    </CartProvider>
  );
}

export default App;
