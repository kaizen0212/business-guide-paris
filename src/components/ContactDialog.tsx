import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, CheckCircle, Mail, Phone, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactDialogProps {
  children: React.ReactNode;
}

export function ContactDialog({ children }: ContactDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    // Simulate form submission
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast({
        title: 'Demande envoyée !',
        description: 'Stéphanie vous contactera dans les plus brefs délais.',
      });
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            <div className="flex items-center gap-2">
              <Calendar className="text-accent" size={24} />
              Prendre rendez-vous
            </div>
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="text-success" size={32} />
            </div>
            <h3 className="font-serif text-lg font-semibold mb-2">Demande envoyée !</h3>
            <p className="text-muted-foreground">
              Stéphanie vous contactera très rapidement pour convenir d'un rendez-vous.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User size={14} />
                  Nom complet *
                </Label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone size={14} />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-1">
                <Mail size={14} />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subject">Sujet du rendez-vous *</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choisissez un sujet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="creation">Création d'entreprise</SelectItem>
                  <SelectItem value="business-plan">Business plan</SelectItem>
                  <SelectItem value="statut">Choix du statut juridique</SelectItem>
                  <SelectItem value="financement">Recherche de financement</SelectItem>
                  <SelectItem value="accompagnement">Accompagnement personnalisé</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                placeholder="Décrivez brièvement votre projet ou votre besoin..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button type="submit" variant="hero" className="w-full">
                Envoyer ma demande
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Stéphanie vous répondra sous 24h ouvrées
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
