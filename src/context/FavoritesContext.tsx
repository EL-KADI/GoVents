import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event } from '../types/Event';

type FavoritesContextType = {
  favorites: Event[];
  addFavorite: (event: Event) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Event[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (event: Event) => {
    if (!favorites.some(fav => fav.id === event.id)) {
      setFavorites([...favorites, event]);
    }
  };

  const removeFavorite = (eventId: string) => {
    setFavorites(favorites.filter(event => event.id !== eventId));
  };

  const isFavorite = (eventId: string) => {
    return favorites.some(event => event.id === eventId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};