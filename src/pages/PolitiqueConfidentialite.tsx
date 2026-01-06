import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-elegant">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">Politique de Confidentialité</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground text-lg">
              Dernière mise à jour : Janvier 2024
            </p>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. Collecte des données personnelles</h2>
              <p className="text-muted-foreground">
                Dans le cadre de l'utilisation de notre site et de nos services, nous sommes amenés à collecter les données personnelles suivantes :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Données d'identification : nom, prénom, adresse email, numéro de téléphone</li>
                <li>Données relatives à votre projet entrepreneurial</li>
                <li>Données de connexion : adresse IP, logs de connexion</li>
                <li>Données de navigation : pages visitées, durée de visite</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. Finalités du traitement</h2>
              <p className="text-muted-foreground">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Création et gestion de votre compte utilisateur</li>
                <li>Accompagnement personnalisé dans votre projet de création d'entreprise</li>
                <li>Envoi d'informations et de conseils relatifs à l'entrepreneuriat</li>
                <li>Amélioration de nos services et de l'expérience utilisateur</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. Base légale du traitement</h2>
              <p className="text-muted-foreground">
                Le traitement de vos données personnelles est fondé sur :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Votre consentement explicite</li>
                <li>L'exécution d'un contrat ou de mesures précontractuelles</li>
                <li>Notre intérêt légitime à développer et améliorer nos services</li>
                <li>Le respect de nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Destinataires des données</h2>
              <p className="text-muted-foreground">
                Vos données personnelles sont destinées à DOS et ne sont pas transmises à des tiers, sauf obligation légale ou avec votre consentement explicite. Nos sous-traitants techniques (hébergement, analytics) peuvent avoir accès à certaines données dans le cadre strict de leurs missions.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Durée de conservation</h2>
              <p className="text-muted-foreground">
                Vos données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Données de compte : durée de la relation commerciale + 3 ans</li>
                <li>Données de prospection : 3 ans à compter du dernier contact</li>
                <li>Données de navigation : 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Vos droits</h2>
              <p className="text-muted-foreground">
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Pour exercer ces droits, contactez-nous à : <strong>contact@dos-entreprendre.fr</strong>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Cookies</h2>
              <p className="text-muted-foreground">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment modifier vos préférences en matière de cookies via les paramètres de votre navigateur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">8. Sécurité</h2>
              <p className="text-muted-foreground">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">9. Contact et réclamation</h2>
              <p className="text-muted-foreground">
                Pour toute question relative à cette politique ou pour exercer vos droits, contactez notre Délégué à la Protection des Données à : <strong>contact@dos-entreprendre.fr</strong>
              </p>
              <p className="text-muted-foreground mt-4">
                Vous avez également le droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.cnil.fr</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
