
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Search, 
  MapPin, 
  Filter, 
  ChevronDown,
  Plus
} from 'lucide-react';
import EventList from '@/components/events/EventList';

const Events = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-greenroom-500 to-greenroom-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
              <p className="text-greenroom-100">Find the perfect web3 events to attend and make connections.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-white text-greenroom-700 hover:bg-greenroom-50">
                <Plus size={18} className="mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                placeholder="Search events" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Calendar size={18} className="mr-2" />
                  Date
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="relative">
                <Button variant="outline" className="w-full sm:w-auto">
                  <MapPin size={18} className="mr-2" />
                  Location
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>
              
              <div className="relative">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter size={18} className="mr-2" />
                  Filters
                  <ChevronDown size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <Button variant="ghost" className="text-greenroom-600 hover:text-greenroom-700">
              View all
            </Button>
          </div>

          <EventList />
        </div>
        
        {/* Past Events Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Past Events</h2>
            <Button variant="ghost" className="text-greenroom-600 hover:text-greenroom-700">
              View all
            </Button>
          </div>

          <EventList />
        </div>
      </div>
    </MainLayout>
  );
};

export default Events;
