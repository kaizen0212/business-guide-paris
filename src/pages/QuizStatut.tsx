import { useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: {
    label: string;
    scores: Record<string, number>;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "Souhaitez-vous vous associer avec d'autres personnes ?",
    options: [
      { label: "Non, je veux être seul(e)", scores: { "Auto-entrepreneur": 3, "EURL": 3, "SASU": 3, "SARL": 0, "SAS": 0 } },
      { label: "Oui, avec 1 ou 2 associés", scores: { "Auto-entrepreneur": 0, "EURL": 0, "SASU": 0, "SARL": 3, "SAS": 2 } },
      { label: "Oui, avec plusieurs associés", scores: { "Auto-entrepreneur": 0, "EURL": 0, "SASU": 0, "SARL": 2, "SAS": 3 } },
    ],
  },
  {
    id: 2,
    question: "Quel est votre chiffre d'affaires prévisionnel annuel ?",
    options: [
      { label: "Moins de 77 700 € (services)", scores: { "Auto-entrepreneur": 3, "EURL": 1, "SASU": 1, "SARL": 1, "SAS": 0 } },
      { label: "Entre 77 700 € et 188 700 €", scores: { "Auto-entrepreneur": 1, "EURL": 2, "SASU": 2, "SARL": 2, "SAS": 1 } },
      { label: "Plus de 188 700 €", scores: { "Auto-entrepreneur": 0, "EURL": 2, "SASU": 3, "SARL": 2, "SAS": 3 } },
    ],
  },
  {
    id: 3,
    question: "Quelle protection sociale souhaitez-vous ?",
    options: [
      { label: "Protection minimale, cotisations réduites", scores: { "Auto-entrepreneur": 3, "EURL": 2, "SASU": 0, "SARL": 2, "SAS": 0 } },
      { label: "Protection équivalente au régime salarié", scores: { "Auto-entrepreneur": 0, "EURL": 0, "SASU": 3, "SARL": 0, "SAS": 3 } },
      { label: "Peu importe, je m'adapterai", scores: { "Auto-entrepreneur": 1, "EURL": 1, "SASU": 1, "SARL": 1, "SAS": 1 } },
    ],
  },
  {
    id: 4,
    question: "Comment souhaitez-vous vous rémunérer ?",
    options: [
      { label: "Prélèvements simples sur le bénéfice", scores: { "Auto-entrepreneur": 3, "EURL": 2, "SASU": 0, "SARL": 2, "SAS": 0 } },
      { label: "Salaires + dividendes", scores: { "Auto-entrepreneur": 0, "EURL": 1, "SASU": 3, "SARL": 1, "SAS": 3 } },
      { label: "Principalement des dividendes", scores: { "Auto-entrepreneur": 0, "EURL": 2, "SASU": 2, "SARL": 2, "SAS": 2 } },
    ],
  },
  {
    id: 5,
    question: "Quel niveau de formalités administratives acceptez-vous ?",
    options: [
      { label: "Le minimum possible", scores: { "Auto-entrepreneur": 3, "EURL": 1, "SASU": 0, "SARL": 0, "SAS": 0 } },
      { label: "Comptabilité simplifiée", scores: { "Auto-entrepreneur": 1, "EURL": 2, "SASU": 1, "SARL": 1, "SAS": 1 } },
      { label: "Comptabilité complète, pas de problème", scores: { "Auto-entrepreneur": 0, "EURL": 2, "SASU": 2, "SARL": 2, "SAS": 2 } },
    ],
  },
  {
    id: 6,
    question: "Prévoyez-vous de lever des fonds ou d'accueillir des investisseurs ?",
    options: [
      { label: "Non, pas du tout", scores: { "Auto-entrepreneur": 3, "EURL": 2, "SASU": 1, "SARL": 2, "SAS": 0 } },
      { label: "Peut-être à moyen terme", scores: { "Auto-entrepreneur": 0, "EURL": 1, "SASU": 2, "SARL": 1, "SAS": 2 } },
      { label: "Oui, c'est prévu", scores: { "Auto-entrepreneur": 0, "EURL": 0, "SASU": 3, "SARL": 0, "SAS": 3 } },
    ],
  },
  {
    id: 7,
    question: "Quel est votre secteur d'activité ?",
    options: [
      { label: "Services / Conseil / Freelance", scores: { "Auto-entrepreneur": 3, "EURL": 2, "SASU": 2, "SARL": 1, "SAS": 1 } },
      { label: "Commerce / E-commerce", scores: { "Auto-entrepreneur": 2, "EURL": 2, "SASU": 2, "SARL": 2, "SAS": 2 } },
      { label: "Tech / Startup innovante", scores: { "Auto-entrepreneur": 0, "EURL": 0, "SASU": 3, "SARL": 0, "SAS": 3 } },
      { label: "Artisanat / Production", scores: { "Auto-entrepreneur": 2, "EURL": 2, "SASU": 1, "SARL": 2, "SAS": 1 } },
    ],
  },
];

const statutDetails: Record<string, { description: string; pros: string[]; cons: string[] }> = {
  "Auto-entrepreneur": {
    description: "Idéal pour démarrer une activité avec peu de formalités et des charges proportionnelles au CA.",
    pros: ["Création simple et rapide", "Charges proportionnelles au CA", "Comptabilité ultra-simplifiée"],
    cons: ["Plafonds de CA", "Pas de déduction des charges", "Protection sociale limitée"],
  },
  "EURL": {
    description: "Société unipersonnelle offrant une protection du patrimoine et une fiscalité flexible.",
    pros: ["Patrimoine protégé", "Choix IR ou IS", "Crédibilité renforcée"],
    cons: ["Formalités de création", "Comptabilité obligatoire", "Charges sociales élevées"],
  },
  "SASU": {
    description: "Société flexible avec protection sociale du dirigeant assimilé salarié.",
    pros: ["Protection sociale optimale", "Grande flexibilité statutaire", "Idéale pour lever des fonds"],
    cons: ["Charges sociales élevées", "Formalités administratives", "Coût de création"],
  },
  "SARL": {
    description: "Forme classique pour les projets à plusieurs, avec un cadre juridique sécurisant.",
    pros: ["Cadre juridique sécurisé", "Adaptée aux projets familiaux", "Charges sociales modérées"],
    cons: ["Statuts rigides", "Cession de parts encadrée", "Moins attractive pour investisseurs"],
  },
  "SAS": {
    description: "Structure moderne et flexible, parfaite pour les startups et projets ambitieux.",
    pros: ["Flexibilité maximale", "Attractive pour investisseurs", "Pas de capital minimum"],
    cons: ["Charges sociales élevées", "Rédaction des statuts complexe", "Coût de fonctionnement"],
  },
};

export default function QuizStatut() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {
      "Auto-entrepreneur": 0,
      "EURL": 0,
      "SASU": 0,
      "SARL": 0,
      "SAS": 0,
    };

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== undefined) {
        const option = questions[questionIndex].options[answerIndex];
        Object.entries(option.scores).forEach(([statut, score]) => {
          scores[statut] += score;
        });
      }
    });

    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([statut, score]) => ({ statut, score }));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const results = showResults ? calculateResults() : [];
  const topResult = results[0];
  const maxScore = topResult?.score || 1;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-elegant max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-bold text-primary mb-4">
              Quel statut juridique choisir ?
            </h1>
            <p className="text-muted-foreground text-lg">
              Répondez à quelques questions pour découvrir le statut le plus adapté à votre projet
            </p>
          </div>

          {!showResults ? (
            <Card className="border-none shadow-elegant">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} sur {questions.length}
                  </span>
                  <span className="text-sm font-medium text-accent">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardHeader>
              <CardContent className="pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardTitle className="text-xl mb-8 text-center">
                      {questions[currentQuestion].question}
                    </CardTitle>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={answers[currentQuestion] === index ? "default" : "outline"}
                          className="w-full justify-start text-left h-auto py-4 px-6"
                          onClick={() => handleAnswer(index)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Précédent
                  </Button>
                  {answers[currentQuestion] !== undefined && currentQuestion < questions.length - 1 && (
                    <Button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    >
                      Suivant
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-none shadow-elegant mb-8">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Votre statut recommandé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-8">
                    <h3 className="font-serif text-3xl font-bold text-primary mb-2">
                      {topResult?.statut}
                    </h3>
                    <p className="text-muted-foreground">
                      {statutDetails[topResult?.statut]?.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Avantages</h4>
                      <ul className="space-y-1">
                        {statutDetails[topResult?.statut]?.pros.map((pro, i) => (
                          <li key={i} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                            <span>✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Points d'attention</h4>
                      <ul className="space-y-1">
                        {statutDetails[topResult?.statut]?.cons.map((con, i) => (
                          <li key={i} className="text-sm text-orange-700 dark:text-orange-300 flex items-start gap-2">
                            <span>!</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-4">Comparaison avec les autres statuts</h4>
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div key={result.statut} className="flex items-center gap-4">
                        <span className="w-32 text-sm font-medium">{result.statut}</span>
                        <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(result.score / maxScore) * 100}%` }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`h-full ${index === 0 ? 'bg-accent' : 'bg-primary/40'}`}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {Math.round((result.score / maxScore) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" onClick={resetQuiz}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Refaire le quiz
                </Button>
                <Button asChild>
                  <Link to="/dashboard/legal-status">
                    Comparer les statuts en détail
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
