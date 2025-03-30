
import React from 'react';
import { EventTicket } from '@/types/event';
import { Check, Ticket } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';

interface RegistrationStatusProps {
  ticket: EventTicket;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ ticket }) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Your Registration</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-3 text-green-600">
          <Check size={18} className="bg-green-100 rounded-full p-1" />
          <span className="font-medium">Registered</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Ticket Type</p>
            <p className="font-medium capitalize">{ticket.ticketType}</p>
          </div>
          
          <div>
            <p className="text-gray-500">Issue Date</p>
            <p className="font-medium">{new Date(ticket.issuedAt).toLocaleDateString()}</p>
          </div>
          
          {ticket.price && Number(ticket.price) > 0 && (
            <>
              <div>
                <p className="text-gray-500">Price</p>
                <p className="font-medium">{ticket.price} {ticket.currency}</p>
              </div>
              
              <div>
                <p className="text-gray-500">Transaction</p>
                <p className="font-medium">{shortenAddress(ticket.transactionHash)}</p>
              </div>
            </>
          )}
          
          {ticket.tokenId && (
            <div className="col-span-2">
              <p className="text-gray-500">NFT Token ID</p>
              <p className="font-medium">{ticket.tokenId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatus;
