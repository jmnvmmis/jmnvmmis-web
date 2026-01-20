// Hook personalizado para manejar el tema de fondo
import { useState, useEffect } from 'react';

export const useThemeBackground = () => {
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    const updateBgColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setBgColor(isDark ? '#111827' : '#FFFBEB');
    };
    
    updateBgColor();
    
    const observer = new MutationObserver(updateBgColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  return bgColor;
};
