import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, PiggyBank, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimulationResult {
  chargesSociales: number;
  impots: number;
  netAvantImpot: number;
  netApresImpot: number;
  tauxCharges: number;
  tauxTotal: number;
}

const chargesRates: Record<string, { taux: number; label: string; description: string }> = {
  "auto-entrepreneur-services": {
    taux: 0.222,
    label: "Auto-entrepreneur (Services)",
    description: "Prestations de services BIC et BNC"
  },
  "auto-entrepreneur-commerce": {
    taux: 0.128,
    label: "Auto-entrepreneur (Commerce)",
    description: "Achat/revente de marchandises"
  },
  "auto-entrepreneur-liberal": {
    taux: 0.222,
    label: "Auto-entrepreneur (Libéral CIPAV)",
    description: "Professions libérales relevant de la CIPAV"
  },
  "eurl-is": {
    taux: 0.45,
    label: "EURL à l'IS (gérant majoritaire)",
    description: "Charges sur rémunération du gérant"
  },
  "sarl": {
    taux: 0.45,
    label: "SARL (gérant majoritaire)",
    description: "Charges sur rémunération du gérant"
  },
  "sasu": {
    taux: 0.82,
    label: "SASU (président salarié)",
    description: "Charges patronales + salariales"
  },
  "sas": {
    taux: 0.82,
    label: "SAS (président salarié)",
    description: "Charges patronales + salariales"
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default function SimulateurCharges() {
  const [revenu, setRevenu] = useState<string>('50000');
  const [statut, setStatut] = useState<string>('auto-entrepreneur-services');
  const [result, setResult] = useState<SimulationResult | null>(null);

  const calculateCharges = () => {
    const revenuNum = parseFloat(revenu) || 0;
    const rate = chargesRates[statut];
    
    if (!rate) return;

    let chargesSociales: number;
    let baseImposable: number;

    if (statut.startsWith('auto-entrepreneur')) {
      // Auto-entrepreneur: charges sur CA
      chargesSociales = revenuNum * rate.taux;
      // Abattement forfaitaire pour calcul IR
      const abattement = statut.includes('commerce') ? 0.71 : 0.34;
      baseImposable = revenuNum * (1 - abattement);
    } else if (statut.includes('sasu') || statut.includes('sas')) {
      // SASU/SAS: charges sur brut pour avoir le coût total employeur
      // Le revenu saisi est le coût total employeur
      // Charges = environ 45% du brut, brut = 55% du coût total
      const brutApprox = revenuNum / 1.45;
      chargesSociales = revenuNum - brutApprox;
      baseImposable = brutApprox * 0.78; // Net imposable après charges salariales
    } else {
      // EURL/SARL: charges sur rémunération
      chargesSociales = revenuNum * rate.taux;
      baseImposable = revenuNum - chargesSociales;
    }

    // Calcul IR simplifié (barème 2024)
    let impots = 0;
    if (baseImposable > 11294) {
      if (baseImposable <= 28797) {
        impots = (baseImposable - 11294) * 0.11;
      } else if (baseImposable <= 82341) {
        impots = (28797 - 11294) * 0.11 + (baseImposable - 28797) * 0.30;
      } else if (baseImposable <= 177106) {
        impots = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (baseImposable - 82341) * 0.41;
      } else {
        impots = (28797 - 11294) * 0.11 + (82341 - 28797) * 0.30 + (177106 - 82341) * 0.41 + (baseImposable - 177106) * 0.45;
      }
    }

    const netAvantImpot = revenuNum - chargesSociales;
    const netApresImpot = netAvantImpot - impots;

    setResult({
      chargesSociales,
      impots,
      netAvantImpot,
      netApresImpot,
      tauxCharges: (chargesSociales / revenuNum) * 100,
      tauxTotal: ((chargesSociales + impots) / revenuNum) * 100,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-elegant max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">
              Simulateur de Charges Sociales
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estimez vos charges sociales et votre revenu net selon votre statut juridique
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <Card className="border-none shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-accent" />
                  Paramètres de simulation
                </CardTitle>
                <CardDescription>
                  Entrez votre revenu et sélectionnez votre statut
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="statut">Statut juridique</Label>
                  <Select value={statut} onValueChange={setStatut}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(chargesRates).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex flex-col">
                            <span>{value.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    {chargesRates[statut]?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="revenu">
                    {statut.startsWith('auto-entrepreneur') 
                      ? "Chiffre d'affaires annuel (€)"
                      : "Rémunération brute annuelle (€)"}
                  </Label>
                  <Input
                    id="revenu"
                    type="number"
                    value={revenu}
                    onChange={(e) => setRevenu(e.target.value)}
                    placeholder="50000"
                    className="text-lg"
                  />
                </div>

                <Button onClick={calculateCharges} className="w-full" size="lg">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer mes charges
                </Button>

                <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Ces calculs sont des estimations simplifiées à titre indicatif. 
                    Consultez un expert-comptable pour une simulation précise de votre situation.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Résultats */}
            <div className="space-y-6">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-none shadow-elegant bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PiggyBank className="h-5 w-5" />
                        Votre revenu net estimé
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-4xl font-bold mb-2">
                          {formatCurrency(result.netApresImpot)}
                        </p>
                        <p className="text-primary-foreground/70">
                          par an après charges et impôts
                        </p>
                        <p className="text-2xl font-semibold mt-4">
                          {formatCurrency(result.netApresImpot / 12)}
                          <span className="text-lg font-normal text-primary-foreground/70"> / mois</span>
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-elegant">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        Détail du calcul
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="montants" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="montants">Montants</TabsTrigger>
                          <TabsTrigger value="pourcentages">Taux</TabsTrigger>
                        </TabsList>
                        <TabsContent value="montants" className="space-y-4 pt-4">
                          <div className="flex justify-between items-center py-3 border-b">
                            <span className="text-muted-foreground">
                              {statut.startsWith('auto-entrepreneur') ? "Chiffre d'affaires" : "Rémunération brute"}
                            </span>
                            <span className="font-semibold">{formatCurrency(parseFloat(revenu))}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b">
                            <span className="text-muted-foreground">Charges sociales</span>
                            <span className="font-semibold text-orange-600">
                              - {formatCurrency(result.chargesSociales)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b">
                            <span className="text-muted-foreground">Net avant impôts</span>
                            <span className="font-semibold">{formatCurrency(result.netAvantImpot)}</span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b">
                            <span className="text-muted-foreground">Impôt sur le revenu (estimé)</span>
                            <span className="font-semibold text-orange-600">
                              - {formatCurrency(result.impots)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3 bg-accent/10 px-3 rounded-lg">
                            <span className="font-semibold">Net après impôts</span>
                            <span className="font-bold text-lg text-accent">
                              {formatCurrency(result.netApresImpot)}
                            </span>
                          </div>
                        </TabsContent>
                        <TabsContent value="pourcentages" className="space-y-4 pt-4">
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Taux de charges sociales</span>
                                <span className="font-semibold">{result.tauxCharges.toFixed(1)}%</span>
                              </div>
                              <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-orange-500" 
                                  style={{ width: `${Math.min(result.tauxCharges, 100)}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Taux total (charges + IR)</span>
                                <span className="font-semibold">{result.tauxTotal.toFixed(1)}%</span>
                              </div>
                              <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary" 
                                  style={{ width: `${Math.min(result.tauxTotal, 100)}%` }}
                                />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Reste en poche</span>
                                <span className="font-semibold text-accent">
                                  {(100 - result.tauxTotal).toFixed(1)}%
                                </span>
                              </div>
                              <div className="h-3 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-accent" 
                                  style={{ width: `${Math.max(100 - result.tauxTotal, 0)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="border-none shadow-elegant h-full flex items-center justify-center min-h-[400px]">
                  <CardContent className="text-center py-12">
                    <Calculator className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Remplissez le formulaire et cliquez sur "Calculer" pour voir vos résultats
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
