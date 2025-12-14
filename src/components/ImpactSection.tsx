import { TrendingUp, Users, Clock, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "25,000+",
    label: "Lives Saved",
    description: "Through successful blood donations",
  },
  {
    icon: Users,
    value: "50,000+",
    label: "Registered Donors",
    description: "Growing community worldwide",
  },
  {
    icon: Clock,
    value: "< 5 mins",
    label: "Average Response",
    description: "For emergency requests",
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Success Rate",
    description: "In finding compatible matches",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
              Making a Difference
            </h2>
            <p className="text-muted-foreground text-lg">
              Together, we're building a world where no one dies waiting for blood
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-8 border border-border/50 text-center h-full hover:border-primary/30 transition-all duration-300 hover:shadow-elevated">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-6 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Value */}
                  <p className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="text-lg font-semibold text-foreground mb-2">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial/Quote */}
          <div className="mt-16 bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <svg
                className="w-12 h-12 text-primary/20 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-6">
                "Red Drop connected me with a donor within minutes when my daughter needed an emergency transfusion. 
                This platform literally saved her life."
              </p>
              <div>
                <p className="font-semibold text-foreground">Sarah M.</p>
                <p className="text-sm text-muted-foreground">Mother & Forever Grateful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
