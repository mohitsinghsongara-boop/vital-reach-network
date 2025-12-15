import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Droplet, 
  Search as SearchIcon, 
  MapPin, 
  Phone, 
  Clock, 
  Filter,
  ArrowLeft,
  Heart,
  Building2,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const mockDonors = [
  { id: 1, name: "John Smith", bloodType: "O+", distance: "2.3 km", lastDonation: "3 months ago", available: true, type: "donor" },
  { id: 2, name: "City Blood Bank", bloodType: "All", distance: "3.1 km", lastDonation: "In stock", available: true, type: "bank" },
  { id: 3, name: "Sarah Johnson", bloodType: "A+", distance: "4.5 km", lastDonation: "6 months ago", available: true, type: "donor" },
  { id: 4, name: "Central Hospital Blood Center", bloodType: "All", distance: "5.2 km", lastDonation: "In stock", available: true, type: "bank" },
  { id: 5, name: "Michael Chen", bloodType: "B-", distance: "6.0 km", lastDonation: "4 months ago", available: false, type: "donor" },
  { id: 6, name: "Emily Davis", bloodType: "AB+", distance: "7.3 km", lastDonation: "2 months ago", available: true, type: "donor" },
];

const Search = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "donor" | "bank">("all");

  const filteredResults = mockDonors.filter(donor => {
    const matchesBloodType = !selectedBloodType || donor.bloodType === selectedBloodType || donor.bloodType === "All";
    const matchesSearch = !searchQuery || donor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || donor.type === filterType;
    return matchesBloodType && matchesSearch && matchesType;
  });

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
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find Blood</h1>
          <p className="text-muted-foreground">
            Search for blood donors and blood banks near you
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Enter your location" 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Blood Type */}
            <div className="space-y-2">
              <Label>Blood Type</Label>
              <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {bloodTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Type */}
            <div className="space-y-2">
              <Label>Search For</Label>
              <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Donors & Banks</SelectItem>
                  <SelectItem value="donor">Donors Only</SelectItem>
                  <SelectItem value="bank">Blood Banks Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button variant="hero" className="w-full">
                <SearchIcon className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {filteredResults.length} Results Found
            </h2>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredResults.map(donor => (
              <div 
                key={donor.id}
                className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      donor.type === "bank" ? "bg-secondary" : "bg-accent"
                    }`}>
                      {donor.type === "bank" ? (
                        <Building2 className="w-6 h-6 text-primary" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{donor.name}</h3>
                        {donor.available ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                            Available
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                            Unavailable
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Droplet className="w-4 h-4 text-primary" />
                          {donor.bloodType}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {donor.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {donor.lastDonation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5" />
                    </Button>
                    <Button variant="glass" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="default" size="sm">
                      Request
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
