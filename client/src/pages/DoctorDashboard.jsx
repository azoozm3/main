import { CalendarCheck, ClipboardCheck } from "lucide-react";
import { useLocation } from "wouter";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  ProviderDashboardHeader,
  ProviderDashboardShell,
  ProviderHeaderAction,
  ProviderInfoBanner,
} from "@/features/provider-dashboard/ProviderDashboardLayout";
import { openProfileModal } from "@/lib/profile-modal";
import { DoctorDashboardTabs } from "./doctor-dashboard/DoctorDashboardTabs";
import { useDoctorDashboard } from "./doctor-dashboard/useDoctorDashboard";

export default function DoctorDashboard() {
  const [, navigate] = useLocation();
  const dashboard = useDoctorDashboard();
  const needsProfileCompletion = !dashboard.user?.specialty || !dashboard.user?.address || !dashboard.user?.availableTimes;

  if (dashboard.isLoading) {
    return <LoadingScreen className="min-h-[50vh]" />;
  }

  return (
    <ProviderDashboardShell>
      <ProviderDashboardHeader
        title={`Welcome back, Dr. ${dashboard.user?.name || "Doctor"}`}
        description="Manage emergency cases, track routes, and support patients in real time."
        actions={<ProviderHeaderAction icon={CalendarCheck} onClick={() => navigate("/dashboard/doctor/appointments")}>Appointments</ProviderHeaderAction>}
      />

      {needsProfileCompletion ? (
        <ProviderInfoBanner
          icon={ClipboardCheck}
          title="Complete your profile information"
          description="Please add your specialty, clinic location, and available times so patients can book you easily."
        />
      ) : null}

      {needsProfileCompletion ? (
        <div className="mt-2">
          <ProviderHeaderAction onClick={openProfileModal}>Open Profile</ProviderHeaderAction>
        </div>
      ) : null}

      <DoctorDashboardTabs
        activeTab={dashboard.activeTab}
        setActiveTab={dashboard.setActiveTab}
        tabs={dashboard.tabs}
        availableCases={dashboard.availableCases}
        myCases={dashboard.myCases}
        resolvedCases={dashboard.resolvedCases}
        updateStatus={dashboard.updateStatus}
        onAccept={dashboard.handleAccept}
        onStatusUpdate={dashboard.handleStatusUpdate}
        onRatePatient={dashboard.handleSavePatientRating}
      />
    </ProviderDashboardShell>
  );
}
