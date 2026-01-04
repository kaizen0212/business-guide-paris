import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  FileText,
  ChevronDown,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { adminSteps as initialSteps } from '@/data/mockData';
import type { AdminStep } from '@/types';
import { cn } from '@/lib/utils';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const statusConfig = {
  todo: {
    icon: Circle,
    label: 'À faire',
    color: 'text-muted-foreground',
    bg: 'bg-muted',
  },
  in_progress: {
    icon: Clock,
    label: 'En cours',
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  completed: {
    icon: CheckCircle2,
    label: 'Terminé',
    color: 'text-success',
    bg: 'bg-success/10',
  },
};

export default function AdminSteps() {
  const [steps, setSteps] = useState<AdminStep[]>(initialSteps);

  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progress = (completedCount / steps.length) * 100;

  const updateStatus = (id: string, newStatus: AdminStep['status']) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, status: newStatus } : step
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold">Démarches Administratives</h1>
        <p className="text-muted-foreground mt-2">
          Suivez vos démarches de création d'entreprise étape par étape
        </p>
      </div>

      {/* Progress Overview */}
      <div className="card-elegant p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">Progression globale</h2>
            <p className="text-sm text-muted-foreground">
              {completedCount} sur {steps.length} étapes complétées
            </p>
          </div>
          <span className="text-2xl font-serif font-semibold text-accent">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        {Object.entries(statusConfig).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <config.icon size={16} className={config.color} />
            <span className="text-sm text-muted-foreground">{config.label}</span>
          </div>
        ))}
      </div>

      {/* Steps List */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-4"
      >
        {steps.map((step, index) => {
          const config = statusConfig[step.status];
          const StatusIcon = config.icon;

          return (
            <motion.div key={step.id} variants={fadeUp}>
              <Collapsible>
                <div
                  className={cn(
                    "card-elegant overflow-hidden border-l-4",
                    step.status === 'completed' && "border-l-success",
                    step.status === 'in_progress' && "border-l-warning",
                    step.status === 'todo' && "border-l-muted"
                  )}
                >
                  <CollapsibleTrigger className="w-full p-5 text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Step number and status */}
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                          config.bg
                        )}
                      >
                        <StatusIcon size={20} className={config.color} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-muted-foreground">
                            Étape {step.order}
                          </span>
                          <Badge variant="outline" className={config.bg}>
                            {config.label}
                          </Badge>
                        </div>
                        <h3 className="font-serif text-lg font-semibold mt-1">
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {step.description}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                        <Clock size={14} />
                        {step.estimatedDuration}
                      </div>

                      <ChevronDown size={20} className="text-muted-foreground shrink-0" />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-5 pb-5 pt-2 border-t border-border ml-14">
                      {/* Documents */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <FileText size={14} />
                          Documents nécessaires
                        </h4>
                        <ul className="space-y-1">
                          {step.documents.map((doc, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Links */}
                      <div className="mb-4">
                        <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                          <ExternalLink size={14} />
                          Liens utiles
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.links.map((link, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.label}
                                <ExternalLink size={12} />
                              </a>
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {step.status !== 'completed' && (
                          <>
                            {step.status === 'todo' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateStatus(step.id, 'in_progress')}
                              >
                                <Clock size={14} />
                                Marquer en cours
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="hero"
                              onClick={() => updateStatus(step.id, 'completed')}
                            >
                              <CheckCircle2 size={14} />
                              Marquer comme terminé
                            </Button>
                          </>
                        )}
                        {step.status === 'completed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(step.id, 'todo')}
                          >
                            <AlertCircle size={14} />
                            Réouvrir
                          </Button>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
