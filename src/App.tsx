import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { LOCALES } from "./i18n/config";
import { LocaleProvider } from "./i18n/LocaleProvider";

const queryClient = new QueryClient();

export const AppRoutes = () => (
  <LocaleProvider>
    <Layout>
      <Routes caseSensitive>
        {LOCALES.map(({ prefix, code }) => [
          <Route key={`${code}-home`} path={prefix ? `${prefix}/` : "/"} element={<Index />} caseSensitive />,
          <Route key={`${code}-services`} path={`${prefix}/our-services`} element={<Services />} caseSensitive />,
          <Route key={`${code}-about`} path={`${prefix}/about-us`} element={<About />} caseSensitive />,
          <Route key={`${code}-contact`} path={`${prefix}/contact-us`} element={<Contact />} caseSensitive />,
        ])}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </LocaleProvider>
);

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
