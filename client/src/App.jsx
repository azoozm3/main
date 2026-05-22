import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { ProtectedRoute, PublicOnlyRoute } from "@/components/auth/RouteGuards";
import { Navbar } from "@/components/Navbar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "@/lib/queryClient";
import NotFound from "@/pages/NotFound";
import PatientChatbot from "@/pages/PatientChatbot";
import ProfilePage from "@/pages/ProfilePage";
import { protectedRoutes, publicRoutes } from "@/routes/routeConfig";

function AppRouter() {
  return (
    <Switch>
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} component={() => <PublicOnlyRoute component={component} />} />
      ))}

      {protectedRoutes.map(({ path, component, allowedRoles }) => (
        <Route
          key={path}
          path={path}
          component={() => <ProtectedRoute component={component} allowedRoles={allowedRoles} />}
        />
      ))}

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  useEffect(() => {
    const profileHandler = () => setProfileOpen(true);
    const chatbotHandler = () => setChatbotOpen(true);

    window.addEventListener("open-profile-modal", profileHandler);
    window.addEventListener("open-chatbot-modal", chatbotHandler);

    return () => {
      window.removeEventListener("open-profile-modal", profileHandler);
      window.removeEventListener("open-chatbot-modal", chatbotHandler);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen overflow-x-hidden bg-background font-sans antialiased selection:bg-primary/20">
          <Navbar />
          <AppRouter />

          <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
            <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-4xl">
              <ProfilePage />
            </DialogContent>
          </Dialog>

          <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
            <DialogContent className="h-[85vh] overflow-hidden p-0 sm:max-w-4xl">
              <PatientChatbot onClose={() => setChatbotOpen(false)} />
            </DialogContent>
          </Dialog>

          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
