import React from 'react';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageLoad: (imageData: { url: string; pixels: number }) => void;
  align: 'left' | 'right' | 'center';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageLoad, align }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data.filter((_, i) => i % 4 === 3).filter(a => a > 0).length;
            onImageLoad({ url: e.target?.result as string, pixels });
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Upload size={20} />
        Charger une image
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};