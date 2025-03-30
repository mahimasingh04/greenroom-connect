
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import { getAllEvents, getEventsByStatus } from '@/services/eventService';
import { EventData } from '@/types/event';

type EventListProps = {
  status?: string;
  limit?: number;
  className?: string;
};

const EventList = ({ status, limit, className }: EventListProps) => {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['events', status],
    queryFn: status ? () => getEventsByStatus(status) : getAllEvents
  });

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {[...Array(limit || 3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm h-96 animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading events: {error instanceof Error ? error.message : 'Unknown error'}</div>;
  }

  if (!events || events.length === 0) {
    return <div className="text-gray-500">No events found</div>;
  }

  // Apply limit if specified
  const displayedEvents = limit ? events.slice(0, limit) : events;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className || ''}`}>
      {displayedEvents.map((event: EventData) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
