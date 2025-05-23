import React, { useState, FormEvent } from 'react';
import { Search } from 'lucide-react';
import { EventType } from '../../types/Event';

interface SearchBarProps {
  onSearch: (city: string, eventType: EventType) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [eventType, setEventType] = useState<EventType>('All');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(city, eventType);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-all duration-300 fade-in">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Find Your Next Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Location
            </label>
            <input
              type="text"
              id="city"
              className="input"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="City name"
            />
          </div>
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Event Type
            </label>
            <select
              id="eventType"
              className="select"
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              aria-label="Event type"
            >
              <option value="All">All Events</option>
              <option value="Music">Music</option>
              <option value="Arts & Theatre">Arts & Theatre</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
        </div>
        <button 
          type="submit"
          className="btn btn-primary w-full md:w-auto flex items-center justify-center"
          aria-label="Search events"
        >
          <Search size={18} className="mr-2" />
          Search Events
        </button>
      </form>
    </div>
  );
};

export default SearchBar;