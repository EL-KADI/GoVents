import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Calendar, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  
  return (
    <header className={`sticky top-0 z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between mb-4 md:mb-0">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-800 dark:text-blue-400 flex items-center"
          >
            <Calendar size={28} className="mr-2" /> GoVents
          </Link>
          <button 
            onClick={toggleTheme}
            className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <nav className="flex items-center space-x-6">
          <Link 
            to="/favorites" 
            className={`flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
              location.pathname === '/favorites' ? 'text-blue-600 dark:text-blue-400 font-medium' : ''
            }`}
          >
            <Heart size={20} className="mr-1" /> Favorites
          </Link>
          <button 
            onClick={toggleTheme}
            className="hidden md:flex items-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;