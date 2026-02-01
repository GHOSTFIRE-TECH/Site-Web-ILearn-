// Performance optimization utilities

// Cache pour les vidéos téléchargées
export const videoCache = new Map();

// Service Worker pour le caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
    });
  }
};

// Fonction de throttle pour optimiser les événements fréquents
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Fonction de debounce pour optimiser la recherche
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${(end - start).toFixed(2)}ms`);
  return result;
};

// Log Core Web Vitals
export const logWebVitals = (metric) => {
  console.log(`${metric.name}: ${metric.value}ms`);
};

// Compression d'images
export const compressImage = (imageUrl, quality = 0.8) => {
  return `${imageUrl}?quality=${quality}`;
};

// Préchargement des ressources
export const preloadResource = (url, type = 'script') => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = url;
  document.head.appendChild(link);
};

// Session storage pour les données temporaires
export const setSessionData = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionData = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const clearSessionData = (key) => {
  sessionStorage.removeItem(key);
};
