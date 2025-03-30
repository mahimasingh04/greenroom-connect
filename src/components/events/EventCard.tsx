
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Wallet } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { EventData } from '@/types/event';
import { formatDate } from '@/lib/utils';

type EventCardProps = {
  event: EventData;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Helper function to determine status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500 hover:bg-blue-600';
      case 'active': return 'bg-green-500 hover:bg-green-600';
      case 'past': return 'bg-gray-500 hover:bg-gray-600';
      case 'canceled': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-greenroom-500 hover:bg-greenroom-600';
    }
  };

  return (
    <Link to={`/events/${event.id}`}>
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all event-card h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
            <Badge className="bg-greenroom-500 hover:bg-greenroom-600">{event.category}</Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{new Date(event.date).toLocaleDateString()} {event.endDate && `- ${new Date(event.endDate).toLocaleDateString()}`}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Users size={16} className="mr-1" />
            <span>{event.attendees} / {event.capacity} attendees</span>
          </div>

          {event.ticketPrice && (
            <div className="flex items-center text-sm text-gray-500">
              <Wallet size={16} className="mr-1" />
              <span>{event.ticketPrice} {event.ticketCurrency}</span>
            </div>
          )}
          
          {event.registrationDeadline && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <Clock size={16} className="mr-1" />
              <span>Registration until {new Date(event.registrationDeadline).toLocaleDateString()}</span>
            </div>
          )}
          
          <div className="mt-auto pt-4 flex flex-wrap gap-2">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
