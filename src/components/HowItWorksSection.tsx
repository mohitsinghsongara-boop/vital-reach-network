import { UserPlus, Search, Bell, Heart } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your profile with blood type, location, and availability preferences.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Search,
    title: "Search & Match",
    description: "Find compatible donors or blood banks nearby using our smart algorithm.",
    color: "bg-coral/20 text-coral",
  },
  {
    icon: Bell,
    title: "Get Notified",
    description: "Receive instant alerts for emergency requests that match your profile.",
    color: "bg-rose/20 text-rose",
  },
  {
    icon: Heart,
    title: "Save Lives",
    description: "Connect with recipients and make your donation to help save lives.",
    color: "bg-primary/10 text-primary",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Get started in minutes and become part of a life-saving community
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center z-10 shadow-soft">
                {index + 1}
              </div>

              {/* Card */}
              <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 h-full hover:shadow-elevated transition-all duration-300 group-hover:-translate-y-1">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <step.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
