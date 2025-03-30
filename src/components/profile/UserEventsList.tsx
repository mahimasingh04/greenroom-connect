
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getUserTickets } from '@/services/registrationService';
import { getEventById } from '@/services/eventService';
import { useWallet } from '@/contexts/WalletContext';
import { EventData } from '@/types/event';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from "@/components/ui/button";

const UserEventsList: React.FC = () => {
  const { address } = useWallet();

  // Fetch user's tickets
  const { data: userTickets, isLoading: isLoadingTickets } = useQuery({
    queryKey: ['userTickets', address],
    queryFn: () => address ? getUserTickets(address) : Promise.resolve([]),
    enabled: !!address
  });

  // Fetch event details for each ticket
  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ['userEvents', userTickets],
    queryFn: async () => {
      if (!userTickets || userTickets.length === 0) return [];
      
      // Get unique event IDs
      const eventIds = [...new Set(userTickets.map(ticket => ticket.eventId))];
      
      // Fetch event details for each ID
      const eventPromises = eventIds.map(id => getEventById(id));
      const eventResults = await Promise.all(eventPromises);
      
      // Filter out any null results and convert to EventData array
      return eventResults.filter(Boolean) as EventData[];
    },
    enabled: !!userTickets && userTickets.length > 0
  });

  const isLoading = isLoadingTickets || isLoadingEvents;

  if (!address) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-xl">
        <p className="text-gray-600">Please connect your wallet to view your events.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 h-24 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-xl">
        <p className="text-gray-600">You haven't registered for any events yet.</p>
        <Button asChild className="mt-4 bg-greenroom-500 hover:bg-greenroom-600">
          <Link to="/events">Browse Events</Link>
        </Button>
      </div>
    );
  }

  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedEvents.map(event => (
        <Link 
          to={`/events/${event.id}`} 
          key={event.id} 
          className="block bg-white rounded-lg p-4 border border-gray-100 hover:border-greenroom-200 hover:shadow-sm transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 shrink-0 rounded overflow-hidden">
              <img 
                src={event.imageUrl} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-lg mb-1">{event.title}</h3>
              <div className="flex items-center text-sm text-gray-500 gap-4">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-400" />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserEventsList;
