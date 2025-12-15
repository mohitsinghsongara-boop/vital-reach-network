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

const mockUser = {
  name: "John Smith",
  email: "john@example.com",
  bloodType: "O+",
  totalDonations: 12,
  lastDonation: "2024-09-15",
  nextEligible: "2024-12-15",
  location: "New York, NY",
};

const mockActivity = [
  { id: 1, type: "donation", title: "Blood Donation Completed", date: "Sep 15, 2024", status: "completed" },
  { id: 2, type: "request", title: "Responded to Emergency Request", date: "Aug 22, 2024", status: "completed" },
  { id: 3, type: "reminder", title: "Eligible to Donate Again", date: "Dec 15, 2024", status: "upcoming" },
];

const mockRequests = [
  { id: 1, patient: "Sarah M.", bloodType: "O+", hospital: "City Hospital", urgency: "critical", distance: "2.3 km" },
  { id: 2, patient: "Mike R.", bloodType: "O-", hospital: "Central Medical", urgency: "urgent", distance: "4.1 km" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"overview" | "requests" | "history">("overview");

  const handleLogout = () => {
    toast({
      title: "Signed out",
      description: "You've been signed out successfully.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold">
              Red<span className="text-primary">Drop</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border sticky top-24">
              {/* Profile Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{mockUser.name}</h2>
                <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                <div className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-accent rounded-full">
                  <Droplet className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">{mockUser.bloodType}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-secondary rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{mockUser.totalDonations}</p>
                  <p className="text-xs text-muted-foreground">Donations</p>
                </div>
                <div className="text-center p-3 bg-secondary rounded-xl">
                  <p className="text-2xl font-bold text-foreground">36</p>
                  <p className="text-xs text-muted-foreground">Lives Saved</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <MapPin className="w-4 h-4" />
                {mockUser.location}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <Link to="/search" className="block">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="w-4 h-4 mr-3" />
                    Find Blood Requests
                  </Button>
                </Link>
                <Link to="/emergency" className="block">
                  <Button variant="ghost" className="w-full justify-start text-primary">
                    <AlertTriangle className="w-4 h-4 mr-3" />
                    Emergency Request
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-gradient-hero rounded-2xl p-6 text-primary-foreground">
              <h1 className="text-2xl font-bold mb-2">Welcome back, {mockUser.name.split(" ")[0]}!</h1>
              <p className="text-primary-foreground/80 mb-4">
                You're eligible to donate again on {new Date(mockUser.nextEligible).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/search">
                  <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Find Requests Near You
                  </Button>
                </Link>
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent">
                  Schedule Donation
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              {(["overview", "requests", "history"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Donation Status */}
                <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Donation Status
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Donation</span>
                      <span className="font-medium text-foreground">
                        {new Date(mockUser.lastDonation).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Next Eligible</span>
                      <span className="font-medium text-primary">
                        {new Date(mockUser.nextEligible).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium">Eligible to donate soon!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {mockActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.status === "completed" ? "bg-green-500" : "bg-primary"
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{activity.title}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Nearby Blood Requests</h3>
                {mockRequests.map((request) => (
                  <div 
                    key={request.id}
                    className="bg-card rounded-xl p-5 shadow-card border border-border flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        request.urgency === "critical" ? "bg-red-100" : "bg-orange-100"
                      }`}>
                        <Droplet className={`w-6 h-6 ${
                          request.urgency === "critical" ? "text-red-600" : "text-orange-600"
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{request.patient}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{request.bloodType}</span>
                          <span>•</span>
                          <span>{request.hospital}</span>
                          <span>•</span>
                          <span>{request.distance}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        request.urgency === "critical" 
                          ? "bg-red-100 text-red-700" 
                          : "bg-orange-100 text-orange-700"
                      }`}>
                        {request.urgency}
                      </span>
                      <Button size="sm">
                        Respond
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "history" && (
              <div className="bg-card rounded-xl p-6 shadow-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Donation History</h3>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Blood Donation</p>
                          <p className="text-sm text-muted-foreground">City Hospital Blood Bank</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {new Date(2024, 8 - i * 3, 15).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-green-600">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
