import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { PDFGenerator } from './components/PDFGenerator';
import { PDFLayout } from './components/PDFLayout';

interface ImageData {
  url: string;
  pixels: number;
}

function App() {
  const [leftImage, setLeftImage] = useState<ImageData | null>(null);
  const [rightImage, setRightImage] = useState<ImageData | null>(null);
  const [centerImage, setCenterImage] = useState<ImageData | null>(null);

  const calculateDifference = () => {
    if (!leftImage?.pixels || !rightImage?.pixels) return null;
    const diff = ((Math.abs(leftImage.pixels - rightImage.pixels) / Math.min(leftImage.pixels, rightImage.pixels)) * 100);
    const isLeftBigger = leftImage.pixels > rightImage.pixels;
    return {
      percentage: Math.round(diff),
      message: `La petite lèvre de gauche est ${isLeftBigger ? 'plus grande' : 'plus petite'} que celle de droite de ${Math.round(diff)}%`
    };
  };

  const difference = calculateDifference();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Mesure de la dissymétrie labiale
        </h1>

        <div className="flex flex-col items-center mb-8">
          <div className="flex justify-center gap-8 mb-4">
            <ImageUploader onImageLoad={setLeftImage} align="right" />
            <ImageUploader onImageLoad={setRightImage} align="left" />
          </div>
          
          <div className="flex justify-center items-start">
            <div className="flex gap-0">
              {leftImage && (
                <div className="flex flex-col items-center">
                  <img 
                    src={leftImage.url} 
                    alt="Image gauche" 
                    className="h-[300px] w-auto"
                  />
                  <div className="w-full text-center mt-4">
                    <p>{leftImage.pixels} pixels</p>
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
                    <p>{rightImage.pixels} pixels</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <ImageUploader onImageLoad={setCenterImage} align="center" />
          {centerImage && (
            <>
              <img 
                src={centerImage.url} 
                alt="Image centrale" 
                className="max-w-[400px] h-auto"
              />
              {difference && (
                <p className="text-lg font-semibold">{difference.message}</p>
              )}
            </>
          )}
        </div>

        <PDFGenerator 
          leftImage={leftImage}
          rightImage={rightImage}
          centerImage={centerImage}
          difference={difference}
        />

        <PDFLayout
          leftImage={leftImage}
          rightImage={rightImage}
          centerImage={centerImage}
          difference={difference}
        />
      </div>
    </div>
  );
}

export default App;