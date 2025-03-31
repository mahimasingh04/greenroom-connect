
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin } from "lucide-react";

interface UserEventsListProps {
  userAddress: string;
}

const UserEventsList: React.FC<UserEventsListProps> = ({ userAddress }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // This is a placeholder for fetching user's upcoming events
    // In a real implementation, you would call an API with the userAddress
    const fetchUserEvents = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, this would come from your backend/contract
        setEvents([
          {
            id: '1',
            name: 'ETH New York',
            date: '2023-11-15',
            location: 'New York, NY',
            status: 'registered'
          },
          {
            id: '2', 
            name: 'DeFi Summit',
            date: '2023-12-05',
            location: 'Miami, FL',
            status: 'waitlist'
          }
        ]);
      } catch (error) {
        console.error('Error fetching user events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    if (userAddress) {
      fetchUserEvents();
    }
  }, [userAddress]);

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-1" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No upcoming events found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4">
              <h3 className="font-medium">{event.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <Calendar size={14} className="mr-1" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-1" />
                {event.location}
              </div>
              <div className="mt-2">
                <Badge 
                  variant={event.status === 'registered' ? 'default' : 'outline'}
                  className="capitalize"
                >
                  {event.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserEventsList;
