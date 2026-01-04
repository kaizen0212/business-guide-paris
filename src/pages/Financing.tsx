import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wallet,
  Filter,
  ExternalLink,
  Euro,
  MapPin,
  Building,
  ChevronDown,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { financingAids, parisIncubators } from '@/data/mockData';

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

const typeColors = {
  subvention: 'bg-success/10 text-success',
  pret: 'bg-accent/10 text-accent',
  garantie: 'bg-primary/10 text-primary',
  exoneration: 'bg-secondary text-secondary-foreground',
};

const typeLabels = {
  subvention: 'Subvention',
  pret: 'Prêt',
  garantie: 'Garantie',
  exoneration: 'Exonération',
};

export default function Financing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filteredAids = financingAids.filter((aid) => {
    const matchesSearch = aid.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      aid.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || aid.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || aid.region.includes(regionFilter);
    return matchesSearch && matchesType && matchesRegion;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold">Financement</h1>
        <p className="text-muted-foreground mt-2">
          Découvrez les aides et financements disponibles pour votre projet
        </p>
      </div>

      <Tabs defaultValue="aids" className="space-y-6">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="aids">Aides & Subventions</TabsTrigger>
          <TabsTrigger value="fundraising">Levée de fonds</TabsTrigger>
          <TabsTrigger value="loan">Prêt bancaire</TabsTrigger>
        </TabsList>

        <TabsContent value="aids" className="space-y-6">
          {/* Filters */}
          <div className="card-elegant p-4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher une aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type d'aide" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="subvention">Subventions</SelectItem>
                <SelectItem value="pret">Prêts</SelectItem>
                <SelectItem value="garantie">Garanties</SelectItem>
                <SelectItem value="exoneration">Exonérations</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                <SelectItem value="Paris">Paris</SelectItem>
                <SelectItem value="Île-de-France">Île-de-France</SelectItem>
                <SelectItem value="France">National</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid gap-4"
          >
            {filteredAids.map((aid) => (
              <motion.div key={aid.id} variants={fadeUp}>
                <Collapsible>
                  <Card className="card-elegant overflow-hidden">
                    <CollapsibleTrigger className="w-full p-6 text-left hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 rounded-lg bg-secondary shrink-0">
                            <Wallet size={24} className="text-accent" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-serif font-semibold">{aid.name}</h3>
                              <Badge className={typeColors[aid.type]}>
                                {typeLabels[aid.type]}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{aid.provider}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          {aid.amount.max > 0 && (
                            <div className="flex items-center gap-2">
                              <Euro size={16} className="text-accent" />
                              <span>
                                {aid.amount.min.toLocaleString()} - {aid.amount.max.toLocaleString()} €
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{aid.region}</span>
                          </div>
                          <ChevronDown size={20} className="text-muted-foreground" />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="px-6 pb-6 pt-2 border-t border-border">
                        <p className="text-muted-foreground mb-4">{aid.description}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Critères d'éligibilité</h4>
                            <ul className="space-y-1">
                              {aid.eligibility.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Secteurs concernés</h4>
                            <div className="flex flex-wrap gap-2">
                              {aid.sectors.map((sector, i) => (
                                <Badge key={i} variant="outline">{sector}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                          <Button variant="hero" size="sm" asChild>
                            <a href={aid.link} target="_blank" rel="noopener noreferrer">
                              Accéder au site officiel
                              <ExternalLink size={14} />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </motion.div>
            ))}
          </motion.div>

          {filteredAids.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune aide trouvée pour ces critères.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fundraising" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Guide */}
            <Card className="card-elegant p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Guide levée de fonds</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Les étapes clés pour réussir votre levée de fonds.
              </p>
              <ol className="space-y-3 text-sm">
                {[
                  'Préparer un pitch deck convaincant',
                  'Définir le montant et la valorisation',
                  'Identifier les bons investisseurs',
                  'Négocier les termes (term sheet)',
                  'Réaliser la due diligence',
                  'Signer les documents juridiques',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>

            {/* Incubators */}
            <Card className="card-elegant p-6">
              <h3 className="font-serif text-xl font-semibold mb-4">Incubateurs parisiens</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Les principaux incubateurs de la région parisienne.
              </p>
              <div className="space-y-3">
                {parisIncubators.map((incubator, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Building size={20} className="text-accent shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-sm">{incubator.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {incubator.area} • {incubator.speciality}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loan" className="space-y-6">
          <Card className="card-elegant p-8 max-w-2xl">
            <h3 className="font-serif text-xl font-semibold mb-4">Simulateur de prêt</h3>
            <p className="text-muted-foreground mb-6">
              Le simulateur complet sera bientôt disponible. 
              En attendant, prenez rendez-vous pour une étude personnalisée.
            </p>
            <Button variant="hero">
              Prendre rendez-vous avec un conseiller
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
