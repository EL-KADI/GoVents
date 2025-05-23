import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, Heart, ExternalLink } from 'lucide-react';
import { getEventById } from '../services/api';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Event } from '../types/Event';
import Spinner from '../components/common/Spinner';
import { useFavorites } from '../context/FavoritesContext';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleShare = () => {
    if (navigator.share && event) {
      navigator.share({
        title: event.name,
        text: `Check out this event: ${event.name}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    if (!event) return;
    
    if (isFavorite(event.id)) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="large" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <p className="font-medium">{error || 'Event not found'}</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline">
            &larr; Back to search
          </Link>
        </div>
      </div>
    );
  }

  const getEventImage = (): string => {
    if (!event.images || event.images.length === 0) {
      return 'https://via.placeholder.com/1200x600?text=No+Image+Available';
    }
    
    const wideImage = event.images.find(img => img.width > 1000 && img.width / img.height >= 1.5);
    
    const largeImage = [...event.images].sort((a, b) => b.width - a.width)[0];
    
    return wideImage?.url || largeImage?.url;
  };

  const venueName = event._embedded?.venues?.[0]?.name || 'Venue TBA';
  const venueCity = event._embedded?.venues?.[0]?.city?.name || '';
  const venueState = event._embedded?.venues?.[0]?.state?.name || '';
  const eventDate = event.dates?.start?.localDate;
  const eventTime = event.dates?.start?.localTime;
  const eventLocation = event._embedded?.venues?.[0]?.location;
  const ticketUrl = event.url;
  const isFav = isFavorite(event.id);

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to events
        </Link>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8 transition-all duration-300">
        <div className="relative h-64 md:h-80 overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img 
            src={getEventImage()} 
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{event.name}</h1>
            <div className="flex space-x-2">
              <button 
                onClick={toggleFavorite}
                className={`p-2 rounded-full ${isFav ? 'text-red-500 bg-red-100 dark:bg-red-900/30' : 'text-gray-500 bg-gray-100 dark:bg-gray-700'} hover:scale-105 transition-all duration-300`}
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
              </button>
           
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="flex items-start mb-4">
                <Calendar className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <h3 className="font-semibold">Date & Time</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {eventDate ? formatDate(eventDate) : 'Date TBA'}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {eventTime ? formatTime(eventTime) : 'Time TBA'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-gray-500 dark:text-gray-400" />
                <div>
                  <h3 className="font-semibold">Venue</h3>
                  <p className="text-gray-700 dark:text-gray-300">{venueName}</p>
                  {(venueCity || venueState) && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {venueCity}{venueState ? `, ${venueState}` : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
        
          </div>
          
          {(event.info || event.pleaseNote) && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">About this event</h3>
              {event.info && <p className="mb-2 text-gray-700 dark:text-gray-300">{event.info}</p>}
              {event.pleaseNote && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    <strong>Please note:</strong> {event.pleaseNote}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-center">
            <a 
              href={ticketUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-action flex items-center justify-center px-8"
            >
              Buy Tickets <ExternalLink size={18} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;