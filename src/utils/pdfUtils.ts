import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (): Promise<void> => {
  const pdfContent = document.getElementById('pdf-content');
  if (!pdfContent) return;

  // Temporarily make the PDF content visible
  pdfContent.classList.remove('hidden');

  try {
    const canvas = await html2canvas(pdfContent, {
      scale: 2, // Higher quality
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Add title
    pdf.setFontSize(24);
    pdf.text('Mesure de la dissymétrie labiale', pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
    
    // Calculate dimensions to maintain aspect ratio
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Add the content image below the title
    pdf.addImage(imgData, 'PNG', 0, 30, pdfWidth, pdfHeight - 30);
    
    pdf.save('mesure.pdf');
  } finally {
    // Hide the PDF content again
    pdfContent.classList.add('hidden');
  }
};