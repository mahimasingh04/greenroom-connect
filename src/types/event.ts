
export type EventStatus = 'upcoming' | 'active' | 'past' | 'canceled';

export type EventApplicationStatus = 'open' | 'closed' | 'pending' | 'approved' | 'rejected';

export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  imageUrl: string;
  organizer: {
    address: string;
    name?: string;
  };
  capacity: number;
  attendees: number;
  category: string;
  tags: string[];
  registrationDeadline?: string;
  ticketPrice?: string;
  ticketCurrency?: string;
  applicationRequired: boolean;
  applicationStatus: EventApplicationStatus;
  status: EventStatus;
  contractAddress?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventApplication {
  id: string;
  eventId: string;
  applicantAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  responses: Record<string, string>;
  submittedAt: string;
  reviewedAt?: string;
}

export interface EventTicket {
  id: string;
  eventId: string;
  holderAddress: string;
  ticketType: 'standard' | 'vip' | 'sponsor';
  price: string;
  currency: string;
  transactionHash: string;
  issuedAt: string;
  usedAt?: string;
  transferredAt?: string;
  transferredTo?: string;
  tokenId?: string;
}

export interface EventComment {
  id: string;
  eventId: string;
  userAddress: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
