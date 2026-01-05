import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ArrowRight, ArrowLeft, Save, Download, Loader2 } from 'lucide-react';
import { sectors } from '@/data/mockData';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { exportProjectToPdf } from '@/utils/exportPdf';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis'),
  lastName: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Téléphone invalide'),
});

const projectIdeaSchema = z.object({
  name: z.string().min(2, 'Nom du projet requis'),
  description: z.string().min(20, 'Description trop courte (min 20 caractères)'),
  sector: z.string().min(1, 'Secteur requis'),
  innovation: z.string().optional(),
});

const targetMarketSchema = z.object({
  targetClients: z.string().min(10, 'Décrivez vos clients cibles'),
  competition: z.string().min(10, 'Décrivez la concurrence'),
  positioning: z.string().min(10, 'Décrivez votre positionnement'),
});

const resourcesSchema = z.object({
  team: z.string().optional(),
  initialBudget: z.string().optional(),
  materialNeeds: z.string().optional(),
});

const steps = [
  { id: 1, name: 'Informations personnelles', schema: personalInfoSchema },
  { id: 2, name: 'Idée de projet', schema: projectIdeaSchema },
  { id: 3, name: 'Marché cible', schema: targetMarketSchema },
  { id: 4, name: 'Ressources nécessaires', schema: resourcesSchema },
];

const fadeVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export default function Project() {
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: { firstName: '', lastName: '', email: '', phone: '' },
    projectIdea: { name: '', description: '', sector: '', innovation: '' },
    targetMarket: { targetClients: '', competition: '', positioning: '' },
    resources: { team: '', initialBudget: '', materialNeeds: '' },
  });

  // Load from localStorage and database on mount
  useEffect(() => {
    const loadData = async () => {
      // First try localStorage
      const saved = localStorage.getItem('dos-project-data');
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      }

      // Then try database
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: project } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', session.user.id)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (project?.project_data) {
          const dbData = project.project_data as typeof formData;
          setFormData(dbData);
          setCurrentStep(project.current_step || 1);
          localStorage.setItem('dos-project-data', JSON.stringify(dbData));
        }
      }
    };
    loadData();
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('dos-project-data', JSON.stringify(formData));
  }, [formData]);

  const progress = (currentStep / steps.length) * 100;

  const saveToDatabase = async (data: typeof formData, step: number, completed: boolean = false) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    setSaving(true);
    try {
      // Check if project exists
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('user_id', session.user.id)
        .limit(1)
        .single();

      if (existing) {
        await supabase
          .from('projects')
          .update({
            project_data: data,
            current_step: step,
            completed,
          })
          .eq('id', existing.id);
      } else {
        await supabase
          .from('projects')
          .insert({
            user_id: session.user.id,
            project_data: data,
            current_step: step,
            completed,
          });
      }

      // Create notification if project completed
      if (completed) {
        await supabase.from('notifications').insert({
          user_id: session.user.id,
          title: 'Projet complété !',
          message: `Votre projet "${data.projectIdea.name}" a été enregistré avec succès.`,
          type: 'success',
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async (stepData: any) => {
    const stepKey = ['personalInfo', 'projectIdea', 'targetMarket', 'resources'][currentStep - 1];
    const newFormData = { ...formData, [stepKey]: stepData };
    setFormData(newFormData);
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      await saveToDatabase(newFormData, currentStep + 1);
    } else {
      await saveToDatabase(newFormData, currentStep, true);
      toast.success('Projet enregistré avec succès !');
    }
  };

  const handleExportPdf = () => {
    exportProjectToPdf(formData);
    toast.success('PDF téléchargé avec succès !');
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold">Mon Projet</h1>
        <p className="text-muted-foreground mt-2">
          Définissez votre projet étape par étape
        </p>
      </div>

      {/* Progress */}
      <div className="card-elegant p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium">Progression</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        {/* Steps indicator */}
        <div className="flex justify-between mt-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex flex-col items-center gap-2 flex-1 ${
                step.id <= currentStep ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                  step.id < currentStep
                    ? 'bg-accent border-accent text-accent-foreground'
                    : step.id === currentStep
                    ? 'border-accent text-accent'
                    : 'border-muted text-muted-foreground'
                }`}
              >
                {step.id < currentStep ? <CheckCircle size={20} /> : step.id}
              </div>
              <span className="text-xs text-center hidden sm:block">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <motion.div
        key={currentStep}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3 }}
        className="card-elegant p-8"
      >
        {currentStep === 1 && (
          <PersonalInfoStep
            data={formData.personalInfo}
            onNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <ProjectIdeaStep
            data={formData.projectIdea}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <TargetMarketStep
            data={formData.targetMarket}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <ResourcesStep
            data={formData.resources}
            onNext={handleNext}
            onBack={handleBack}
            onExportPdf={handleExportPdf}
            formData={formData}
            saving={saving}
          />
        )}
      </motion.div>
    </div>
  );
}

// Step Components
function PersonalInfoStep({ data, onNext }: { data: any; onNext: (data: any) => void }) {
  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
  });

  return (
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-semibold">Informations personnelles</h2>
        <p className="text-muted-foreground">Commençons par faire connaissance</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input id="firstName" {...form.register('firstName')} placeholder="Votre prénom" />
          {form.formState.errors.firstName && (
            <p className="text-sm text-destructive">{form.formState.errors.firstName.message as string}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input id="lastName" {...form.register('lastName')} placeholder="Votre nom" />
          {form.formState.errors.lastName && (
            <p className="text-sm text-destructive">{form.formState.errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" {...form.register('email')} placeholder="votre@email.com" />
        {form.formState.errors.email && (
          <p className="text-sm text-destructive">{form.formState.errors.email.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input id="phone" {...form.register('phone')} placeholder="06 12 34 56 78" />
        {form.formState.errors.phone && (
          <p className="text-sm text-destructive">{form.formState.errors.phone.message as string}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="hero">
          Continuer
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
}

function ProjectIdeaStep({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(projectIdeaSchema),
    defaultValues: data,
  });

  return (
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-semibold">Votre idée de projet</h2>
        <p className="text-muted-foreground">Décrivez votre projet entrepreneurial</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nom du projet *</Label>
        <Input id="name" {...form.register('name')} placeholder="Le nom de votre entreprise ou projet" />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">{form.formState.errors.name.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description du projet *</Label>
        <Textarea
          id="description"
          {...form.register('description')}
          placeholder="Décrivez votre projet en quelques phrases..."
          rows={4}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Secteur d'activité *</Label>
        <Select
          value={form.watch('sector')}
          onValueChange={(value) => form.setValue('sector', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un secteur" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>
                {sector}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.sector && (
          <p className="text-sm text-destructive">{form.formState.errors.sector.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="innovation">Éléments innovants (optionnel)</Label>
        <Textarea
          id="innovation"
          {...form.register('innovation')}
          placeholder="Qu'est-ce qui rend votre projet unique ?"
          rows={3}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={18} />
          Retour
        </Button>
        <Button type="submit" variant="hero">
          Continuer
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
}

function TargetMarketStep({ data, onNext, onBack }: { data: any; onNext: (data: any) => void; onBack: () => void }) {
  const form = useForm({
    resolver: zodResolver(targetMarketSchema),
    defaultValues: data,
  });

  return (
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-semibold">Marché cible</h2>
        <p className="text-muted-foreground">Définissez votre marché et votre positionnement</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetClients">Clients cibles *</Label>
        <Textarea
          id="targetClients"
          {...form.register('targetClients')}
          placeholder="Décrivez vos clients idéaux (âge, localisation, besoins...)"
          rows={3}
        />
        {form.formState.errors.targetClients && (
          <p className="text-sm text-destructive">{form.formState.errors.targetClients.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="competition">Analyse de la concurrence *</Label>
        <Textarea
          id="competition"
          {...form.register('competition')}
          placeholder="Qui sont vos concurrents principaux ? Quelles sont leurs forces/faiblesses ?"
          rows={3}
        />
        {form.formState.errors.competition && (
          <p className="text-sm text-destructive">{form.formState.errors.competition.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="positioning">Positionnement *</Label>
        <Textarea
          id="positioning"
          {...form.register('positioning')}
          placeholder="Comment vous différenciez-vous de la concurrence ?"
          rows={3}
        />
        {form.formState.errors.positioning && (
          <p className="text-sm text-destructive">{form.formState.errors.positioning.message as string}</p>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={18} />
          Retour
        </Button>
        <Button type="submit" variant="hero">
          Continuer
          <ArrowRight size={18} />
        </Button>
      </div>
    </form>
  );
}

function ResourcesStep({ 
  data, 
  onNext, 
  onBack, 
  onExportPdf,
  formData,
  saving
}: { 
  data: any; 
  onNext: (data: any) => void; 
  onBack: () => void;
  onExportPdf: () => void;
  formData: any;
  saving: boolean;
}) {
  const form = useForm({
    resolver: zodResolver(resourcesSchema),
    defaultValues: data,
  });

  const isProjectComplete = formData.personalInfo.firstName && 
    formData.projectIdea.name && 
    formData.targetMarket.targetClients;

  return (
    <form onSubmit={form.handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-serif font-semibold">Ressources nécessaires</h2>
        <p className="text-muted-foreground">Estimez les ressources pour lancer votre projet</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="team">Équipe (optionnel)</Label>
        <Textarea
          id="team"
          {...form.register('team')}
          placeholder="Avez-vous des associés ? Quelles compétences recherchez-vous ?"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="initialBudget">Budget initial estimé (optionnel)</Label>
        <Input
          id="initialBudget"
          {...form.register('initialBudget')}
          placeholder="Ex: 10 000 €"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="materialNeeds">Besoins matériels (optionnel)</Label>
        <Textarea
          id="materialNeeds"
          {...form.register('materialNeeds')}
          placeholder="Local, équipements, véhicule, logiciels..."
          rows={3}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={18} />
          Retour
        </Button>
        <Button type="submit" variant="hero" disabled={saving}>
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Enregistrer le projet
        </Button>
      </div>

      <div className="pt-4 border-t border-border">
        <Button 
          type="button" 
          variant="outline" 
          className="w-full" 
          onClick={onExportPdf}
          disabled={!isProjectComplete}
        >
          <Download size={18} />
          {isProjectComplete ? 'Exporter en PDF' : 'Complétez le projet pour exporter'}
        </Button>
      </div>
    </form>
  );
}
