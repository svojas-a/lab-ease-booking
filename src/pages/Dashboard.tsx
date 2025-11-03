import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, LogOut, Search, FlaskConical } from 'lucide-react';
import BookingDialog from '@/components/BookingDialog';

interface Equipment {
  id: string;
  name: string;
  category: string;
  location: string;
  available: boolean;
}

const MOCK_EQUIPMENT: Equipment[] = [
  { id: '1', name: 'Microscope - Zeiss Axio', category: 'Microscopy', location: 'Lab 101', available: true },
  { id: '2', name: 'Centrifuge - Eppendorf 5424', category: 'Separation', location: 'Lab 102', available: true },
  { id: '3', name: 'PCR Machine - Bio-Rad T100', category: 'Molecular Biology', location: 'Lab 103', available: true },
  { id: '4', name: 'Spectrophotometer - UV-Vis', category: 'Analysis', location: 'Lab 101', available: true },
  { id: '5', name: 'Autoclave - Tuttnauer', category: 'Sterilization', location: 'Lab 104', available: false },
  { id: '6', name: 'pH Meter - Mettler Toledo', category: 'Measurement', location: 'Lab 102', available: true },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [equipment, setEquipment] = useState<Equipment[]>(MOCK_EQUIPMENT);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const filteredEquipment = equipment.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBookClick = (item: Equipment) => {
    setSelectedEquipment(item);
    setIsDialogOpen(true);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Lab Equipment Booking</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/bookings')}>
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Search Equipment</h2>
          <p className="text-muted-foreground mb-6">Find and book lab equipment for your research</p>
          
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, category, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.available ? 'Available' : 'In Use'}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Location: {item.location}</p>
                <Button
                  className="w-full"
                  onClick={() => handleBookClick(item)}
                  disabled={!item.available}
                >
                  {item.available ? 'Book Now' : 'Unavailable'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No equipment found matching your search.</p>
          </div>
        )}
      </main>

      <BookingDialog
        equipment={selectedEquipment}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default Dashboard;
