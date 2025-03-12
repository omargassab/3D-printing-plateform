import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/rtl.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import { LanguageProvider } from "./lib/i18n";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Force cart to be loaded from localStorage on initial page load
const initCart = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      console.log("Initial cart load from localStorage:", parsedCart);
    } catch (error) {
      console.error("Error parsing saved cart on init:", error);
      localStorage.removeItem("cart");
    }
  }
};

initCart();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
