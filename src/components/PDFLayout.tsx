import React from 'react';

interface ImageData {
  url: string;
  pixels: number;
}

interface PDFLayoutProps {
  leftImage: ImageData | null;
  rightImage: ImageData | null;
  centerImage: ImageData | null;
  difference: { message: string } | null;
}

export const PDFLayout: React.FC<PDFLayoutProps> = ({
  leftImage,
  rightImage,
  centerImage,
  difference
}) => {
  return (
    <div className="bg-white text-black p-8 hidden" id="pdf-content">
      <div className="flex justify-center mb-8">
        <div className="flex items-start gap-0">
          {leftImage && (
            <div className="flex flex-col items-center">
              <img 
                src={leftImage.url} 
                alt="Image gauche" 
                className="h-[300px] w-auto"
              />
              <div className="w-full text-center mt-4">
                <p className="text-lg">{leftImage.pixels} pixels</p>
              </div>
            </div>
          )}
          {rightImage && (
            <div className="flex flex-col items-center">
              <img 
                src={rightImage.url} 
                alt="Image droite" 
                className="h-[300px] w-auto"
              />
              <div className="w-full text-center mt-4">
                <p className="text-lg">{rightImage.pixels} pixels</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {centerImage && (
        <div className="flex flex-col items-center mt-8">
          <img 
            src={centerImage.url} 
            alt="Image centrale" 
            className="max-w-[400px] h-auto mb-4"
          />
          {difference && (
            <p className="text-lg font-semibold text-center">{difference.message}</p>
          )}
        </div>
      )}
    </div>
  );
};