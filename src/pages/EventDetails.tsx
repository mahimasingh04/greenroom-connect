
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  User, 
  Ticket, 
  ArrowLeft,
  Wallet,
  Building,
  Check,
  X,
  AlertCircle
} from 'lucide-react';
import { getEventById } from '@/services/eventService';
import { useWallet } from '@/contexts/WalletContext';
import { formatDate, shortenAddress } from '@/lib/utils';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { address, userType } = useWallet();
  
  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id || '')
  });

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

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500 hover:bg-green-600';
      case 'closed': return 'bg-red-500 hover:bg-red-600';
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Check if user is organizer
  const isOrganizer = event && address && event.organizer.address.toLowerCase() === address.toLowerCase();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !event) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle size={24} className="text-red-500 mr-2" />
              <p className="text-red-700">Error loading event details. {error instanceof Error ? error.message : 'Event not found'}</p>
            </div>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/events">
              <ArrowLeft size={16} className="mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative h-80">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex gap-2 mb-4">
                <Badge className={getStatusColor(event.status)} className="capitalize">
                  {event.status}
                </Badge>
                <Badge className="bg-greenroom-500 hover:bg-greenroom-600">{event.category}</Badge>
                {event.applicationRequired && (
                  <Badge className={getApplicationStatusColor(event.applicationStatus)} className="capitalize">
                    {event.applicationStatus === 'open' ? 'Applications Open' : 'Applications Closed'}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
              <p className="text-white/80 mb-2">
                <span className="flex items-center">
                  <Building size={16} className="mr-1" />
                  {event.organizer.name || shortenAddress(event.organizer.address)}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-start mb-8">
          <Button variant="ghost" asChild>
            <Link to="/events">
              <ArrowLeft size={16} className="mr-2" />
              Back to Events
            </Link>
          </Button>
          
          {address && !isOrganizer && event.status !== 'past' && (
            <div className="flex gap-2">
              {event.applicationRequired && event.applicationStatus === 'open' ? (
                <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                  Apply Now
                </Button>
              ) : (
                <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                  <Ticket size={16} className="mr-2" />
                  Register
                </Button>
              )}
            </div>
          )}
          
          {isOrganizer && (
            <Button className="bg-greenroom-500 hover:bg-greenroom-600">
              Manage Event
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-6 whitespace-pre-line">{event.description}</p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <hr className="my-6" />
              
              <h3 className="text-lg font-semibold mb-3">Event Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.contractAddress && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contract Address</h4>
                    <p className="text-gray-700 break-all">{shortenAddress(event.contractAddress, 6)}</p>
                  </div>
                )}
              </div>
            </div>

            <Tabs defaultValue="details">
              <TabsList className="mb-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                {isOrganizer && <TabsTrigger value="manage">Manage</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="details" className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <p className="text-gray-700 mb-4">
                  This event is {event.applicationRequired ? 'application required' : 'open to register'}.
                  {event.applicationRequired && (
                    <>
                      {' '}Applications are currently <span className="font-medium">{event.applicationStatus}</span>.
                    </>
                  )}
                </p>
                
                {event.ticketPrice && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h4 className="font-medium mb-2">Ticket Information</h4>
                    <p className="text-gray-700">
                      Ticket price: {event.ticketPrice} {event.ticketCurrency}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="attendees" className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Attendees ({event.attendees} / {event.capacity})
                </h3>
                
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: Math.min(event.attendees, 10) }).map((_, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-greenroom-100 flex items-center justify-center mr-2">
                        <User size={16} className="text-greenroom-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Attendee #{index + 1}</p>
                        <p className="text-xs text-gray-500">0x123...4567</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {event.attendees > 10 && (
                  <p className="text-gray-500 text-sm mt-4">
                    + {event.attendees - 10} more attendees
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="discussion" className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Discussion</h3>
                <p className="text-gray-500">
                  No comments yet. Be the first to start a discussion!
                </p>
              </TabsContent>
              
              {isOrganizer && (
                <TabsContent value="manage" className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Management</h3>
                  <div className="space-y-4">
                    <Button className="w-full justify-start">
                      <Users size={16} className="mr-2" />
                      Manage Attendees
                    </Button>
                    {event.applicationRequired && (
                      <Button className="w-full justify-start">
                        <Check size={16} className="mr-2" />
                        Review Applications
                      </Button>
                    )}
                    <Button className="w-full justify-start">
                      <Ticket size={16} className="mr-2" />
                      Manage Tickets
                    </Button>
                    <Button variant="destructive" className="w-full justify-start">
                      <X size={16} className="mr-2" />
                      Cancel Event
                    </Button>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Event Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-2 mr-3">
                    <Calendar className="text-greenroom-600" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Date and Time</h4>
                    <p className="text-gray-700 text-sm">{formatDate(event.date)} {event.endDate && `- ${formatDate(event.endDate)}`}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-2 mr-3">
                    <MapPin className="text-greenroom-600" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Location</h4>
                    <p className="text-gray-700 text-sm">{event.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-2 mr-3">
                    <Users className="text-greenroom-600" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Attendance</h4>
                    <p className="text-gray-700 text-sm">{event.attendees} / {event.capacity}</p>
                  </div>
                </div>
                
                {event.registrationDeadline && (
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-lg p-2 mr-3">
                      <Clock className="text-greenroom-600" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Registration Deadline</h4>
                      <p className="text-gray-700 text-sm">{formatDate(event.registrationDeadline)}</p>
                    </div>
                  </div>
                )}
                
                {event.ticketPrice && (
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-lg p-2 mr-3">
                      <Wallet className="text-greenroom-600" size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Ticket Price</h4>
                      <p className="text-gray-700 text-sm">{event.ticketPrice} {event.ticketCurrency}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="bg-gray-100 rounded-lg p-2 mr-3">
                    <Building className="text-greenroom-600" size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Organizer</h4>
                    <p className="text-gray-700 text-sm">{event.organizer.name || shortenAddress(event.organizer.address)}</p>
                  </div>
                </div>
              </div>
              
              {address && !isOrganizer && event.status !== 'past' && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  {event.applicationRequired && event.applicationStatus === 'open' ? (
                    <Button className="w-full bg-greenroom-500 hover:bg-greenroom-600">
                      Apply Now
                    </Button>
                  ) : (
                    <Button className="w-full bg-greenroom-500 hover:bg-greenroom-600">
                      <Ticket size={16} className="mr-2" />
                      Register
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetails;
