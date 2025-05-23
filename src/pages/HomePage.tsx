import React, { useState, useEffect } from 'react';
import SearchBar from '../components/search/SearchBar';
import FilterBar from '../components/search/FilterBar';
import EventGrid from '../components/events/EventGrid';
import { searchEvents } from '../services/api';
import { EventType, Event } from '../types/Event';
import { getTodayDateRange, getThisWeekDateRange, isEventFree } from '../utils/dateUtils';

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams, setSearchParams] = useState<{
    city: string;
    eventType: EventType;
  } | null>(null);

  useEffect(() => {
    const loadInitialEvents = async () => {
      setLoading(true);
      try {
        const response = await searchEvents('New York', 'All');
        if (response._embedded && response._embedded.events) {
          setEvents(response._embedded.events);
          setFilteredEvents(response._embedded.events);
        }
      } catch (err) {
        console.error('Error fetching initial events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialEvents();
  }, []);

  const handleSearch = async (city: string, eventType: EventType) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    setError(null);
    setLoading(true);
    setSearchParams({ city, eventType });
    setActiveFilter('all');
    
    try {
      const response = await searchEvents(city, eventType);
      if (response._embedded && response._embedded.events) {
        setEvents(response._embedded.events);
        setFilteredEvents(response._embedded.events);
      } else {
        setEvents([]);
        setFilteredEvents([]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events. Please try again later.');
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filter: string) => {
    setActiveFilter(filter);
    
    if (!searchParams && !events.length) return;
    
    const city = searchParams?.city || 'New York';
    const eventType = searchParams?.eventType || 'All';
    
    if (filter === 'all') {
      setFilteredEvents(events);
      return;
    }
    
    setLoading(true);
    
    try {
      if (filter === 'today') {
        const { start, end } = getTodayDateRange();
        const response = await searchEvents(city, eventType, start, end);
        if (response._embedded && response._embedded.events) {
          setFilteredEvents(response._embedded.events);
        } else {
          setFilteredEvents([]);
        }
      } else if (filter === 'this-week') {
        const { start, end } = getThisWeekDateRange();
        const response = await searchEvents(city, eventType, start, end);
        if (response._embedded && response._embedded.events) {
          setFilteredEvents(response._embedded.events);
        } else {
          setFilteredEvents([]);
        }
      } else if (filter === 'free') {
        const freeEvents = events.filter(event => isEventFree(event.priceRanges));
        setFilteredEvents(freeEvents);
      }
    } catch (err) {
      console.error('Error applying filter:', err);
      setError('Failed to apply filter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <SearchBar onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {(events.length > 0 || loading) && (
        <>
          <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
          <EventGrid events={filteredEvents} loading={loading} />
        </>
      )}
      
      {!loading && events.length === 0 && !error && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Search for events</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enter a city name and select an event type to discover events
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;