import { createContext, useContext, useState, useCallback } from 'react';
import { STORAGE_KEYS } from '../utils/constants';
import { generateId } from '../utils/helpers';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [history, setHistory] = useLocalStorage(STORAGE_KEYS.HISTORY, []);
  const [favorites, setFavorites] = useLocalStorage(STORAGE_KEYS.FAVORITES, []);

  const addToHistory = useCallback((item) => {
    const newItem = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...item,
    };
    setHistory((prev) => [newItem, ...prev].slice(0, 50)); // Keep last 50
    return newItem;
  }, [setHistory]);

  const deleteHistory = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const addToFavorites = useCallback((item) => {
    const newItem = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...item,
    };
    setFavorites((prev) => {
      const exists = prev.some((f) => f.code === item.code && f.type === item.type);
      if (exists) return prev;
      return [newItem, ...prev];
    });
    return newItem;
  }, [setFavorites]);

  const removeFromFavorites = useCallback((id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, [setFavorites]);

  const isFavorite = useCallback((id) => {
    return favorites.some((item) => item.id === id);
  }, [favorites]);

  const value = {
    code,
    setCode,
    language,
    setLanguage,
    result,
    setResult,
    loading,
    setLoading,
    error,
    setError,
    history,
    setHistory,
    favorites,
    setFavorites,
    addToHistory,
    deleteHistory,
    clearHistory,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
