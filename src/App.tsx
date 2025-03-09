import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Import DesignerUploadPage
const DesignerUploadPage = lazy(() => import("./pages/designer/upload"));

// Lazy load pages for better performance
const MarketplacePage = lazy(() => import("./pages/marketplace"));
const ProductDetailPage = lazy(() => import("./pages/product/[id]"));
const LoginPage = lazy(() => import("./pages/login"));
const SignUpPage = lazy(() => import("./pages/signup"));
const ProfilePage = lazy(() => import("./pages/profile"));
const DesignerDashboardPage = lazy(() => import("./pages/designer/dashboard"));
const DesignerDesignsPage = lazy(() => import("./pages/designer/designs"));
const DropshipperDashboardPage = lazy(
  () => import("./pages/dropshipper/dashboard"),
);
const DropshipperOrdersPage = lazy(() => import("./pages/dropshipper/orders"));
const DropshipperProductsPage = lazy(
  () => import("./pages/dropshipper/products"),
);
const AdminDashboardPage = lazy(() => import("./pages/admin/dashboard"));
const AdminOrdersPage = lazy(() => import("./pages/admin/orders"));
const AdminUsersPage = lazy(() => import("./pages/admin/users"));
const CheckoutPage = lazy(() => import("./pages/checkout"));

// New pages
const PrivacyPage = lazy(() => import("./pages/privacy"));
const TermsPage = lazy(() => import("./pages/terms"));
const CookiesPage = lazy(() => import("./pages/cookies"));
const HowItWorksPage = lazy(() => import("./pages/how-it-works"));
const PricingPage = lazy(() => import("./pages/pricing"));
const BlogPage = lazy(() => import("./pages/blog"));
const ContactPage = lazy(() => import("./pages/contact"));
const FAQPage = lazy(() => import("./pages/faq"));
const ShippingPage = lazy(() => import("./pages/shipping"));
const HelpPage = lazy(() => import("./pages/help"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="w-24 h-24 mb-4 relative">
            <div className="absolute inset-0 border-8 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-8 border-t-transparent border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin animation-delay-150"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">🖨️</span>
            </div>
          </div>
          <p className="text-lg font-medium text-gray-700">
            Preparing your 3D experience...
          </p>
          <div className="mt-2 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 animate-progress"></div>
          </div>
        </div>
      }
    >
      <>
        {/* Tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/designer/dashboard"
            element={<DesignerDashboardPage />}
          />
          <Route path="/designer/designs" element={<DesignerDesignsPage />} />
          <Route path="/designer/upload" element={<DesignerUploadPage />} />
          <Route
            path="/dropshipper/dashboard"
            element={<DropshipperDashboardPage />}
          />
          <Route
            path="/dropshipper/orders"
            element={<DropshipperOrdersPage />}
          />
          <Route
            path="/dropshipper/products"
            element={<DropshipperProductsPage />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* New routes */}
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/help" element={<HelpPage />} />

          {/* Add the tempobook route for Tempo platform */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
