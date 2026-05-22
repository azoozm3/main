import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function BackButton({
  to,
  fallbackPath = "/dashboard/patient",
  children = "Back",
  className = "mb-4",
  buttonClassName = "",
}) {
  const [, navigate] = useLocation();
  const targetPath = to || fallbackPath;
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    navigate(targetPath);
  };

  return (
    <div className={className}>
      <Button type="button" variant="ghost" onClick={handleBack} className={buttonClassName}>
        <ArrowLeft className="mr-2 h-4 w-4" /> {children}
      </Button>
    </div>
  );
}
