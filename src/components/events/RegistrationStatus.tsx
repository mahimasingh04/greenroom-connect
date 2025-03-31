
import React from 'react';
import { EventTicket } from '@/types/event';
import { Check, Ticket, ExternalLink } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';
import { useWallet } from '@/contexts/WalletContext';

interface RegistrationStatusProps {
  ticket: EventTicket;
}

const RegistrationStatus: React.FC<RegistrationStatusProps> = ({ ticket }) => {
  const { networkInfo } = useWallet();
  
  // Generate a QR code content based on ticket data
  const qrContent = `${ticket.id}:${ticket.tokenId || ''}:${ticket.holderAddress}`;
  
  // Get the explorer URL based on the current network
  const getExplorerUrl = (txHash: string) => {
    if (!networkInfo?.chainId) return '#';
    
    const explorers: Record<string, string> = {
      "0x1": "https://etherscan.io/tx/",
      "0x5": "https://goerli.etherscan.io/tx/",
      "0x13881": "https://mumbai.polygonscan.com/tx/",
    };
    
    const baseUrl = explorers[networkInfo.chainId] || "https://etherscan.io/tx/";
    return `${baseUrl}${txHash}`;
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Your Registration</h3>
      <div className="bg-gradient-to-br from-greenroom-50 to-gray-50 p-4 rounded-lg border border-greenroom-100 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-green-600">
          <Check size={18} className="bg-green-100 rounded-full p-1" />
          <span className="font-medium">Registered</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* QR Code */}
          <div className="flex-shrink-0 w-32 h-32 bg-white p-1 rounded-md border shadow-sm mx-auto md:mx-0">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(qrContent)}&color=333333`} 
              alt="Ticket QR Code" 
              className="w-full h-full"
            />
          </div>
          
          {/* Ticket Details */}
          <div className="flex-grow">
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
                    <a 
                      href={getExplorerUrl(ticket.transactionHash)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-greenroom-600 hover:underline flex items-center gap-1"
                    >
                      {shortenAddress(ticket.transactionHash)}
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </>
              )}
              
              {ticket.tokenId && (
                <div className="col-span-2">
                  <p className="text-gray-500">NFT Token ID</p>
                  <p className="font-medium flex items-center gap-1">
                    {ticket.tokenId}
                    <span className="bg-greenroom-100 text-greenroom-700 text-xs py-0.5 px-1.5 rounded-full">
                      NFT
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-xs text-center mt-4 text-gray-500">
          Present this QR code at the event entrance for quick check-in
        </div>
      </div>
    </div>
  );
};

export default RegistrationStatus;
