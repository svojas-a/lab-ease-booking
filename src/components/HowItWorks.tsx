import { Card, CardContent } from "@/components/ui/card";
import { LogIn, CalendarCheck, Bell } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    number: "01",
    title: "Login",
    description: "Sign in with your institutional email address"
  },
  {
    icon: CalendarCheck,
    number: "02",
    title: "Select & Book",
    description: "Choose equipment and timeslot on the calendar"
  },
  {
    icon: Bell,
    number: "03",
    title: "Confirmation",
    description: "Receive confirmation email and reminders"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Simple three-step process to book equipment
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border-2 hover:border-primary transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 text-6xl font-bold text-primary/10">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
