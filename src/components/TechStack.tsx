import { Card, CardContent } from "@/components/ui/card";
import { Code2, Database, Mail as MailIcon, Lock } from "lucide-react";

const TechStack = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Technology Stack
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-12">
          Built with modern, reliable technologies
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Code2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-muted-foreground">React.js</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Database className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-muted-foreground">SQL & REST API</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <MailIcon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Notifications</h3>
              <p className="text-sm text-muted-foreground">SMTP/TLS</p>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Security</h3>
              <p className="text-sm text-muted-foreground">HTTPS/TLS</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="bg-accent/50 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              Security & Performance
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>TLS/HTTPS encryption for all data transmission</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Role-based access control (RBAC) for security</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>SQL database for reliable booking storage</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <p>Supports 50+ concurrent users with &lt;3s response</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TechStack;
