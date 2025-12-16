import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Droplet, 
  User, 
  Heart, 
  MapPin, 
  Bell, 
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  Settings,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DonorDashboard from "@/components/dashboard/DonorDashboard";
import ReceiverDashboard from "@/components/dashboard/ReceiverDashboard";
import BloodBankDashboard from "@/components/dashboard/BloodBankDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

const Dashboard = () => {
  const { role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Render role-specific dashboard
  switch (role) {
    case 'donor':
      return <DonorDashboard />;
    case 'receiver':
      return <ReceiverDashboard />;
    case 'blood_bank':
      return <BloodBankDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <DonorDashboard />;
  }
};

// Wrap with ProtectedRoute
const ProtectedDashboard = () => (
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
);

export default ProtectedDashboard;
