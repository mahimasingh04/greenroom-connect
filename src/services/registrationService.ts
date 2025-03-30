
import { EventTicket, EventApplication } from '@/types/event';
import { toast } from "sonner";

// Mock storage for registrations and applications
let mockTickets: EventTicket[] = [];
let mockApplications: EventApplication[] = [];

// Register for an event (for events without application)
export const registerForEvent = async (
  eventId: string, 
  userAddress: string,
  ticketType: 'standard' | 'vip' | 'sponsor' = 'standard',
  price: string = '0',
  currency: string = 'ETH'
): Promise<EventTicket | null> => {
  try {
    // In a real app, this would be a blockchain transaction
    const newTicket: EventTicket = {
      id: `ticket-${Date.now()}`,
      eventId,
      holderAddress: userAddress,
      ticketType,
      price,
      currency,
      transactionHash: `0x${Math.random().toString(16).slice(2)}`,
      issuedAt: new Date().toISOString(),
    };

    // Add to mock storage
    mockTickets.push(newTicket);
    
    return newTicket;
  } catch (error) {
    console.error('Error registering for event:', error);
    return null;
  }
};

// Get user tickets for an event
export const getUserTicketsForEvent = async (eventId: string, userAddress: string): Promise<EventTicket[]> => {
  return mockTickets.filter(
    ticket => ticket.eventId === eventId && ticket.holderAddress.toLowerCase() === userAddress.toLowerCase()
  );
};

// Get all user tickets
export const getUserTickets = async (userAddress: string): Promise<EventTicket[]> => {
  return mockTickets.filter(
    ticket => ticket.holderAddress.toLowerCase() === userAddress.toLowerCase()
  );
};

// Apply for an event
export const applyForEvent = async (
  eventId: string, 
  applicantAddress: string,
  responses: Record<string, string>
): Promise<EventApplication | null> => {
  try {
    // Check if user already applied
    const existingApplication = mockApplications.find(
      app => app.eventId === eventId && app.applicantAddress.toLowerCase() === applicantAddress.toLowerCase()
    );

    if (existingApplication) {
      throw new Error('You have already applied for this event');
    }

    const newApplication: EventApplication = {
      id: `app-${Date.now()}`,
      eventId,
      applicantAddress,
      status: 'pending',
      responses,
      submittedAt: new Date().toISOString(),
    };

    // Add to mock storage
    mockApplications.push(newApplication);
    
    return newApplication;
  } catch (error) {
    console.error('Error applying for event:', error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    return null;
  }
};

// Get user application for an event
export const getUserApplicationForEvent = async (eventId: string, userAddress: string): Promise<EventApplication | null> => {
  const application = mockApplications.find(
    app => app.eventId === eventId && app.applicantAddress.toLowerCase() === userAddress.toLowerCase()
  );
  
  return application || null;
};

// Get all applications for an event (for organizers)
export const getEventApplications = async (eventId: string): Promise<EventApplication[]> => {
  return mockApplications.filter(app => app.eventId === eventId);
};

// Approve or reject an application
export const reviewApplication = async (
  applicationId: string, 
  status: 'approved' | 'rejected'
): Promise<EventApplication | null> => {
  const applicationIndex = mockApplications.findIndex(app => app.id === applicationId);
  
  if (applicationIndex === -1) {
    return null;
  }

  mockApplications[applicationIndex] = {
    ...mockApplications[applicationIndex],
    status,
    reviewedAt: new Date().toISOString()
  };

  // If approved, create a ticket
  if (status === 'approved') {
    const app = mockApplications[applicationIndex];
    await registerForEvent(app.eventId, app.applicantAddress);
  }
  
  return mockApplications[applicationIndex];
};
