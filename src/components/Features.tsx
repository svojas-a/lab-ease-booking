import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Mail, LayoutDashboard, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Equipment Booking",
    description: "Intuitive calendar interface for seamless equipment reservation"
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description: "Live updates prevent double-booking and scheduling conflicts"
  },
  {
    icon: Mail,
    title: "Email Notifications",
    description: "Automatic confirmations and reminders keep you informed"
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    description: "Comprehensive tools to manage equipment and generate reports"
  },
  {
    icon: Shield,
    title: "Secure Login",
    description: "Institutional email authentication with role-based access control"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Seamless experience across desktop, tablet, and mobile devices"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Powerful Features
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Everything you need to manage lab equipment efficiently
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
