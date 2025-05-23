import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { Heart } from 'lucide-react';
import { Event } from '../../types/Event';
import { useFavorites } from '../../context/FavoritesContext';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = isFavorite(event.id);


  const getEventImage = (): string => {
    if (!event.images || event.images.length === 0) {
      return 'https://via.placeholder.com/300x169?text=No+Image+Available';
    }
    
    
    const ratioImage = event.images.find(img => img.ratio === '16_9' && img.width > 500);
    
   
    const largeImage = event.images.find(img => img.width > 500);
    
   
    return ratioImage?.url || largeImage?.url || event.images[0].url;
  };

  const venueName = event._embedded?.venues?.[0]?.name || 'Venue TBA';
  const eventDate = event.dates?.start?.localDate;
  const eventTime = event.dates?.start?.localTime;

  

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  return (
    <div className="card group fade-in hover:transform hover:scale-[1.02] transition-all duration-300">
      <div className="relative pb-[56.25%] overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          src={getEventImage()} 
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2 line-clamp-2">{event.name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          {eventDate ? formatDate(eventDate) : 'Date TBA'} • {eventTime ? formatTime(eventTime) : 'Time TBA'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{venueName}</p>
        
        <div className="flex items-center justify-between mt-2">
          <Link 
            to={`/event/${event.id}`} 
            className="btn btn-secondary text-sm"
            aria-label={`View details for ${event.name}`}
          >
            View Details
          </Link>
          
          <div className="flex space-x-2">
            <button 
              onClick={toggleFavorite}
              className={`p-2 rounded-full ${isFav ? 'text-red-500 bg-red-100 dark:bg-red-900/30' : 'text-gray-500 bg-gray-100 dark:bg-gray-700'} hover:scale-105 transition-all duration-300`}
              aria-label={isFav ? `Remove ${event.name} from favorites` : `Add ${event.name} to favorites`}
            >
              <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
            </button>
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;