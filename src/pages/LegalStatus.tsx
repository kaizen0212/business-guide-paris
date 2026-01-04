import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Check, X, HelpCircle, Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { legalStatuses } from '@/data/mockData';
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

export default function LegalStatus() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold">Statut Juridique</h1>
        <p className="text-muted-foreground mt-2">
          Comparez les différents statuts et trouvez celui qui vous convient
        </p>
      </div>

      <Tabs defaultValue="compare" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="compare">Comparatif</TabsTrigger>
          <TabsTrigger value="details">Fiches détaillées</TabsTrigger>
          <TabsTrigger value="simulator">Simulateur</TabsTrigger>
        </TabsList>

        <TabsContent value="compare" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-4"
          >
            {/* Comparison Cards */}
            {legalStatuses.map((status) => (
              <motion.div
                key={status.id}
                variants={fadeUp}
                className={cn(
                  "card-elegant p-6 cursor-pointer transition-all",
                  selectedStatus === status.id && "ring-2 ring-accent"
                )}
                onClick={() => setSelectedStatus(selectedStatus === status.id ? null : status.id)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="flex items-center gap-4 lg:w-1/4">
                    <div className="p-3 rounded-lg bg-secondary">
                      <Scale size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold">{status.shortName}</h3>
                      <p className="text-sm text-muted-foreground">{status.name}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                    <div>
                      <p className="text-xs text-muted-foreground">Capital minimum</p>
                      <p className="font-semibold">{status.minCapital === 0 ? 'Aucun' : `${status.minCapital} €`}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Charges sociales</p>
                      <p className="font-semibold">{status.socialChargesRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Imposition</p>
                      <p className="font-semibold text-sm">{status.taxationType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Responsabilité</p>
                      <p className="font-semibold text-sm">{status.liability.includes('Limitée') ? 'Limitée' : 'Illimitée'}</p>
                    </div>
                  </div>

                  <div className="lg:w-auto">
                    <Button variant="ghost" size="sm">
                      Détails
                      <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedStatus === status.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-success flex items-center gap-2 mb-3">
                          <Check size={18} /> Avantages
                        </h4>
                        <ul className="space-y-2">
                          {status.advantages.map((adv, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Check size={14} className="text-success mt-0.5 shrink-0" />
                              {adv}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                          <X size={18} /> Inconvénients
                        </h4>
                        <ul className="space-y-2">
                          {status.disadvantages.map((dis, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <X size={14} className="text-destructive mt-0.5 shrink-0" />
                              {dis}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Idéal pour</h4>
                      <div className="flex flex-wrap gap-2">
                        {status.bestFor.map((item, i) => (
                          <Badge key={i} variant="secondary">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalStatuses.map((status) => (
              <Card key={status.id} className="p-6 card-elegant">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Scale size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold">{status.shortName}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{status.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Capital</span>
                    <span className="font-medium">{status.minCapital === 0 ? 'Aucun' : `${status.minCapital} €`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Charges</span>
                    <span className="font-medium">{status.socialChargesRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Associés max</span>
                    <span className="font-medium">{status.maxAssociates === -1 ? 'Illimité' : status.maxAssociates}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Voir la fiche complète
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="simulator" className="space-y-6">
          <Card className="p-8 card-elegant max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-lg bg-secondary">
                <Calculator size={24} className="text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Simulateur de charges</h2>
                <p className="text-sm text-muted-foreground">Estimez vos charges selon le statut choisi</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-muted rounded-lg text-center">
                <HelpCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Le simulateur complet sera bientôt disponible.
                  <br />
                  Prenez rendez-vous avec Stéphanie pour une étude personnalisée.
                </p>
                <Button variant="hero" className="mt-4">
                  Prendre rendez-vous
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
