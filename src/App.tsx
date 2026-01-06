import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import LegalStatus from "./pages/LegalStatus";
import Financing from "./pages/Financing";
import AdminSteps from "./pages/AdminSteps";
import Resources from "./pages/Resources";
import BusinessPlan from "./pages/BusinessPlan";
import Calendar from "./pages/Calendar";
import Auth from "./pages/Auth";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import QuizStatut from "./pages/QuizStatut";
import SimulateurCharges from "./pages/SimulateurCharges";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz-statut" element={<QuizStatut />} />
          <Route path="/simulateur-charges" element={<SimulateurCharges />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cgu" element={<CGU />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="project" element={<Project />} />
            <Route path="business-plan" element={<BusinessPlan />} />
            <Route path="legal-status" element={<LegalStatus />} />
            <Route path="admin-steps" element={<AdminSteps />} />
            <Route path="financing" element={<Financing />} />
            <Route path="resources" element={<Resources />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
