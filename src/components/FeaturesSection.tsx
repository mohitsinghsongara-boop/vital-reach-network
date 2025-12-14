import { MapPin, Zap, Shield, Users, Clock, MessageCircle } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Real-Time Location",
    description: "Find nearby donors and blood banks with live geolocation tracking and distance calculations.",
  },
  {
    icon: Zap,
    title: "Emergency Alerts",
    description: "One-click emergency requests that instantly notify compatible donors in your area.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is encrypted and protected with industry-standard security protocols.",
  },
  {
    icon: Users,
    title: "Smart Matching",
    description: "Advanced algorithms match blood types, availability, and proximity for optimal results.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Access the platform anytime, anywhere. Blood emergencies don't wait, neither do we.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Secure messaging between donors, recipients, and blood banks for seamless coordination.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background relative">
      {/* Subtle Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools designed to make blood donation efficient, safe, and accessible
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated"
            >
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/10 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
