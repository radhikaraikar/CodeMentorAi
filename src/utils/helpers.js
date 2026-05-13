import { languages } from '../data/languages';

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Download text content as a file
 */
export const downloadTextFile = (content, filename = 'explanation.txt') => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate a unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Get language label from value
 */
export const getLanguageLabel = (value) => {
  const lang = languages.find((l) => l.value === value);
  return lang ? lang.label : value;
};

/**
 * Get language icon from value
 */
export const getLanguageIcon = (value) => {
  const lang = languages.find((l) => l.value === value);
  return lang ? lang.icon : '💻';
};

/**
 * Get type badge color
 */
export const getTypeBadgeColor = (type) => {
  const colors = {
    explain: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    debug: 'bg-red-500/20 text-red-300 border-red-500/30',
    optimize: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    viva: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  };
  return colors[type] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
};

/**
 * Get type label
 */
export const getTypeLabel = (type) => {
  const labels = {
    explain: 'Explanation',
    debug: 'Debug',
    optimize: 'Optimization',
    viva: 'Viva Questions',
  };
  return labels[type] || type;
};

/**
 * Safely parse JSON from localStorage
 */
export const safeParseJSON = (str, fallback = null) => {
  try {
    return JSON.parse(str) || fallback;
  } catch {
    return fallback;
  }
};
