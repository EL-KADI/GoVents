import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import EventGrid from '../components/events/EventGrid';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto fade-in">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to search
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <Calendar size={24} className="mr-2 text-blue-600 dark:text-blue-400" />
          Your Favorite Events
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Events you've saved for later
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start exploring and save events you're interested in
          </p>
          <Link to="/" className="btn btn-primary inline-flex items-center">
            Discover Events
          </Link>
        </div>
      ) : (
        <EventGrid events={favorites} loading={false} />
      )}
    </div>
  );
};

export default FavoritesPage;