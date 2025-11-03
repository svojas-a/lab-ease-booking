import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const Bookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editDate, setEditDate] = useState<Date | undefined>();
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadBookings();
  }, [user, navigate]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
    const userBookings = allBookings.filter((b: Booking) => b.userId === user?.id);
    setBookings(userBookings);
  };

  const handleDelete = (bookingId: string) => {
    const allBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
    const updatedBookings = allBookings.filter((b: Booking) => b.id !== bookingId);
    localStorage.setItem('labBookings', JSON.stringify(updatedBookings));
    loadBookings();
    toast({ title: 'Booking cancelled', description: 'Your booking has been cancelled successfully.' });
  };

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setEditDate(new Date(booking.date));
    setEditStartTime(booking.startTime);
    setEditEndTime(booking.endTime);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editDate || !editStartTime || !editEndTime) {
      toast({ title: 'Missing information', description: 'Please fill all fields', variant: 'destructive' });
      return;
    }

    const allBookings = JSON.parse(localStorage.getItem('labBookings') || '[]');
    const updatedBookings = allBookings.map((b: Booking) =>
      b.id === editingBooking?.id
        ? { ...b, date: editDate.toISOString(), startTime: editStartTime, endTime: editEndTime }
        : b
    );

    localStorage.setItem('labBookings', JSON.stringify(updatedBookings));
    loadBookings();
    setEditingBooking(null);
    toast({ title: 'Booking updated', description: 'Your booking has been updated successfully.' });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your equipment bookings</p>
        </div>

        <div className="grid gap-4">
          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">You don't have any bookings yet.</p>
                <Button className="mt-4" onClick={() => navigate('/dashboard')}>
                  Browse Equipment
                </Button>
              </CardContent>
            </Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{booking.equipmentName}</CardTitle>
                      <CardDescription className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {booking.startTime} - {booking.endTime}
                        </div>
                      </CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(booking)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(booking.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>

      <Dialog open={!!editingBooking} onOpenChange={() => setEditingBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogDescription>{editingBooking?.equipmentName}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={editDate}
                onSelect={setEditDate}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start-time">Start Time</Label>
                <Select value={editStartTime} onValueChange={setEditStartTime}>
                  <SelectTrigger id="edit-start-time">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-end-time">End Time</Label>
                <Select value={editEndTime} onValueChange={setEditEndTime}>
                  <SelectTrigger id="edit-end-time">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setEditingBooking(null)}>
                Cancel
              </Button>
              <Button type="submit">Update Booking</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bookings;
