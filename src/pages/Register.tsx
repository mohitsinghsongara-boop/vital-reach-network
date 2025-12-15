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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Droplet, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    address: "",
    city: "",
    dateOfBirth: "",
    lastDonation: "",
    medicalConditions: "",
    willingToTravel: false,
    emergencyContact: false,
    acceptTerms: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for joining Red Drop. You're now part of our life-saving community.",
    });
    
    setIsLoading(false);
    setStep(3);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <Droplet className="w-6 h-6 text-primary fill-primary" />
              <span className="text-xl font-bold">
                Red<span className="text-primary">Drop</span>
              </span>
            </div>
          </div>
          <Link to="/auth">
            <Button variant="ghost" size="sm">Already have an account?</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step >= s 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 mx-2 rounded transition-colors ${
                    step > s ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Personal Information</h1>
                <p className="text-muted-foreground">Tell us about yourself</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="John Doe"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="dob"
                        type="date"
                        className="pl-10"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Continue
                </Button>
              </form>
            </div>
          )}

          {/* Step 2: Medical Info */}
          {step === 2 && (
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Donor Information</h1>
                <p className="text-muted-foreground">Help us match you with those in need</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label>Blood Type</Label>
                    <Select 
                      value={formData.bloodType} 
                      onValueChange={(v) => updateFormData("bloodType", v)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastDonation">Last Donation Date</Label>
                    <Input
                      id="lastDonation"
                      type="date"
                      value={formData.lastDonation}
                      onChange={(e) => updateFormData("lastDonation", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medical">Medical Conditions (if any)</Label>
                  <Textarea
                    id="medical"
                    placeholder="List any medical conditions or medications..."
                    value={formData.medicalConditions}
                    onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="travel" 
                      checked={formData.willingToTravel}
                      onCheckedChange={(c) => updateFormData("willingToTravel", c)}
                    />
                    <Label htmlFor="travel" className="font-normal cursor-pointer">
                      I'm willing to travel for emergency donations
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="emergency" 
                      checked={formData.emergencyContact}
                      onCheckedChange={(c) => updateFormData("emergencyContact", c)}
                    />
                    <Label htmlFor="emergency" className="font-normal cursor-pointer">
                      Contact me for emergency blood requests
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      id="terms" 
                      checked={formData.acceptTerms}
                      onCheckedChange={(c) => updateFormData("acceptTerms", c)}
                      required
                    />
                    <Label htmlFor="terms" className="font-normal cursor-pointer">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="hero" 
                    size="lg" 
                    className="flex-1"
                    disabled={isLoading || !formData.acceptTerms}
                  >
                    {isLoading ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="bg-card rounded-2xl p-8 shadow-card border border-border text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Red Drop!</h1>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                You're now part of our life-saving community. Start making a difference today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <Button variant="hero" size="lg">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link to="/search">
                  <Button variant="glass" size="lg">
                    Find Blood Requests
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Register;
