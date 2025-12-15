import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bell, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-coral/10 rounded-full blur-3xl" />
      
      {/* Floating Blood Drop Animation */}
      <div className="absolute top-32 right-[15%] animate-float opacity-20">
        <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
          <path
            d="M30 0C30 0 0 35 0 52C0 67.464 13.431 80 30 80C46.569 80 60 67.464 60 52C60 35 30 0 30 0Z"
            fill="hsl(var(--primary))"
          />
        </svg>
      </div>
      <div className="absolute bottom-40 left-[10%] animate-float opacity-15" style={{ animationDelay: "1s" }}>
        <svg width="40" height="55" viewBox="0 0 60 80" fill="none">
          <path
            d="M30 0C30 0 0 35 0 52C0 67.464 13.431 80 30 80C46.569 80 60 67.464 60 52C60 35 30 0 30 0Z"
            fill="hsl(var(--coral))"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/20 mb-8 animate-fade-in-up">
            <Heart className="w-4 h-4 text-primary animate-heartbeat" />
            <span className="text-sm font-medium text-accent-foreground">
              Every drop counts. Every second matters.
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Connect{" "}
            <span className="text-gradient">Life-Saving</span>
            <br />
            Blood Donations
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Red Drop bridges the gap between blood donors, patients, and blood banks 
            with real-time matching and instant emergency alerts.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link to="/search">
              <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                Find Blood Now
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="glass" size="xl" className="w-full sm:w-auto">
                Register as Donor
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">10K+</p>
              <p className="text-sm text-muted-foreground">Active Donors</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">500+</p>
              <p className="text-sm text-muted-foreground">Blood Banks</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">&lt;5 min</p>
              <p className="text-sm text-muted-foreground">Avg. Response</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--secondary))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
