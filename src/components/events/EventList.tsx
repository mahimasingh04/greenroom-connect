
import React from 'react';
import EventCard, { Event } from './EventCard';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'ETH Denver 2023',
    description: 'The premier Ethereum hackathon and conference bringing together developers, entrepreneurs, and enthusiasts.',
    date: 'March 1-5, 2023',
    location: 'Denver, CO',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=3280&auto=format&fit=crop',
    attendees: 3500,
    category: 'Hackathon',
    tags: ['Ethereum', 'Web3', 'DeFi'],
  },
  {
    id: '2',
    title: 'Web3 Barcelona Summit',
    description: 'A gathering of web3 innovators discussing the latest trends and technologies reshaping the digital landscape.',
    date: 'June 15-17, 2023',
    location: 'Barcelona, Spain',
    imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=3273&auto=format&fit=crop',
    attendees: 1200,
    category: 'Conference',
    tags: ['NFTs', 'DAOs', 'Metaverse'],
  },
  {
    id: '3',
    title: 'DeFi Singapore 2023',
    description: 'Explore the cutting edge of decentralized finance with industry leaders and pioneers.',
    date: 'September 8-10, 2023',
    location: 'Singapore',
    imageUrl: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=3270&auto=format&fit=crop',
    attendees: 850,
    category: 'Summit',
    tags: ['DeFi', 'Finance', 'Trading'],
  }
];

const EventList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mockEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
