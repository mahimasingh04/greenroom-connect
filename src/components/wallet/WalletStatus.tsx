
import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, AlertTriangle, CheckCircle } from 'lucide-react';

const WalletStatus = () => {
  const { 
    address, 
    userType, 
    networkInfo, 
    balance,
    connect, 
    disconnect, 
    isConnecting 
  } = useWallet();

  if (!address) {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="bg-white text-greenroom-800 hover:bg-greenroom-50"
          onClick={() => connect('user')}
          disabled={isConnecting}
        >
          <Wallet size={16} className="mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect as User'}
        </Button>
        <Button 
          variant="outline" 
          className="bg-white text-greenroom-800 hover:bg-greenroom-50"
          onClick={() => connect('organization')}
          disabled={isConnecting}
        >
          <Wallet size={16} className="mr-2" />
          {isConnecting ? 'Connecting...' : 'Connect as Organization'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      {/* Network Status */}
      <div className="flex items-center">
        {networkInfo?.supported ? (
          <Badge className="flex items-center gap-1 bg-green-500">
            <CheckCircle size={12} />
            <span>{networkInfo.name}</span>
          </Badge>
        ) : (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle size={12} />
            <span>{networkInfo?.name || 'Unknown Network'}</span>
          </Badge>
        )}
      </div>
      
      {/* Balance */}
      {balance && (
        <div className="text-sm font-medium">
          {balance} ETH
        </div>
      )}

      {/* Address & Type */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="capitalize">{userType}</Badge>
        <span className="text-sm font-medium">
          {address.substring(0, 6)}...{address.substring(address.length - 4)}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={disconnect} 
          className="h-8 px-2"
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default WalletStatus;
