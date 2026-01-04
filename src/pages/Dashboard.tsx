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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const quickStats = [
  {
    label: 'Progression du projet',
    value: 35,
    icon: TrendingUp,
    color: 'text-accent',
  },
  {
    label: 'Tâches complétées',
    value: '3/12',
    icon: CheckCircle2,
    color: 'text-success',
  },
  {
    label: 'Prochaine échéance',
    value: '15 Jan',
    icon: Clock,
    color: 'text-warning',
  },
  {
    label: 'Documents manquants',
    value: 4,
    icon: AlertCircle,
    color: 'text-destructive',
  },
];

const quickActions = [
  {
    title: 'Compléter mon projet',
    description: 'Continuez la définition de votre projet',
    icon: Lightbulb,
    href: '/dashboard/project',
    progress: 35,
  },
  {
    title: 'Business Plan',
    description: 'Construisez votre business plan',
    icon: FileText,
    href: '/dashboard/business-plan',
    progress: 0,
  },
  {
    title: 'Choisir mon statut',
    description: 'Comparez les statuts juridiques',
    icon: Scale,
    href: '/dashboard/legal-status',
    progress: 0,
  },
  {
    title: 'Mes démarches',
    description: 'Suivez vos démarches administratives',
    icon: ClipboardList,
    href: '/dashboard/admin-steps',
    progress: 25,
  },
  {
    title: 'Financement',
    description: 'Trouvez des aides et financements',
    icon: Wallet,
    href: '/dashboard/financing',
    progress: 0,
  },
  {
    title: 'Mon calendrier',
    description: 'Gérez vos rendez-vous',
    icon: Calendar,
    href: '/dashboard/calendar',
    progress: null,
  },
];

const upcomingTasks = [
  {
    title: 'Finaliser l\'étude de marché',
    dueDate: '15 Jan 2024',
    status: 'urgent',
  },
  {
    title: 'Choisir le statut juridique',
    dueDate: '20 Jan 2024',
    status: 'pending',
  },
  {
    title: 'Rédiger les statuts',
    dueDate: '25 Jan 2024',
    status: 'pending',
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

export default function Dashboard() {
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
                  {typeof stat.value === 'number' ? `${stat.value}%` : stat.value}
                </p>
              </div>
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            {typeof stat.value === 'number' && (
              <Progress value={stat.value} className="mt-3 h-1.5" />
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
            {quickActions.map((action) => (
              <motion.div
                key={action.title}
                variants={fadeUp}
                className="card-elegant p-5 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-secondary group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <action.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {action.description}
                    </p>
                    {action.progress !== null && (
                      <div className="mt-3 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Progression</span>
                          <span className="font-medium">{action.progress}%</span>
                        </div>
                        <Progress value={action.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    to={action.href}
                    className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                  >
                    Accéder
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
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
            {upcomingTasks.map((task, index) => (
              <div key={index} className="p-4 flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    task.status === 'urgent' ? 'bg-destructive' : 'bg-warning'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{task.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Échéance : {task.dueDate}
                  </p>
                </div>
              </div>
            ))}
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
            <Button variant="hero" size="sm" className="mt-4 w-full">
              Prendre rendez-vous
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
