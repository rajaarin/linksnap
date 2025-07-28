import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserLogin from "pages/user-login";
import UserRegistration from "pages/user-registration";
import UrlShorteningHome from "pages/url-shortening-home";
import QrCodeGenerator from "pages/qr-code-generator";
import LinkManagementDashboard from "pages/link-management-dashboard";
import PaymentFailed from "pages/payment-failed";
import NotFound from "pages/NotFound";
import RedirectPage from "pages/redirect-page";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UrlShorteningHome />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/url-shortening-home" element={<UrlShorteningHome />} />
        <Route path="/:shortCode" element={<RedirectPage />} /> {/* New route for short links */}
        <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
        <Route path="/link-management-dashboard" element={<LinkManagementDashboard />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
