import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Download,
  Save,
  ChevronRight,
  Calculator,
  PieChart,
  LineChart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const sections = [
  { id: 'executive', label: 'Executive Summary', icon: FileText, progress: 0 },
  { id: 'project', label: 'Présentation', icon: Target, progress: 0 },
  { id: 'market', label: 'Étude de marché', icon: TrendingUp, progress: 0 },
  { id: 'strategy', label: 'Stratégie', icon: Users, progress: 0 },
  { id: 'operations', label: 'Plan opérationnel', icon: BarChart3, progress: 0 },
  { id: 'financial', label: 'Prévisionnel', icon: DollarSign, progress: 0 },
];

const initialFinancialData = {
  year1: { revenue: 50000, costs: 30000, charges: 8000 },
  year2: { revenue: 80000, costs: 45000, charges: 12000 },
  year3: { revenue: 120000, costs: 60000, charges: 18000 },
};

export default function BusinessPlan() {
  const [activeSection, setActiveSection] = useState('executive');
  const [financialData, setFinancialData] = useState(initialFinancialData);
  const [formData, setFormData] = useState({
    executiveSummary: '',
    projectDescription: '',
    vision: '',
    targetMarket: '',
    competition: '',
    positioning: '',
    marketingStrategy: '',
    salesStrategy: '',
    operationalPlan: '',
    team: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinancialChange = (year: string, field: string, value: string) => {
    setFinancialData((prev) => ({
      ...prev,
      [year]: { ...prev[year as keyof typeof prev], [field]: parseInt(value) || 0 },
    }));
  };

  const calculateProfit = (year: keyof typeof financialData) => {
    const data = financialData[year];
    return data.revenue - data.costs - data.charges;
  };

  const calculateMargin = (year: keyof typeof financialData) => {
    const data = financialData[year];
    const profit = calculateProfit(year);
    return data.revenue > 0 ? ((profit / data.revenue) * 100).toFixed(1) : '0';
  };

  const totalProgress = sections.reduce((acc, s) => acc + s.progress, 0) / sections.length;

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
          <h1 className="text-3xl font-serif font-semibold">Business Plan</h1>
          <p className="text-muted-foreground mt-2">
            Construisez votre business plan professionnel étape par étape
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Save size={18} />
            Sauvegarder
          </Button>
          <Button variant="hero" className="gap-2">
            <Download size={18} />
            Exporter PDF
          </Button>
        </div>
      </motion.div>

      {/* Progress Overview */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="card-elegant p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Progression globale</h3>
          <span className="text-accent font-semibold">{totalProgress.toFixed(0)}%</span>
        </div>
        <Progress value={totalProgress} className="h-2" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`p-3 rounded-lg text-left transition-all ${
                activeSection === section.id
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              <section.icon size={20} className="mb-2" />
              <p className="text-xs font-medium truncate">{section.label}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-6">
        <TabsList className="hidden">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Executive Summary */}
        <TabsContent value="executive" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <FileText size={24} className="text-accent" />
              Executive Summary
            </h2>
            <p className="text-muted-foreground mb-6">
              Résumez votre projet en quelques paragraphes. C'est la première chose que liront vos
              investisseurs.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="summary">Résumé du projet</Label>
                <Textarea
                  id="summary"
                  placeholder="Décrivez votre projet, votre proposition de valeur et vos objectifs principaux..."
                  className="min-h-[200px] mt-2"
                  value={formData.executiveSummary}
                  onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Project Presentation */}
        <TabsContent value="project" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <Target size={24} className="text-accent" />
              Présentation du Projet
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre produit ou service en détail..."
                  className="min-h-[150px] mt-2"
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="vision">Vision et mission</Label>
                <Textarea
                  id="vision"
                  placeholder="Quelle est votre vision à long terme ? Quelle mission vous fixez-vous ?"
                  className="min-h-[100px] mt-2"
                  value={formData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Market Study */}
        <TabsContent value="market" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={24} className="text-accent" />
              Étude de Marché
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="targetMarket">Marché cible</Label>
                <Textarea
                  id="targetMarket"
                  placeholder="Décrivez votre marché cible, sa taille, ses tendances..."
                  className="min-h-[120px] mt-2"
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="competition">Analyse de la concurrence</Label>
                <Textarea
                  id="competition"
                  placeholder="Qui sont vos concurrents ? Quels sont leurs forces et faiblesses ?"
                  className="min-h-[120px] mt-2"
                  value={formData.competition}
                  onChange={(e) => handleInputChange('competition', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="positioning">Positionnement</Label>
                <Textarea
                  id="positioning"
                  placeholder="Comment vous différenciez-vous de la concurrence ?"
                  className="min-h-[100px] mt-2"
                  value={formData.positioning}
                  onChange={(e) => handleInputChange('positioning', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Strategy */}
        <TabsContent value="strategy" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <Users size={24} className="text-accent" />
              Stratégie Commerciale
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="marketing">Stratégie marketing</Label>
                <Textarea
                  id="marketing"
                  placeholder="Comment allez-vous promouvoir votre offre ?"
                  className="min-h-[120px] mt-2"
                  value={formData.marketingStrategy}
                  onChange={(e) => handleInputChange('marketingStrategy', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sales">Stratégie de vente</Label>
                <Textarea
                  id="sales"
                  placeholder="Comment allez-vous vendre vos produits/services ?"
                  className="min-h-[120px] mt-2"
                  value={formData.salesStrategy}
                  onChange={(e) => handleInputChange('salesStrategy', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Operations */}
        <TabsContent value="operations" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <BarChart3 size={24} className="text-accent" />
              Plan Opérationnel
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="operations">Organisation opérationnelle</Label>
                <Textarea
                  id="operations"
                  placeholder="Comment allez-vous organiser votre activité au quotidien ?"
                  className="min-h-[120px] mt-2"
                  value={formData.operationalPlan}
                  onChange={(e) => handleInputChange('operationalPlan', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="team">Équipe</Label>
                <Textarea
                  id="team"
                  placeholder="Présentez votre équipe et les compétences clés..."
                  className="min-h-[120px] mt-2"
                  value={formData.team}
                  onChange={(e) => handleInputChange('team', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        </TabsContent>

        {/* Financial */}
        <TabsContent value="financial" className="space-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="card-elegant p-6"
          >
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center gap-2">
              <DollarSign size={24} className="text-accent" />
              Prévisionnel Financier
            </h2>
            <p className="text-muted-foreground mb-6">
              Renseignez vos prévisions financières sur 3 ans. Les calculs sont automatiques.
            </p>

            {/* Financial Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Indicateur</TableHead>
                    <TableHead className="text-right">Année 1</TableHead>
                    <TableHead className="text-right">Année 2</TableHead>
                    <TableHead className="text-right">Année 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Chiffre d'affaires (€)</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year1.revenue}
                        onChange={(e) => handleFinancialChange('year1', 'revenue', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year2.revenue}
                        onChange={(e) => handleFinancialChange('year2', 'revenue', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year3.revenue}
                        onChange={(e) => handleFinancialChange('year3', 'revenue', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Coûts directs (€)</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year1.costs}
                        onChange={(e) => handleFinancialChange('year1', 'costs', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year2.costs}
                        onChange={(e) => handleFinancialChange('year2', 'costs', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year3.costs}
                        onChange={(e) => handleFinancialChange('year3', 'costs', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Charges fixes (€)</TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year1.charges}
                        onChange={(e) => handleFinancialChange('year1', 'charges', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year2.charges}
                        onChange={(e) => handleFinancialChange('year2', 'charges', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Input
                        type="number"
                        value={financialData.year3.charges}
                        onChange={(e) => handleFinancialChange('year3', 'charges', e.target.value)}
                        className="w-28 ml-auto text-right"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>Résultat net (€)</TableCell>
                    <TableCell
                      className={`text-right ${calculateProfit('year1') >= 0 ? 'text-success' : 'text-destructive'}`}
                    >
                      {calculateProfit('year1').toLocaleString()} €
                    </TableCell>
                    <TableCell
                      className={`text-right ${calculateProfit('year2') >= 0 ? 'text-success' : 'text-destructive'}`}
                    >
                      {calculateProfit('year2').toLocaleString()} €
                    </TableCell>
                    <TableCell
                      className={`text-right ${calculateProfit('year3') >= 0 ? 'text-success' : 'text-destructive'}`}
                    >
                      {calculateProfit('year3').toLocaleString()} €
                    </TableCell>
                  </TableRow>
                  <TableRow className="bg-muted/50 font-semibold">
                    <TableCell>Marge nette (%)</TableCell>
                    <TableCell className="text-right">{calculateMargin('year1')}%</TableCell>
                    <TableCell className="text-right">{calculateMargin('year2')}%</TableCell>
                    <TableCell className="text-right">{calculateMargin('year3')}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Quick Calculator */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="card-elegant p-4 bg-muted/50">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <Calculator size={18} />
                  <span className="text-sm font-medium">Seuil de rentabilité</span>
                </div>
                <p className="text-2xl font-serif font-semibold">
                  {(
                    (financialData.year1.charges /
                      (1 - financialData.year1.costs / financialData.year1.revenue)) ||
                    0
                  ).toLocaleString()}{' '}
                  €
                </p>
              </div>
              <div className="card-elegant p-4 bg-muted/50">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <PieChart size={18} />
                  <span className="text-sm font-medium">Croissance CA</span>
                </div>
                <p className="text-2xl font-serif font-semibold text-success">
                  +
                  {(
                    ((financialData.year3.revenue - financialData.year1.revenue) /
                      financialData.year1.revenue) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
              <div className="card-elegant p-4 bg-muted/50">
                <div className="flex items-center gap-2 text-accent mb-2">
                  <LineChart size={18} />
                  <span className="text-sm font-medium">Résultat cumulé</span>
                </div>
                <p className="text-2xl font-serif font-semibold">
                  {(
                    calculateProfit('year1') +
                    calculateProfit('year2') +
                    calculateProfit('year3')
                  ).toLocaleString()}{' '}
                  €
                </p>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex justify-between"
      >
        <Button
          variant="outline"
          onClick={() => {
            const currentIndex = sections.findIndex((s) => s.id === activeSection);
            if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
          }}
          disabled={activeSection === sections[0].id}
        >
          Section précédente
        </Button>
        <Button
          variant="hero"
          onClick={() => {
            const currentIndex = sections.findIndex((s) => s.id === activeSection);
            if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
          }}
          disabled={activeSection === sections[sections.length - 1].id}
          className="gap-2"
        >
          Section suivante
          <ChevronRight size={18} />
        </Button>
      </motion.div>
    </div>
  );
}
