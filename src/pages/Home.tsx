import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Scale, Wallet, Users, Star, CheckCircle } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { faqs, testimonials } from '@/data/mockData';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import stephanieImage from '@/assets/stephanie-djegou.jpeg';

const services = [
  {
    icon: FileText,
    title: 'Business Plan',
    description: 'Construisez un business plan professionnel avec nos outils interactifs et templates sectoriels.',
    href: '/dashboard/business-plan',
  },
  {
    icon: Scale,
    title: 'Statut Juridique',
    description: 'Trouvez le statut adapté à votre projet grâce à notre comparateur et simulateur de charges.',
    href: '/dashboard/legal-status',
  },
  {
    icon: Wallet,
    title: 'Financement',
    description: 'Découvrez les aides disponibles et optimisez votre recherche de financement.',
    href: '/dashboard/financing',
  },
  {
    icon: Users,
    title: 'Accompagnement',
    description: 'Bénéficiez d\'un suivi personnalisé avec Stéphanie Djegou, experte en création d\'entreprise.',
    href: '/#about',
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
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-hero">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                  <Star size={14} className="text-accent" />
                  Expert création d'entreprise Paris & Île-de-France
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
                Donnez vie à votre{' '}
                <span className="text-gradient-gold">projet entrepreneurial</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Accompagnement personnalisé de A à Z pour créer votre entreprise. 
                Business plan, statut juridique, financement : nous vous guidons à chaque étape.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/auth">
                    Démarrer mon projet
                    <ArrowRight size={20} />
                  </Link>
                </Button>
                <Button variant="elegant-outline" size="xl" asChild>
                  <Link to="/#services">
                    Découvrir nos services
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span className="text-sm text-muted-foreground">100% gratuit pour démarrer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-success" />
                  <span className="text-sm text-muted-foreground">+500 entrepreneurs accompagnés</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-elegant-lg">
                <img
                  src={stephanieImage}
                  alt="Stéphanie Djegou - Fondatrice DOS"
                  className="w-full h-[500px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                  <p className="font-serif text-2xl font-semibold">Stéphanie Djegou</p>
                  <p className="text-primary-foreground/80">Fondatrice & Experte en création d'entreprise</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-background">
        <div className="container-elegant">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="text-accent font-medium text-sm uppercase tracking-wider">
              Nos Services
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif mt-4">
              Tout ce dont vous avez besoin pour{' '}
              <span className="text-gradient-gold">réussir</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Des outils professionnels et un accompagnement expert pour transformer votre idée en entreprise florissante.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="card-elegant p-6 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <service.icon size={24} />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                >
                  En savoir plus
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-muted/50">
        <div className="container-elegant">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <img
                  src={stephanieImage}
                  alt="Stéphanie Djegou"
                  className="rounded-2xl shadow-elegant-lg w-full max-w-md object-cover aspect-[4/5]"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent text-accent-foreground p-6 rounded-xl shadow-lg">
                  <p className="font-serif text-3xl font-bold">10+</p>
                  <p className="text-sm">Années d'expérience</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-accent font-medium text-sm uppercase tracking-wider">
                Votre Experte
              </span>
              <h2 className="text-3xl md:text-4xl font-serif">
                Stéphanie Djegou
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Passionnée par l'entrepreneuriat et forte de plus de 10 ans d'expérience dans l'accompagnement 
                des créateurs d'entreprise, j'ai fondé DOS pour offrir un service d'excellence aux 
                entrepreneurs parisiens et franciliens.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Mon approche combine expertise technique, écoute attentive et pragmatisme pour vous aider 
                à concrétiser votre projet dans les meilleures conditions.
              </p>
              <ul className="space-y-3">
                {[
                  'Accompagnement personnalisé de A à Z',
                  'Expertise juridique et financière',
                  'Réseau d\'experts partenaires',
                  'Connaissance approfondie de l\'écosystème parisien',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-success shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" size="lg" asChild>
                <Link to="/dashboard/project">
                  Prendre rendez-vous
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-elegant">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="text-accent font-medium text-sm uppercase tracking-wider">
              Témoignages
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif mt-4">
              Ils nous font confiance
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeUp}
                className="bg-primary-foreground/5 backdrop-blur rounded-xl p-6 border border-primary-foreground/10"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-primary-foreground/90 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-foreground/60">
                    {testimonial.company} • {testimonial.sector}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding bg-background">
        <div className="container-elegant max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="text-accent font-medium text-sm uppercase tracking-wider">
              FAQ
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-serif mt-4">
              Questions fréquentes
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="card-elegant px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-secondary to-muted">
        <div className="container-elegant text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-serif">
              Prêt à lancer votre entreprise ?
            </h2>
            <p className="text-muted-foreground text-lg">
              Rejoignez les centaines d'entrepreneurs qui ont concrétisé leur projet avec DOS.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard/project">
                Commencer gratuitement
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
