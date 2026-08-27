/** Arrival Notebook design: route-based pages share a warm paper surface, jade wayfinding, and low-stress editorial navigation. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FeatureFlagsProvider } from "./contexts/FeatureFlagsContext";
import FeatureFlagPanel from "./components/FeatureFlagPanel";
import MobileEnquiryDock from "./components/MobileEnquiryDock";
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const ArrivalPlan = lazy(() => import("./pages/ArrivalPlan"));
const Guides = lazy(() => import("./pages/Guides"));
const Business = lazy(() => import("./pages/Business"));
const ArrivalCityRoute = lazy(() => import("./pages/CityRoute").then((module) => ({ default: module.ArrivalCityRoute })));
const BusinessCityRoute = lazy(() => import("./pages/CityRoute").then((module) => ({ default: module.BusinessCityRoute })));
const Cities = lazy(() => import("./pages/Cities"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/services" component={Services} />
    <Route path="/arrival-plan" component={ArrivalPlan} />
    <Route path="/guides" component={Guides} />
    <Route path="/business" component={Business} />
    <Route path="/arrivals/:city" component={ArrivalCityRoute} />
    <Route path="/business-cities/:city" component={BusinessCityRoute} />
    <Route path="/cities" component={Cities} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><FeatureFlagsProvider><TooltipProvider><Toaster richColors position="bottom-right" /><Suspense fallback={<main className="route-loading" aria-live="polite" aria-label="Loading page"><span>Loading route</span><i /></main>}><Router /></Suspense><MobileEnquiryDock /><FeatureFlagPanel /></TooltipProvider></FeatureFlagsProvider></ThemeProvider></ErrorBoundary>;
}
