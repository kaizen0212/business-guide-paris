import type { LegalStatus, FinancingAid, AdminStep, Resource, FAQ, Testimonial } from '@/types';

export const legalStatuses: LegalStatus[] = [
  {
    id: 'auto-entrepreneur',
    name: 'Auto-entrepreneur (Micro-entreprise)',
    shortName: 'Auto-entrepreneur',
    description: 'Régime simplifié idéal pour tester une activité ou exercer en complément.',
    minCapital: 0,
    maxAssociates: 1,
    socialChargesRate: 22,
    taxationType: 'IR (versement libératoire possible)',
    liability: 'Illimitée sur patrimoine personnel',
    advantages: [
      'Création simple et rapide',
      'Comptabilité allégée',
      'Pas de TVA jusqu\'à un certain seuil',
      'Cotisations proportionnelles au CA'
    ],
    disadvantages: [
      'Plafonds de chiffre d\'affaires',
      'Pas de déduction des charges',
      'Responsabilité illimitée',
      'Image moins professionnelle'
    ],
    bestFor: ['Activité secondaire', 'Test de marché', 'Freelance débutant']
  },
  {
    id: 'eurl',
    name: 'Entreprise Unipersonnelle à Responsabilité Limitée',
    shortName: 'EURL',
    description: 'SARL à associé unique, adaptée pour un entrepreneur seul souhaitant protéger son patrimoine.',
    minCapital: 1,
    maxAssociates: 1,
    socialChargesRate: 45,
    taxationType: 'IR ou IS (sur option)',
    liability: 'Limitée aux apports',
    advantages: [
      'Responsabilité limitée',
      'Patrimoine personnel protégé',
      'Crédibilité auprès des partenaires',
      'Possibilité d\'évolution en SARL'
    ],
    disadvantages: [
      'Formalités de création plus lourdes',
      'Charges sociales élevées',
      'Comptabilité plus complexe',
      'Coûts de fonctionnement'
    ],
    bestFor: ['Entrepreneur solo', 'Activité à risque', 'Projet d\'investissement']
  },
  {
    id: 'sasu',
    name: 'Société par Actions Simplifiée Unipersonnelle',
    shortName: 'SASU',
    description: 'Forme juridique flexible pour un entrepreneur unique, avec un régime social avantageux.',
    minCapital: 1,
    maxAssociates: 1,
    socialChargesRate: 65,
    taxationType: 'IS (IR temporaire possible)',
    liability: 'Limitée aux apports',
    advantages: [
      'Grande flexibilité statutaire',
      'Statut assimilé salarié',
      'Image professionnelle',
      'Facilité pour lever des fonds'
    ],
    disadvantages: [
      'Charges sociales très élevées',
      'Formalités complexes',
      'Coût de fonctionnement élevé',
      'Pas de chômage en cas de cessation'
    ],
    bestFor: ['Startup', 'Levée de fonds prévue', 'Dirigeant salarié']
  },
  {
    id: 'sarl',
    name: 'Société à Responsabilité Limitée',
    shortName: 'SARL',
    description: 'Forme juridique classique pour les projets à plusieurs associés avec un cadre sécurisé.',
    minCapital: 1,
    maxAssociates: 100,
    socialChargesRate: 45,
    taxationType: 'IS (IR possible sous conditions)',
    liability: 'Limitée aux apports',
    advantages: [
      'Cadre juridique sécurisé',
      'Responsabilité limitée',
      'Adaptée aux projets familiaux',
      'Cession de parts encadrée'
    ],
    disadvantages: [
      'Statut TNS du gérant majoritaire',
      'Rigidité des statuts',
      'Formalisme important',
      'Moins attractive pour investisseurs'
    ],
    bestFor: ['Projet familial', 'PME traditionnelle', 'Associés stables']
  },
  {
    id: 'sas',
    name: 'Société par Actions Simplifiée',
    shortName: 'SAS',
    description: 'Forme la plus flexible, idéale pour les projets innovants et les levées de fonds.',
    minCapital: 1,
    maxAssociates: -1,
    socialChargesRate: 65,
    taxationType: 'IS',
    liability: 'Limitée aux apports',
    advantages: [
      'Liberté statutaire totale',
      'Facilité pour investisseurs',
      'Image moderne et dynamique',
      'Transmission simplifiée'
    ],
    disadvantages: [
      'Charges sociales élevées',
      'Complexité de rédaction des statuts',
      'Coût de fonctionnement',
      'Pas de protection chômage dirigeant'
    ],
    bestFor: ['Startup', 'Investisseurs multiples', 'Projet tech/innovation']
  }
];

export const financingAids: FinancingAid[] = [
  {
    id: 'acre',
    name: 'ACRE - Aide aux Créateurs et Repreneurs d\'Entreprise',
    type: 'exoneration',
    provider: 'Urssaf',
    amount: { min: 0, max: 0 },
    eligibility: ['Demandeur d\'emploi', 'Moins de 26 ans', 'RSA', 'ASS'],
    sectors: ['Tous secteurs'],
    region: 'France entière',
    description: 'Exonération partielle de charges sociales pendant 12 mois pour les créateurs d\'entreprise.',
    link: 'https://www.urssaf.fr'
  },
  {
    id: 'nacre',
    name: 'NACRE - Nouvel Accompagnement pour la Création et la Reprise d\'Entreprise',
    type: 'pret',
    provider: 'Région Île-de-France',
    amount: { min: 1000, max: 10000 },
    eligibility: ['Demandeur d\'emploi', 'RSA', 'ASS'],
    sectors: ['Tous secteurs'],
    region: 'Île-de-France',
    description: 'Accompagnement et prêt à taux zéro pour la création ou reprise d\'entreprise.',
    link: 'https://www.iledefrance.fr'
  },
  {
    id: 'pret-honneur',
    name: 'Prêt d\'Honneur Initiative France',
    type: 'pret',
    provider: 'Initiative France',
    amount: { min: 3000, max: 50000 },
    eligibility: ['Créateur d\'entreprise', 'Projet viable'],
    sectors: ['Tous secteurs'],
    region: 'France entière',
    description: 'Prêt personnel à taux zéro sans garantie pour renforcer vos fonds propres.',
    link: 'https://www.initiative-france.fr'
  },
  {
    id: 'bpi-creation',
    name: 'Garantie Création Bpifrance',
    type: 'garantie',
    provider: 'Bpifrance',
    amount: { min: 0, max: 0 },
    eligibility: ['TPE/PME de moins de 3 ans'],
    sectors: ['Tous secteurs'],
    region: 'France entière',
    description: 'Garantie jusqu\'à 60% du montant du prêt bancaire pour faciliter l\'accès au crédit.',
    link: 'https://www.bpifrance.fr'
  },
  {
    id: 'paris-innovation',
    name: 'Paris Innovation Amorçage',
    type: 'subvention',
    provider: 'Ville de Paris / Bpifrance',
    amount: { min: 30000, max: 90000 },
    eligibility: ['Startup innovante', 'Siège à Paris', 'Moins de 2 ans'],
    sectors: ['Tech', 'Innovation', 'Deeptech'],
    region: 'Paris',
    description: 'Subvention pour les startups parisiennes en phase d\'amorçage.',
    link: 'https://www.paris.fr'
  },
  {
    id: 'aide-idf-emergence',
    name: 'Aide à l\'Émergence Île-de-France',
    type: 'subvention',
    provider: 'Région Île-de-France',
    amount: { min: 10000, max: 30000 },
    eligibility: ['Projet innovant', 'Basé en IDF'],
    sectors: ['Innovation', 'ESS', 'Industrie'],
    region: 'Île-de-France',
    description: 'Soutien aux projets émergents innovants en Île-de-France.',
    link: 'https://www.iledefrance.fr'
  }
];

export const adminSteps: AdminStep[] = [
  {
    id: '1',
    title: 'Définir votre projet et étude de marché',
    description: 'Validez votre idée avec une étude de marché approfondie et un business plan solide.',
    status: 'todo',
    documents: ['Business plan', 'Étude de marché', 'Prévisionnel financier'],
    links: [
      { label: 'Guide CCI Paris', url: 'https://www.cci-paris-idf.fr' }
    ],
    estimatedDuration: '2-4 semaines',
    order: 1
  },
  {
    id: '2',
    title: 'Choisir le statut juridique',
    description: 'Sélectionnez la forme juridique adaptée à votre projet et votre situation.',
    status: 'todo',
    documents: ['Comparatif des statuts', 'Simulation charges'],
    links: [
      { label: 'Bpifrance Création', url: 'https://bpifrance-creation.fr' }
    ],
    estimatedDuration: '1 semaine',
    order: 2
  },
  {
    id: '3',
    title: 'Domicilier l\'entreprise',
    description: 'Choisissez l\'adresse du siège social de votre entreprise.',
    status: 'todo',
    documents: ['Justificatif de domiciliation', 'Contrat de domiciliation'],
    links: [
      { label: 'Domiciliation Paris', url: 'https://www.service-public.fr' }
    ],
    estimatedDuration: '1-2 jours',
    order: 3
  },
  {
    id: '4',
    title: 'Rédiger les statuts',
    description: 'Rédigez les statuts de votre société avec toutes les mentions obligatoires.',
    status: 'todo',
    documents: ['Statuts signés', 'Modèle de statuts'],
    links: [
      { label: 'Modèles officiels', url: 'https://www.service-public.fr' }
    ],
    estimatedDuration: '1 semaine',
    order: 4
  },
  {
    id: '5',
    title: 'Déposer le capital social',
    description: 'Déposez le capital sur un compte bloqué et obtenez l\'attestation de dépôt.',
    status: 'todo',
    documents: ['Attestation de dépôt de capital'],
    links: [
      { label: 'Banques partenaires', url: 'https://www.qonto.com' }
    ],
    estimatedDuration: '2-3 jours',
    order: 5
  },
  {
    id: '6',
    title: 'Publier l\'annonce légale',
    description: 'Publiez l\'avis de constitution dans un journal d\'annonces légales.',
    status: 'todo',
    documents: ['Attestation de parution'],
    links: [
      { label: 'Annonces légales', url: 'https://www.legifrance.gouv.fr' }
    ],
    estimatedDuration: '1-2 jours',
    order: 6
  },
  {
    id: '7',
    title: 'Immatriculer l\'entreprise',
    description: 'Déposez votre dossier sur le Guichet Unique de l\'INPI pour l\'immatriculation.',
    status: 'todo',
    documents: ['Formulaire M0/P0', 'Pièce d\'identité', 'Justificatif de domicile'],
    links: [
      { label: 'Guichet Unique INPI', url: 'https://procedures.inpi.fr' }
    ],
    estimatedDuration: '1-2 semaines',
    order: 7
  },
  {
    id: '8',
    title: 'Recevoir le Kbis et numéros',
    description: 'Obtenez votre extrait Kbis, numéro SIREN et code APE.',
    status: 'todo',
    documents: ['Extrait Kbis', 'Avis SIREN'],
    links: [
      { label: 'Infogreffe', url: 'https://www.infogreffe.fr' }
    ],
    estimatedDuration: '1-2 semaines',
    order: 8
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Guide complet de la création d\'entreprise 2024',
    type: 'guide',
    category: 'Création',
    description: 'Tout ce qu\'il faut savoir pour créer son entreprise en France cette année.',
    externalUrl: '#',
    tags: ['création', 'guide', 'débutant']
  },
  {
    id: '2',
    title: 'Modèle de statuts SASU',
    type: 'template',
    category: 'Juridique',
    description: 'Statuts types pour une SASU avec clauses recommandées.',
    downloadUrl: '#',
    tags: ['statuts', 'SASU', 'juridique']
  },
  {
    id: '3',
    title: 'Template Business Plan Excel',
    type: 'template',
    category: 'Business Plan',
    description: 'Modèle complet avec prévisionnel financier sur 3 ans.',
    downloadUrl: '#',
    tags: ['business plan', 'financier', 'prévisionnel']
  },
  {
    id: '4',
    title: 'Fiscalité de l\'entrepreneur : les bases',
    type: 'article',
    category: 'Fiscal',
    description: 'Comprendre la TVA, l\'IS et l\'IR pour les entrepreneurs.',
    externalUrl: '#',
    tags: ['fiscalité', 'TVA', 'impôts']
  },
  {
    id: '5',
    title: 'Modèle de facture conforme',
    type: 'template',
    category: 'Comptabilité',
    description: 'Facture aux normes avec toutes les mentions légales.',
    downloadUrl: '#',
    tags: ['facture', 'comptabilité', 'template']
  }
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Quel est le meilleur statut pour démarrer seul ?',
    answer: 'Pour un démarrage solo, l\'auto-entreprise est idéale pour tester votre activité. Si vous prévoyez un CA important ou des investissements, la SASU offre plus de flexibilité et protège votre patrimoine.',
    category: 'Statut juridique'
  },
  {
    id: '2',
    question: 'Combien coûte la création d\'une entreprise ?',
    answer: 'Les frais varient selon le statut : gratuit pour l\'auto-entreprise, environ 250€ pour une SASU/SAS (annonce légale + greffe). Ajoutez les honoraires d\'avocat ou expert-comptable si vous faites appel à eux.',
    category: 'Coûts'
  },
  {
    id: '3',
    question: 'Combien de temps faut-il pour créer une entreprise ?',
    answer: 'L\'auto-entreprise se crée en 24-48h en ligne. Pour une société (SASU, SAS, SARL), comptez 2 à 4 semaines entre la rédaction des statuts et l\'obtention du Kbis.',
    category: 'Délais'
  },
  {
    id: '4',
    question: 'Puis-je créer mon entreprise en étant salarié ?',
    answer: 'Oui, sous conditions. Vérifiez votre contrat de travail (clause d\'exclusivité, non-concurrence). Vous devez respecter une obligation de loyauté envers votre employeur.',
    category: 'Cumul'
  },
  {
    id: '5',
    question: 'Comment financer mon projet sans apport ?',
    answer: 'Plusieurs options : prêt d\'honneur (Initiative France, Réseau Entreprendre), ACRE pour l\'exonération de charges, crowdfunding, et aides régionales. Le business plan solide est essentiel.',
    category: 'Financement'
  },
  {
    id: '6',
    question: 'Ai-je besoin d\'un expert-comptable ?',
    answer: 'Non obligatoire pour l\'auto-entreprise. Pour les sociétés, c\'est fortement recommandé pour la tenue comptable, les déclarations fiscales et sociales, et les conseils de gestion.',
    category: 'Comptabilité'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    company: 'GreenTech Solutions',
    sector: 'Technologie verte',
    quote: 'DOS m\'a accompagnée de A à Z. Grâce à Stéphanie, j\'ai pu créer ma SASU en toute sérénité et lever 200k€ en 6 mois.',
    rating: 5
  },
  {
    id: '2',
    name: 'Thomas Martin',
    company: 'Artisan du Web',
    sector: 'Services numériques',
    quote: 'Le module de business plan m\'a fait gagner un temps précieux. Mon banquier a été impressionné par la qualité du dossier.',
    rating: 5
  },
  {
    id: '3',
    name: 'Sophie Chen',
    company: 'Délices d\'Asie',
    sector: 'Restauration',
    quote: 'J\'étais perdue dans les démarches administratives. L\'accompagnement personnalisé a fait toute la différence.',
    rating: 5
  }
];

export const sectors = [
  'Commerce de détail',
  'Services aux entreprises',
  'Tech / Digital',
  'Restauration',
  'Artisanat',
  'Conseil',
  'Formation',
  'Santé / Bien-être',
  'Immobilier',
  'Transport / Logistique',
  'Communication / Marketing',
  'Industrie',
  'Agriculture',
  'BTP',
  'Autre'
];

export const parisIncubators = [
  { name: 'Station F', area: '13e arrondissement', speciality: 'Startups tous secteurs' },
  { name: 'Paris&Co', area: 'Paris', speciality: 'Innovation urbaine' },
  { name: 'La Ruche', area: 'Plusieurs sites', speciality: 'ESS et impact' },
  { name: 'Agoranov', area: '5e arrondissement', speciality: 'Deep tech' },
  { name: 'Le Cargo', area: '19e arrondissement', speciality: 'Startups numériques' }
];
