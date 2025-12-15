import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Droplet, 
  ArrowLeft, 
  AlertTriangle,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Emergency = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    unitsNeeded: "",
    hospital: "",
    location: "",
    contactName: "",
    contactPhone: "",
    urgency: "critical",
    additionalInfo: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Emergency Request Sent!",
      description: "Nearby donors and blood banks have been notified.",
    });
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-primary fill-primary" />
              <span className="text-xl font-bold">
                Red<span className="text-primary">Drop</span>
              </span>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Emergency Request Submitted
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We're alerting nearby donors and blood banks. You'll receive responses shortly.
            </p>

            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-card rounded-xl p-5 border border-border">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-sm text-muted-foreground">Donors Notified</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-sm text-muted-foreground">Blood Banks Alerted</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-foreground">&lt;5 min</p>
                <p className="text-sm text-muted-foreground">Est. Response Time</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="hero" size="lg">
                  Track Responses
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="glass" size="lg">
                  Search Blood Banks
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Droplet className="w-6 h-6 text-primary-foreground fill-primary-foreground/30" />
            <span className="text-xl font-bold text-primary-foreground">
              RedDrop
            </span>
          </div>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 mb-4">
            <AlertTriangle className="w-5 h-5 text-primary-foreground animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">Emergency Blood Request</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Request Blood Urgently
          </h1>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">
            Submit an emergency request to notify nearby compatible donors and blood banks instantly.
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6">
            {/* Urgency Level */}
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <div className="grid grid-cols-3 gap-3">
                {["critical", "urgent", "standard"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => updateFormData("urgency", level)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.urgency === level
                        ? level === "critical"
                          ? "border-red-500 bg-red-50 text-red-700"
                          : level === "urgent"
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-primary bg-accent text-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <p className="font-semibold capitalize">{level}</p>
                    <p className="text-xs opacity-70">
                      {level === "critical" ? "Need now" : level === "urgent" ? "Within hours" : "Within days"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Patient Name */}
              <div className="space-y-2">
                <Label htmlFor="patient">Patient Name</Label>
                <Input
                  id="patient"
                  placeholder="Patient's name"
                  value={formData.patientName}
                  onChange={(e) => updateFormData("patientName", e.target.value)}
                  required
                />
              </div>

              {/* Blood Type */}
              <div className="space-y-2">
                <Label>Blood Type Needed</Label>
                <Select 
                  value={formData.bloodType} 
                  onValueChange={(v) => updateFormData("bloodType", v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Units Needed */}
              <div className="space-y-2">
                <Label htmlFor="units">Units Needed</Label>
                <Input
                  id="units"
                  type="number"
                  placeholder="e.g., 2"
                  min="1"
                  value={formData.unitsNeeded}
                  onChange={(e) => updateFormData("unitsNeeded", e.target.value)}
                  required
                />
              </div>

              {/* Hospital */}
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital Name</Label>
                <Input
                  id="hospital"
                  placeholder="Hospital name"
                  value={formData.hospital}
                  onChange={(e) => updateFormData("hospital", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Hospital Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Full hospital address"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Contact Name */}
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Person</Label>
                <Input
                  id="contactName"
                  placeholder="Your name"
                  value={formData.contactName}
                  onChange={(e) => updateFormData("contactName", e.target.value)}
                  required
                />
              </div>

              {/* Contact Phone */}
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    value={formData.contactPhone}
                    onChange={(e) => updateFormData("contactPhone", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label htmlFor="info">Additional Information</Label>
              <Textarea
                id="info"
                placeholder="Any additional details that might help..."
                value={formData.additionalInfo}
                onChange={(e) => updateFormData("additionalInfo", e.target.value)}
                rows={3}
              />
            </div>

            <Button 
              type="submit" 
              variant="emergency" 
              size="xl" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                "Sending Alert..."
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Emergency Request
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              This will notify all compatible donors within a 20km radius
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
