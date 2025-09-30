import React from 'react';

interface LogoProps {
  className?: string;
}

export const ChicoBotLogo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/src/assets/images/chicobot-logo.png" 
        alt="ChicoBot Logo" 
        className="h-12 w-auto object-contain transition-opacity duration-200"
        onError={(e) => {
          // Fallback: esconde a imagem e mostra o fallback
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
          if (fallback) {
            fallback.style.display = 'flex';
          }
        }}
      />
      {/* Fallback logo - só aparece se a imagem não carregar */}
      <div className="logo-fallback hidden w-12 h-12 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="text-white font-bold text-xl transform hover:scale-110 transition-transform duration-200">
          🐷
        </div>
      </div>
    </div>
  );
};