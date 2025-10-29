import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import labHeroImage from "@/assets/lab-hero.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(210, 230, 250, 0.95), rgba(255, 255, 255, 0.98)), url(${labHeroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-fade-in">
          Lab Equipment Booking System
        </h1>
        
        <p className="text-2xl md:text-3xl text-primary font-semibold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Reserve. Relax. Research.
        </p>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          A smart web-based platform that helps students and faculty easily book, manage, 
          and track lab equipment — preventing conflicts and keeping everyone informed.
        </p>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all animate-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          Get Started
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
