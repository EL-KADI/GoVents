import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types/Event';

interface EventGridProps {
  events: Event[];
  loading: boolean;
}

const EventGrid: React.FC<EventGridProps> = ({ events, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative inline-flex">
          <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin"></div>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No events found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try changing your search criteria or exploring a different city
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventGrid;