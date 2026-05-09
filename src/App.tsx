import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import GrainOverlay from "./components/GrainOverlay";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import { useLenis } from "./hooks/useLenis";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppInner() {
  useLenis();
  const [preloaded, setPreloaded] = useState(false);

  return (
    <>
      <Preloader onDone={() => setPreloaded(true)} />
      <GrainOverlay />
      <CustomCursor />
      <ScrollProgress />
      <Toaster />
      <Sonner />
      {preloaded && <AnimatedRoutes />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
