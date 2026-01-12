import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  FileText,
  Scale,
  ClipboardList,
  Wallet,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ContactDialog } from '@/components/ContactDialog';
import { useUserTasks, UserTask } from '@/hooks/useUserTasks';
import { format, formatDistanceToNow, isPast, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

const quickActions = [
  {
    title: 'Compléter mon projet',
    description: 'Continuez la définition de votre projet',
    icon: Lightbulb,
    href: '/dashboard/project',
    taskKey: 'complete_project',
  },
  {
    title: 'Business Plan',
    description: 'Construisez votre business plan',
    icon: FileText,
    href: '/dashboard/business-plan',
    taskKey: 'business_plan',
  },
  {
    title: 'Choisir mon statut',
    description: 'Comparez les statuts juridiques',
    icon: Scale,
    href: '/dashboard/legal-status',
    taskKey: 'choose_legal_status',
  },
  {
    title: 'Mes démarches',
    description: 'Suivez vos démarches administratives',
    icon: ClipboardList,
    href: '/dashboard/admin-steps',
    taskKey: 'register_business',
  },
  {
    title: 'Financement',
    description: 'Trouvez des aides et financements',
    icon: Wallet,
    href: '/dashboard/financing',
    taskKey: 'find_financing',
  },
  {
    title: 'Mon calendrier',
    description: 'Gérez vos rendez-vous',
    icon: Calendar,
    href: '/dashboard/calendar',
    taskKey: null,
  },
];

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

const getTaskProgress = (task: UserTask | undefined): number => {
  if (!task) return 0;
  switch (task.status) {
    case 'completed': return 100;
    case 'in_progress': return 50;
    default: return 0;
  }
};

const formatDueDate = (dateStr: string | null): string => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isToday(date)) return "Aujourd'hui";
  if (isPast(date)) return `En retard (${format(date, 'd MMM', { locale: fr })})`;
  return format(date, 'd MMM yyyy', { locale: fr });
};

const getTaskUrgency = (task: UserTask): 'urgent' | 'warning' | 'normal' => {
  if (!task.due_date) return 'normal';
  const date = new Date(task.due_date);
  if (isPast(date) || isToday(date)) return 'urgent';
  const daysUntil = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (daysUntil <= 7) return 'warning';
  return 'normal';
};

export default function Dashboard() {
  const {
    tasks,
    loading,
    completeTask,
    progressPercentage,
    completedCount,
    totalCount,
    upcomingTasks,
    pendingCount,
  } = useUserTasks();

  const getTaskByKey = (key: string | null) => 
    key ? tasks.find(t => t.task_key === key) : undefined;

  // Calculate next deadline
  const nextDeadline = upcomingTasks[0]?.due_date 
    ? format(new Date(upcomingTasks[0].due_date), 'd MMM', { locale: fr })
    : 'Aucune';

  const quickStats = [
    {
      label: 'Progression du projet',
      value: progressPercentage,
      icon: TrendingUp,
      color: 'text-accent',
      isProgress: true,
    },
    {
      label: 'Tâches complétées',
      value: `${completedCount}/${totalCount}`,
      icon: CheckCircle2,
      color: 'text-success',
      isProgress: false,
    },
    {
      label: 'Prochaine échéance',
      value: nextDeadline,
      icon: Clock,
      color: 'text-warning',
      isProgress: false,
    },
    {
      label: 'Tâches en attente',
      value: pendingCount,
      icon: AlertCircle,
      color: 'text-destructive',
      isProgress: false,
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-serif font-semibold">
            Bienvenue sur votre espace
          </h1>
          <p className="text-muted-foreground mt-2">
            Suivez l'avancement de votre projet de création d'entreprise
          </p>
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickStats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            className="card-elegant p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-serif font-semibold mt-1">
                  {stat.isProgress ? `${stat.value}%` : stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            {stat.isProgress && (
              <Progress value={stat.value as number} className="mt-3 h-1.5" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="lg:col-span-2 space-y-4"
        >
          <motion.h2 variants={fadeUp} className="text-xl font-serif font-semibold">
            Actions rapides
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickActions.map((action) => {
              const task = getTaskByKey(action.taskKey);
              const progress = getTaskProgress(task);
              const isCompleted = task?.status === 'completed';
              
              return (
                <motion.div
                  key={action.title}
                  variants={fadeUp}
                  className={`card-elegant p-5 group ${isCompleted ? 'opacity-75' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg transition-colors ${
                      isCompleted 
                        ? 'bg-success/20 text-success' 
                        : 'bg-secondary group-hover:bg-accent group-hover:text-accent-foreground'
                    }`}>
                      {isCompleted ? <Check size={20} /> : <action.icon size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        {action.title}
                        {isCompleted && (
                          <span className="text-xs bg-success/20 text-success px-2 py-0.5 rounded-full">
                            Terminé
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {action.description}
                      </p>
                      {action.taskKey && (
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Progression</span>
                            <span className="font-medium">{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      to={action.href}
                      className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                    >
                      Accéder
                      <ArrowRight size={14} />
                    </Link>
                    {task && !isCompleted && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs h-7"
                        onClick={() => completeTask(task.id)}
                      >
                        <Check size={12} className="mr-1" />
                        Marquer terminé
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-serif font-semibold">Prochaines étapes</h2>
          <div className="card-elegant divide-y divide-border">
            {upcomingTasks.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                Aucune tâche avec échéance
              </div>
            ) : (
              upcomingTasks.map((task) => {
                const urgency = getTaskUrgency(task);
                return (
                  <div key={task.id} className="p-4 flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        urgency === 'urgent' 
                          ? 'bg-destructive' 
                          : urgency === 'warning' 
                            ? 'bg-warning' 
                            : 'bg-muted-foreground'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className={`text-xs mt-0.5 ${
                        urgency === 'urgent' ? 'text-destructive' : 'text-muted-foreground'
                      }`}>
                        Échéance : {formatDueDate(task.due_date)}
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={() => completeTask(task.id)}
                    >
                      <Check size={14} />
                    </Button>
                  </div>
                );
              })
            )}
            <div className="p-4">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link to="/dashboard/calendar">
                  Voir le calendrier complet
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Help Card */}
          <div className="card-elegant p-5 bg-gradient-to-br from-secondary to-muted">
            <h3 className="font-serif font-semibold">Besoin d'aide ?</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Stéphanie Djegou est disponible pour vous accompagner dans votre projet.
            </p>
            <ContactDialog>
              <Button variant="hero" size="sm" className="mt-4 w-full">
                Prendre rendez-vous
              </Button>
            </ContactDialog>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
