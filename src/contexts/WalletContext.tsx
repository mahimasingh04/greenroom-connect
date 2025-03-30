
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
          toast.success("Wallet connected", {
            description: `${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`
          });
        } else {
          setAddress(null);
          localStorage.removeItem('walletAddress');
          toast.error("Wallet disconnected");
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  const connect = async () => {
    if (!window.ethereum) {
      toast.error("No wallet found", {
        description: "Please install MetaMask or another browser wallet"
      });
      return;
    }

    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      setAddress(account);
      localStorage.setItem('walletAddress', account);
      
      toast.success("Wallet connected", {
        description: `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      });
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      toast.error("Failed to connect wallet", {
        description: "Please try again"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
    toast.success("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{ address, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
