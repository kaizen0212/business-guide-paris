import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function CGU() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-elegant">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">Conditions Générales d'Utilisation</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <p className="text-muted-foreground text-lg">
              Dernière mise à jour : Janvier 2024
            </p>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. Objet</h2>
              <p className="text-muted-foreground">
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités et conditions d'utilisation du site DOS ainsi que les droits et obligations des utilisateurs. L'accès et l'utilisation du site impliquent l'acceptation pleine et entière des présentes CGU.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. Accès au site</h2>
              <p className="text-muted-foreground">
                Le site DOS est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les coûts afférents à l'accès au site (matériel informatique, connexion Internet, etc.) sont à la charge de l'utilisateur.
              </p>
              <p className="text-muted-foreground mt-4">
                Certaines fonctionnalités du site nécessitent la création d'un compte utilisateur. L'utilisateur s'engage à fournir des informations exactes et à les maintenir à jour.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. Services proposés</h2>
              <p className="text-muted-foreground">
                DOS propose les services suivants :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Outils d'aide à la création de business plan</li>
                <li>Comparateur et simulateur de statuts juridiques</li>
                <li>Calculateur de charges sociales</li>
                <li>Guide des démarches administratives</li>
                <li>Base de données des aides et financements</li>
                <li>Ressources et guides pour entrepreneurs</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Compte utilisateur</h2>
              <p className="text-muted-foreground">
                Pour accéder à certains services, l'utilisateur doit créer un compte en fournissant une adresse email valide et un mot de passe. L'utilisateur est responsable de la confidentialité de ses identifiants et de toutes les activités effectuées depuis son compte.
              </p>
              <p className="text-muted-foreground mt-4">
                En cas d'utilisation non autorisée de votre compte, vous devez nous en informer immédiatement à contact@dos-entreprendre.fr.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Obligations de l'utilisateur</h2>
              <p className="text-muted-foreground">
                L'utilisateur s'engage à :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Utiliser le site conformément à sa destination et aux présentes CGU</li>
                <li>Ne pas porter atteinte à la sécurité du site</li>
                <li>Ne pas tenter d'accéder à des zones non autorisées du site</li>
                <li>Ne pas utiliser le site à des fins illicites ou contraires aux bonnes mœurs</li>
                <li>Respecter les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                Tous les éléments du site (textes, images, logos, outils, base de données, etc.) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est strictement interdite et peut engager la responsabilité civile et/ou pénale de l'utilisateur.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Limitation de responsabilité</h2>
              <p className="text-muted-foreground">
                DOS s'efforce de fournir des informations exactes et à jour. Toutefois, les informations et outils mis à disposition sont fournis à titre indicatif et ne sauraient se substituer aux conseils d'un professionnel (expert-comptable, avocat, etc.).
              </p>
              <p className="text-muted-foreground mt-4">
                DOS ne saurait être tenu responsable :
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
                <li>Des décisions prises par l'utilisateur sur la base des informations du site</li>
                <li>Des interruptions temporaires du site pour maintenance</li>
                <li>Des dommages résultant de l'utilisation du site</li>
                <li>Du contenu des sites tiers accessibles via des liens hypertextes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">8. Données personnelles</h2>
              <p className="text-muted-foreground">
                Le traitement des données personnelles est décrit dans notre <a href="/politique-confidentialite" className="text-accent hover:underline">Politique de Confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">9. Modification des CGU</h2>
              <p className="text-muted-foreground">
                DOS se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. L'utilisateur est invité à consulter régulièrement cette page.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">10. Droit applicable et juridiction</h2>
              <p className="text-muted-foreground">
                Les présentes CGU sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux de Paris seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">11. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question relative aux présentes CGU, vous pouvez nous contacter à :<br />
                <strong>Email :</strong> contact@dos-entreprendre.fr<br />
                <strong>Téléphone :</strong> 01 23 45 67 89
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
