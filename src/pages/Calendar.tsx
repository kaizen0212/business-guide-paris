import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'rdv' | 'echeance' | 'formation' | 'admin';
  description?: string;
  location?: string;
}

const categoryColors = {
  rdv: 'bg-accent text-accent-foreground',
  echeance: 'bg-destructive text-destructive-foreground',
  formation: 'bg-success text-white',
  admin: 'bg-warning text-warning-foreground',
};

const categoryLabels = {
  rdv: 'Rendez-vous',
  echeance: 'Échéance',
  formation: 'Formation',
  admin: 'Administratif',
};

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'RDV Expert-comptable',
    date: '2024-01-15',
    time: '10:00',
    category: 'rdv',
    description: 'Discussion sur le choix du statut juridique',
    location: 'Cabinet Dupont & Associés',
  },
  {
    id: '2',
    title: 'Déclaration URSSAF',
    date: '2024-01-20',
    time: '23:59',
    category: 'echeance',
    description: 'Date limite de déclaration trimestrielle',
  },
  {
    id: '3',
    title: 'Webinaire création entreprise',
    date: '2024-01-18',
    time: '14:00',
    category: 'formation',
    description: 'Formation en ligne sur les aides à la création',
    location: 'En ligne',
  },
  {
    id: '4',
    title: 'Dépôt statuts INPI',
    date: '2024-01-25',
    time: '12:00',
    category: 'admin',
    description: 'Immatriculation de la société',
  },
  {
    id: '5',
    title: 'RDV Banque - Prêt',
    date: '2024-01-22',
    time: '11:30',
    category: 'rdv',
    location: 'Agence BNP Paribas',
  },
];

const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1));
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    category: 'rdv',
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days: (number | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const formatDate = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  const getEventsForDay = (day: number) => {
    const dateStr = formatDate(day);
    return events.filter((e) => e.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.category) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title!,
        date: newEvent.date!,
        time: newEvent.time!,
        category: newEvent.category as 'rdv' | 'echeance' | 'formation' | 'admin',
        description: newEvent.description,
        location: newEvent.location,
      };
      setEvents([...events, event]);
      setNewEvent({ category: 'rdv' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const days = getDaysInMonth(currentDate);
  const selectedEvents = selectedDate
    ? events.filter((e) => e.date === selectedDate)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-serif font-semibold">Calendrier</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos rendez-vous et échéances importantes
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="hero" className="gap-2">
              <Plus size={18} />
              Ajouter un événement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-serif">Nouvel événement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  placeholder="Titre de l'événement"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Heure</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value: 'rdv' | 'echeance' | 'formation' | 'admin') => setNewEvent({ ...newEvent, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rdv">Rendez-vous</SelectItem>
                    <SelectItem value="echeance">Échéance</SelectItem>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="admin">Administratif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Lieu (optionnel)</Label>
                <Input
                  id="location"
                  placeholder="Adresse ou lien"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  placeholder="Détails supplémentaires..."
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button variant="hero" className="w-full" onClick={handleAddEvent}>
                Ajouter l'événement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Legend */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-wrap gap-4"
      >
        {Object.entries(categoryLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${categoryColors[key as keyof typeof categoryColors]}`}
            />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calendar Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="lg:col-span-2 card-elegant p-6"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft size={20} />
            </Button>
            <h2 className="text-xl font-serif font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const dateStr = formatDate(day);
              const dayEvents = getEventsForDay(day);
              const isSelected = selectedDate === dateStr;
              const isToday =
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`aspect-square p-1 rounded-lg transition-all relative ${
                    isSelected
                      ? 'bg-accent text-accent-foreground'
                      : isToday
                        ? 'bg-secondary'
                        : 'hover:bg-muted'
                  }`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`w-1.5 h-1.5 rounded-full ${categoryColors[event.category]}`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Selected Day Events */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-4"
        >
          <h3 className="text-lg font-serif font-semibold flex items-center gap-2">
            <CalendarIcon size={20} className="text-accent" />
            {selectedDate
              ? new Date(selectedDate).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })
              : 'Sélectionnez une date'}
          </h3>

          {selectedDate && selectedEvents.length === 0 && (
            <div className="card-elegant p-6 text-center text-muted-foreground">
              <p>Aucun événement ce jour</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setNewEvent({ ...newEvent, date: selectedDate });
                  setIsAddDialogOpen(true);
                }}
              >
                <Plus size={16} className="mr-2" />
                Ajouter un événement
              </Button>
            </div>
          )}

          {selectedEvents.map((event) => (
            <div key={event.id} className="card-elegant p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded ${categoryColors[event.category]}`}
                  >
                    {categoryLabels[event.category]}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <X size={14} />
                </Button>
              </div>
              <h4 className="font-semibold">{event.title}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {event.time}
                </span>
                {event.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {event.location}
                  </span>
                )}
              </div>
              {event.description && (
                <p className="text-sm text-muted-foreground">{event.description}</p>
              )}
            </div>
          ))}

          {/* Upcoming Events */}
          <div className="mt-8">
            <h3 className="text-lg font-serif font-semibold mb-4">Prochains événements</h3>
            <div className="space-y-3">
              {events
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setSelectedDate(event.date)}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${categoryColors[event.category]}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                        })}{' '}
                        à {event.time}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
