import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Video,
  Download,
  ExternalLink,
  BookOpen,
  Search,
  Star,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources } from '@/data/mockData';
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

const typeIcons = {
  article: BookOpen,
  template: FileText,
  video: Video,
  guide: BookOpen,
};

const typeLabels = {
  article: 'Article',
  template: 'Template',
  video: 'Vidéo',
  guide: 'Guide',
};

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-semibold">Ressources</h1>
        <p className="text-muted-foreground mt-2">
          Guides, templates et outils pour réussir votre projet
        </p>
      </div>

      {/* Search */}
      <div className="card-elegant p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Rechercher une ressource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2">
          <TabsTrigger value="all">Tout</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat}
            </TabsTrigger>
          ))}
          <TabsTrigger value="favorites" className="ml-auto">
            <Star size={14} className="mr-1" />
            Favoris ({favorites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ResourceGrid
            resources={filteredResources}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat}>
            <ResourceGrid
              resources={filteredResources.filter((r) => r.category === cat)}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          </TabsContent>
        ))}

        <TabsContent value="favorites">
          <ResourceGrid
            resources={filteredResources.filter((r) => favorites.includes(r.id))}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceGrid({
  resources,
  favorites,
  onToggleFavorite,
}: {
  resources: typeof import('@/data/mockData').resources;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}) {
  if (resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune ressource trouvée.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {resources.map((resource) => {
        const Icon = typeIcons[resource.type];
        const isFavorite = favorites.includes(resource.id);

        return (
          <motion.div key={resource.id} variants={fadeUp}>
            <Card className="card-elegant p-5 h-full flex flex-col">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="p-2.5 rounded-lg bg-secondary">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{typeLabels[resource.type]}</Badge>
                  <button
                    onClick={() => onToggleFavorite(resource.id)}
                    className={cn(
                      "p-1.5 rounded-md transition-colors",
                      isFavorite
                        ? "text-accent"
                        : "text-muted-foreground hover:text-accent"
                    )}
                  >
                    <Star
                      size={18}
                      className={isFavorite ? "fill-current" : ""}
                    />
                  </button>
                </div>
              </div>

              <h3 className="font-serif font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground flex-1">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-1 mt-4">
                {resource.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                {resource.downloadUrl ? (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href={resource.downloadUrl}>
                      <Download size={14} />
                      Télécharger
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a
                      href={resource.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} />
                      Accéder
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
