import React from 'react';
import { X } from 'lucide-react';
import PreviewRenderer from '../preview/PreviewRenderer';

interface FullscreenPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullscreenPreviewModal({ isOpen, onClose }: FullscreenPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
      >
        <X size={24} />
      </button>
      
      <div className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto custom-scrollbar flex justify-center items-center">
        <div className="w-full max-w-[400px]">
          <PreviewRenderer />
        </div>
      </div>
    </div>
  );
}
