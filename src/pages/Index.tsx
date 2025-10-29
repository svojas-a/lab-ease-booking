import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TechStack from "@/components/TechStack";
import HowItWorks from "@/components/HowItWorks";
import Team from "@/components/Team";
import ContactFooter from "@/components/ContactFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <TechStack />
      <HowItWorks />
      <Team />
      <ContactFooter />
    </div>
  );
};

export default Index;
