import jsPDF from 'jspdf';

interface ProjectData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  projectIdea: {
    name: string;
    description: string;
    sector: string;
    innovation: string;
  };
  targetMarket: {
    targetClients: string;
    competition: string;
    positioning: string;
  };
  resources: {
    team: string;
    initialBudget: string;
    materialNeeds: string;
  };
}

export function exportProjectToPdf(data: ProjectData) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Helper function to add wrapped text
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * 7;
  };

  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175); // Primary blue
  doc.text('DOS - Dossier de Projet', pageWidth / 2, yPos, { align: 'center' });
  yPos += 15;

  // Project name subtitle
  doc.setFontSize(18);
  doc.setTextColor(60, 60, 60);
  doc.text(data.projectIdea.name || 'Mon Projet', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Date
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(120, 120, 120);
  doc.text(`Généré le ${new Date().toLocaleDateString('fr-FR')}`, pageWidth / 2, yPos, { align: 'center' });
  yPos += 20;

  // Divider
  doc.setDrawColor(200, 180, 120); // Gold accent
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 15;

  // Section 1: Personal Info
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('1. Informations Personnelles', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Nom : ${data.personalInfo.firstName} ${data.personalInfo.lastName}`, margin, yPos);
  yPos += 7;
  doc.text(`Email : ${data.personalInfo.email}`, margin, yPos);
  yPos += 7;
  doc.text(`Téléphone : ${data.personalInfo.phone}`, margin, yPos);
  yPos += 15;

  // Section 2: Project Idea
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('2. Idée de Projet', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Secteur d'activité : ${data.projectIdea.sector}`, margin, yPos);
  yPos += 10;

  doc.setFont('helvetica', 'bold');
  doc.text('Description :', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(data.projectIdea.description || 'Non renseigné', margin, yPos, pageWidth - 2 * margin);
  yPos += 5;

  if (data.projectIdea.innovation) {
    doc.setFont('helvetica', 'bold');
    doc.text('Éléments innovants :', margin, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    yPos = addWrappedText(data.projectIdea.innovation, margin, yPos, pageWidth - 2 * margin);
  }
  yPos += 10;

  // Check if we need a new page
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Section 3: Target Market
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('3. Marché Cible', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Clients cibles :', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(data.targetMarket.targetClients || 'Non renseigné', margin, yPos, pageWidth - 2 * margin);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Analyse de la concurrence :', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(data.targetMarket.competition || 'Non renseigné', margin, yPos, pageWidth - 2 * margin);
  yPos += 5;

  doc.setFont('helvetica', 'bold');
  doc.text('Positionnement :', margin, yPos);
  yPos += 7;
  doc.setFont('helvetica', 'normal');
  yPos = addWrappedText(data.targetMarket.positioning || 'Non renseigné', margin, yPos, pageWidth - 2 * margin);
  yPos += 10;

  // Check if we need a new page
  if (yPos > 240) {
    doc.addPage();
    yPos = 20;
  }

  // Section 4: Resources
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 64, 175);
  doc.text('4. Ressources Nécessaires', margin, yPos);
  yPos += 10;

  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);

  if (data.resources.team) {
    doc.setFont('helvetica', 'bold');
    doc.text('Équipe :', margin, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    yPos = addWrappedText(data.resources.team, margin, yPos, pageWidth - 2 * margin);
    yPos += 5;
  }

  if (data.resources.initialBudget) {
    doc.text(`Budget initial estimé : ${data.resources.initialBudget}`, margin, yPos);
    yPos += 7;
  }

  if (data.resources.materialNeeds) {
    doc.setFont('helvetica', 'bold');
    doc.text('Besoins matériels :', margin, yPos);
    yPos += 7;
    doc.setFont('helvetica', 'normal');
    yPos = addWrappedText(data.resources.materialNeeds, margin, yPos, pageWidth - 2 * margin);
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `DOS - Accompagnement Entrepreneurial | Page ${i}/${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const fileName = `DOS_Projet_${data.projectIdea.name?.replace(/\s+/g, '_') || 'MonProjet'}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
}
