/** Arrival Notebook design: route-based pages share a warm paper surface, jade wayfinding, and low-stress editorial navigation. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ArrivalPlan from "./pages/ArrivalPlan";
import Guides from "./pages/Guides";
import Business from "./pages/Business";
import { ArrivalCityRoute, BusinessCityRoute } from "./pages/CityRoute";
import Cities from "./pages/Cities";
import NotFound from "./pages/NotFound";

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
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster richColors position="bottom-right" /><Router /></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
