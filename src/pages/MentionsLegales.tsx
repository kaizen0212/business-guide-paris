import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-elegant">
          <h1 className="font-serif text-4xl font-bold text-primary mb-8">Mentions Légales</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">1. Éditeur du site</h2>
              <p className="text-muted-foreground">
                Le site DOS est édité par :<br />
                <strong>DOS - Accompagnement Création d'Entreprise</strong><br />
                Siège social : Paris, Île-de-France<br />
                Email : contact@dos-entreprendre.fr<br />
                Téléphone : 01 23 45 67 89
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">2. Directeur de la publication</h2>
              <p className="text-muted-foreground">
                Stéphanie Djegou, en qualité de fondatrice de DOS.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">3. Hébergement</h2>
              <p className="text-muted-foreground">
                Le site est hébergé par :<br />
                <strong>Lovable Technologies</strong><br />
                Service d'hébergement cloud sécurisé
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">4. Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble du contenu de ce site (textes, images, logos, graphismes, etc.) est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée de tout ou partie du contenu de ce site est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">5. Responsabilité</h2>
              <p className="text-muted-foreground">
                Les informations fournies sur ce site le sont à titre indicatif. DOS s'efforce de maintenir des informations exactes et à jour, mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations diffusées. L'utilisateur est seul responsable de l'utilisation qu'il fait des informations présentes sur ce site.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">6. Liens hypertextes</h2>
              <p className="text-muted-foreground">
                Ce site peut contenir des liens vers d'autres sites web. DOS n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-4">7. Droit applicable</h2>
              <p className="text-muted-foreground">
                Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
