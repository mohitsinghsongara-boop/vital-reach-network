const bloodTypes = [
  { type: "A+", canDonateTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"], population: "35%" },
  { type: "A-", canDonateTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"], population: "6%" },
  { type: "B+", canDonateTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"], population: "8%" },
  { type: "B-", canDonateTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"], population: "2%" },
  { type: "AB+", canDonateTo: ["AB+"], canReceiveFrom: ["All Types"], population: "3%", special: "Universal Recipient" },
  { type: "AB-", canDonateTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "AB-", "O-"], population: "1%" },
  { type: "O+", canDonateTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"], population: "38%" },
  { type: "O-", canDonateTo: ["All Types"], canReceiveFrom: ["O-"], population: "7%", special: "Universal Donor" },
];

const BloodTypesSection = () => {
  return (
    <section id="blood-types" className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Compatibility Guide
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            Blood Type Compatibility
          </h2>
          <p className="text-muted-foreground text-lg">
            Understanding blood type compatibility is crucial for safe transfusions
          </p>
        </div>

        {/* Blood Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bloodTypes.map((blood) => (
            <div
              key={blood.type}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
            >
              {/* Blood Type Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-hero flex items-center justify-center shadow-soft">
                  <span className="text-xl font-bold text-primary-foreground">{blood.type}</span>
                </div>
                <span className="text-sm text-muted-foreground">{blood.population}</span>
              </div>

              {/* Special Badge */}
              {blood.special && (
                <div className="inline-block px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium mb-4">
                  {blood.special}
                </div>
              )}

              {/* Can Donate To */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Can donate to
                </p>
                <div className="flex flex-wrap gap-1">
                  {blood.canDonateTo.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Can Receive From */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Can receive from
                </p>
                <div className="flex flex-wrap gap-1">
                  {blood.canReceiveFrom.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BloodTypesSection;
