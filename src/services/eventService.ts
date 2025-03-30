
import { EventData, EventApplication, EventTicket } from '@/types/event';

// Mock data for development
const mockEvents: EventData[] = [
  {
    id: '1',
    title: 'ETH Denver 2023',
    description: 'The premier Ethereum hackathon and conference bringing together developers, entrepreneurs, and enthusiasts.',
    date: '2023-03-01',
    endDate: '2023-03-05',
    location: 'Denver, CO',
    imageUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=3280&auto=format&fit=crop',
    organizer: {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      name: 'ETH Global'
    },
    capacity: 5000,
    attendees: 3500,
    category: 'Hackathon',
    tags: ['Ethereum', 'Web3', 'DeFi'],
    registrationDeadline: '2023-02-15',
    ticketPrice: '0.1',
    ticketCurrency: 'ETH',
    applicationRequired: true,
    applicationStatus: 'open',
    status: 'past',
    contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    createdAt: '2022-12-01',
    updatedAt: '2023-02-28'
  },
  {
    id: '2',
    title: 'Web3 Barcelona Summit',
    description: 'A gathering of web3 innovators discussing the latest trends and technologies reshaping the digital landscape.',
    date: '2023-06-15',
    endDate: '2023-06-17',
    location: 'Barcelona, Spain',
    imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=3273&auto=format&fit=crop',
    organizer: {
      address: '0x2345678901abcdef2345678901abcdef23456789',
      name: 'Web3 Foundation'
    },
    capacity: 2000,
    attendees: 1200,
    category: 'Conference',
    tags: ['NFTs', 'DAOs', 'Metaverse'],
    registrationDeadline: '2023-06-01',
    ticketPrice: '0.2',
    ticketCurrency: 'ETH',
    applicationRequired: false,
    applicationStatus: 'closed',
    status: 'past',
    contractAddress: '0xbcdef1234567890abcdef1234567890abcdef123',
    createdAt: '2023-03-15',
    updatedAt: '2023-06-14'
  },
  {
    id: '3',
    title: 'ETH Global Singapore',
    description: 'Explore the cutting edge of Ethereum development with industry leaders and pioneers.',
    date: '2023-12-08',
    endDate: '2023-12-10',
    location: 'Singapore',
    imageUrl: 'https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=3270&auto=format&fit=crop',
    organizer: {
      address: '0x3456789012abcdef3456789012abcdef34567890',
      name: 'ETH Global'
    },
    capacity: 1000,
    attendees: 850,
    category: 'Hackathon',
    tags: ['Ethereum', 'Layer2', 'Scaling'],
    registrationDeadline: '2023-11-15',
    ticketPrice: '0.15',
    ticketCurrency: 'ETH',
    applicationRequired: true,
    applicationStatus: 'closed',
    status: 'past',
    contractAddress: '0xcdef1234567890abcdef1234567890abcdef1234',
    createdAt: '2023-09-01',
    updatedAt: '2023-12-07'
  },
  {
    id: '4',
    title: 'Greenroom Launch Event',
    description: 'Join us for the official launch of Greenroom - the web3 native event platform revolutionizing how we connect.',
    date: '2024-08-15',
    endDate: '2024-08-17',
    location: 'Virtual',
    imageUrl: 'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=3270&auto=format&fit=crop',
    organizer: {
      address: '0x4567890123abcdef4567890123abcdef45678901',
      name: 'Greenroom Team'
    },
    capacity: 10000,
    attendees: 0,
    category: 'Launch',
    tags: ['Web3', 'Events', 'Networking'],
    registrationDeadline: '2024-08-10',
    ticketPrice: '0.05',
    ticketCurrency: 'ETH',
    applicationRequired: false,
    applicationStatus: 'open',
    status: 'upcoming',
    contractAddress: '0xdef1234567890abcdef1234567890abcdef12345',
    createdAt: '2024-06-01',
    updatedAt: '2024-06-01'
  }
];

// Get all events
export const getAllEvents = async (): Promise<EventData[]> => {
  // In a real app, this would fetch from an API or blockchain
  return Promise.resolve(mockEvents);
};

// Get event by ID
export const getEventById = async (id: string): Promise<EventData | null> => {
  const event = mockEvents.find(event => event.id === id);
  return Promise.resolve(event || null);
};

// Get events by status
export const getEventsByStatus = async (status: string): Promise<EventData[]> => {
  const events = mockEvents.filter(event => event.status === status);
  return Promise.resolve(events);
};

// Get events by organizer
export const getEventsByOrganizer = async (organizerAddress: string): Promise<EventData[]> => {
  const events = mockEvents.filter(event => event.organizer.address.toLowerCase() === organizerAddress.toLowerCase());
  return Promise.resolve(events);
};

// Search events by keyword
export const searchEvents = async (keyword: string): Promise<EventData[]> => {
  const normalizedKeyword = keyword.toLowerCase();
  const events = mockEvents.filter(event => 
    event.title.toLowerCase().includes(normalizedKeyword) || 
    event.description.toLowerCase().includes(normalizedKeyword) || 
    event.tags.some(tag => tag.toLowerCase().includes(normalizedKeyword))
  );
  return Promise.resolve(events);
};

// In a real app, we would add more functions like:
// - createEvent
// - updateEvent
// - applyToEvent
// - approveApplication
// - buyTicket
// etc.
