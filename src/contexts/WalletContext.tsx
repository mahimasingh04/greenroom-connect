
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define user type
export type UserType = 'user' | 'organization';

// Define network info type
export type NetworkInfo = {
  chainId: string;
  name: string;
  supported: boolean;
};

// Define supported networks
export const SUPPORTED_NETWORKS = {
  "0x1": "Ethereum Mainnet",
  "0x5": "Goerli Testnet", 
  "0x13881": "Polygon Mumbai",
  // Add more networks as needed
};

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  userType: UserType | null;
  networkInfo: NetworkInfo | null;
  balance: string | null;
  connect: (type: UserType) => Promise<void>;
  disconnect: () => void;
  checkNetwork: () => Promise<boolean>;
  switchNetwork: (chainId: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedUserType = localStorage.getItem('userType') as UserType | null;
    
    if (savedAddress) {
      setAddress(savedAddress);
      setUserType(savedUserType);
      
      // Get network info
      if (window.ethereum) {
        getNetworkInfo();
        getBalance(savedAddress);
      }
    }
  }, []);

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          localStorage.setItem('walletAddress', accounts[0]);
          getBalance(accounts[0]);
          toast.success("Wallet connected", {
            description: `${accounts[0].substring(0, 6)}...${accounts[0].substring(accounts[0].length - 4)}`
          });
        } else {
          setAddress(null);
          setUserType(null);
          setBalance(null);
          localStorage.removeItem('walletAddress');
          localStorage.removeItem('userType');
          toast.error("Wallet disconnected");
        }
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', () => {
        getNetworkInfo();
        // Refresh the page to ensure all data is consistent with the new network
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const getNetworkInfo = async () => {
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const networkName = SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS] || "Unsupported Network";
      const supported = !!SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS];
      
      setNetworkInfo({
        chainId,
        name: networkName,
        supported
      });
      
      return { chainId, name: networkName, supported };
    } catch (error) {
      console.error("Error getting network info:", error);
      return null;
    }
  };

  const getBalance = async (walletAddress: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [walletAddress, 'latest']
      });
      
      // Convert from wei to ETH
      const ethBalance = parseInt(balance, 16) / 1e18;
      setBalance(ethBalance.toFixed(4));
    } catch (error) {
      console.error("Error getting wallet balance:", error);
      setBalance(null);
    }
  };

  const checkNetwork = async () => {
    const network = await getNetworkInfo();
    return network?.supported || false;
  };

  const switchNetwork = async (chainId: string) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
      return true;
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        // Add the network - this would need network-specific parameters
        toast.error("Network not available in your wallet", {
          description: "Please add this network to your MetaMask manually."
        });
      } else {
        toast.error("Failed to switch network", {
          description: switchError.message
        });
      }
      return false;
    }
  };

  const connect = async (type: UserType) => {
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
      setUserType(type);
      
      localStorage.setItem('walletAddress', account);
      localStorage.setItem('userType', type);
      
      // Get network info and balance
      await getNetworkInfo();
      await getBalance(account);
      
      toast.success(`Connected as ${type}`, {
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
    setUserType(null);
    setNetworkInfo(null);
    setBalance(null);
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userType');
    toast.success("Wallet disconnected");
  };

  return (
    <WalletContext.Provider value={{ 
      address, 
      isConnecting, 
      userType, 
      networkInfo,
      balance,
      connect, 
      disconnect,
      checkNetwork,
      switchNetwork
    }}>
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
