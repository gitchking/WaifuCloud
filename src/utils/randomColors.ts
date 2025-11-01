// Utility functions for generating random colors

// Generate a random hex color
export const getRandomHexColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate a random color from a predefined palette
export const getRandomPaletteColor = (): string => {
  const colors = [
    'text-red-500', 'text-orange-500', 'text-amber-500', 'text-yellow-500', 
    'text-lime-500', 'text-green-500', 'text-emerald-500', 'text-teal-500',
    'text-cyan-500', 'text-sky-500', 'text-blue-500', 'text-indigo-500',
    'text-violet-500', 'text-purple-500', 'text-fuchsia-500', 'text-pink-500',
    'text-rose-500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate a random dark color from a predefined palette for dark mode
export const getRandomDarkColor = (): string => {
  const colors = [
    'dark:text-red-400', 'dark:text-orange-400', 'dark:text-amber-400', 'dark:text-yellow-400', 
    'dark:text-lime-400', 'dark:text-green-400', 'dark:text-emerald-400', 'dark:text-teal-400',
    'dark:text-cyan-400', 'dark:text-sky-400', 'dark:text-blue-400', 'dark:text-indigo-400',
    'dark:text-violet-400', 'dark:text-purple-400', 'dark:text-fuchsia-400', 'dark:text-pink-400',
    'dark:text-rose-400'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Generate a random gradient for backgrounds
export const getRandomGradient = (): string => {
  const gradients = [
    'from-red-500 to-orange-500',
    'from-amber-500 to-yellow-500',
    'from-lime-500 to-green-500',
    'from-emerald-500 to-teal-500',
    'from-cyan-500 to-sky-500',
    'from-blue-500 to-indigo-500',
    'from-violet-500 to-purple-500',
    'from-fuchsia-500 to-pink-500',
    'from-rose-500 to-red-500',
    'from-orange-500 to-amber-500',
    'from-yellow-500 to-lime-500',
    'from-green-500 to-emerald-500'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};

// Generate a complete color object with gradient, text, dark text, and border colors
export const getRandomColor = () => {
  const gradients = [
    { gradient: 'from-red-500 to-orange-500', text: 'text-red-600', darkText: 'dark:text-red-400', border: 'border-red-500' },
    { gradient: 'from-amber-500 to-yellow-500', text: 'text-amber-600', darkText: 'dark:text-amber-400', border: 'border-amber-500' },
    { gradient: 'from-lime-500 to-green-500', text: 'text-lime-600', darkText: 'dark:text-lime-400', border: 'border-lime-500' },
    { gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-600', darkText: 'dark:text-emerald-400', border: 'border-emerald-500' },
    { gradient: 'from-cyan-500 to-sky-500', text: 'text-cyan-600', darkText: 'dark:text-cyan-400', border: 'border-cyan-500' },
    { gradient: 'from-blue-500 to-indigo-500', text: 'text-blue-600', darkText: 'dark:text-blue-400', border: 'border-blue-500' },
    { gradient: 'from-violet-500 to-purple-500', text: 'text-violet-600', darkText: 'dark:text-violet-400', border: 'border-violet-500' },
    { gradient: 'from-fuchsia-500 to-pink-500', text: 'text-fuchsia-600', darkText: 'dark:text-fuchsia-400', border: 'border-fuchsia-500' },
    { gradient: 'from-rose-500 to-red-500', text: 'text-rose-600', darkText: 'dark:text-rose-400', border: 'border-rose-500' },
    { gradient: 'from-orange-500 to-amber-500', text: 'text-orange-600', darkText: 'dark:text-orange-400', border: 'border-orange-500' },
    { gradient: 'from-yellow-500 to-lime-500', text: 'text-yellow-600', darkText: 'dark:text-yellow-400', border: 'border-yellow-500' },
    { gradient: 'from-green-500 to-emerald-500', text: 'text-green-600', darkText: 'dark:text-green-400', border: 'border-green-500' }
  ];
  
  return gradients[Math.floor(Math.random() * gradients.length)];
};