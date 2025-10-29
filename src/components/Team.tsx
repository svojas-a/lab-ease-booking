import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const teamMembers = [
  "Svojas A",
  "Meghana",
  "Neranjana",
  "Swathi"
];

const Team = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About the Team
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Student-built to simplify lab scheduling
          </p>
          
          <Card className="bg-accent/30">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-background rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary font-bold text-lg">
                        {member.charAt(0)}
                      </span>
                    </div>
                    <p className="font-semibold text-sm">{member}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Team;
