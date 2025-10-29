import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for your feedback. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-secondary/30 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Get in Touch
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            Have questions or feedback? We'd love to hear from you.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="p-6">
                <Mail className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                <a 
                  href="mailto:labbooking@university.edu"
                  className="text-primary hover:underline"
                >
                  labbooking@university.edu
                </a>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={3}
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
            <p>© 2025 Lab Equipment Booking System. All rights reserved.</p>
            <p className="mt-2">
              Built with ❤️ by Svojas A, Meghana, Neranjana, and Swathi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
