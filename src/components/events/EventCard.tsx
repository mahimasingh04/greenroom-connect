
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  attendees: number;
  category: string;
  tags: string[];
};

type EventCardProps = {
  event: Event;
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all event-card">
        <div className="h-48 overflow-hidden relative">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className="bg-greenroom-500 hover:bg-greenroom-600">{event.category}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2 line-clamp-1">{event.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Users size={16} className="mr-1" />
            <span>{event.attendees} attendees</span>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
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
