import React from 'react';
import { Download } from 'lucide-react';
import { generatePDF } from '../utils/pdfUtils';

interface ImageData {
  url: string;
  pixels: number;
}

interface PDFGeneratorProps {
  leftImage: ImageData | null;
  rightImage: ImageData | null;
  centerImage: ImageData | null;
  difference: { message: string } | null;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  leftImage,
  rightImage,
  centerImage,
  difference,
}) => {
  const handleGeneratePDF = async () => {
    await generatePDF();
  };

  return (
    <button
      onClick={handleGeneratePDF}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto mt-6"
    >
      <Download size={20} />
      Télécharger le PDF
    </button>
  );
};