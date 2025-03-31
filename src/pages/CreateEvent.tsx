
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { CreateEventForm } from '@/components/create-event/CreateEventForm';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertTriangle } from 'lucide-react';
import contractService from '@/services/contractService';

const CreateEvent = () => {
  const { address, userType, connect, networkInfo } = useWallet();
  const [contractAddress, setContractAddress] = useState<string>('');
  const [isConfiguring, setIsConfiguring] = useState<boolean>(false);

  // Check if contract is configured
  useEffect(() => {
    const checkContractConfig = async () => {
      try {
        // In a real app, we'd fetch this from storage or a config service
        // For now, we'll just check localStorage as a simple example
        const savedAddress = localStorage.getItem('eventContractAddress');
        if (savedAddress) {
          setContractAddress(savedAddress);
          await contractService.setContractAddress(savedAddress);
          toast.success("Contract configured successfully");
        }
      } catch (error) {
        console.error("Failed to configure contract:", error);
      }
    };

    if (address) {
      checkContractConfig();
    }
  }, [address]);

  const handleSetContract = async () => {
    if (!contractAddress.trim()) {
      toast.error("Please enter a valid contract address");
      return;
    }

    try {
      await contractService.setContractAddress(contractAddress);
      localStorage.setItem('eventContractAddress', contractAddress);
      setIsConfiguring(false);
      toast.success("Contract address set successfully");
    } catch (error) {
      console.error("Error setting contract address:", error);
      toast.error("Failed to set contract address");
    }
  };

  // Only organizations can create events
  const isAuthorized = address && userType === 'organization';
  const isContractConfigured = !!contractAddress;

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-greenroom-500 to-greenroom-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
          <p className="text-greenroom-100">Set up your event details and deploy it to the blockchain.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {!address ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">You need to connect your wallet to create an event.</p>
              <div className="flex justify-center gap-4">
                <Button onClick={() => connect('user')}>
                  Connect as User
                </Button>
                <Button onClick={() => connect('organization')}>
                  Connect as Organization
                </Button>
              </div>
            </div>
          ) : !isAuthorized ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold mb-4">Organization Account Required</h2>
              <p className="text-gray-600 mb-6">You need to be connected as an organization to create events.</p>
              <p className="text-gray-600 mb-6">Currently connected as: <span className="font-bold capitalize">{userType}</span></p>
              <Button onClick={() => connect('organization')}>
                Switch to Organization Account
              </Button>
            </div>
          ) : !networkInfo?.supported ? (
            <div className="text-center py-12">
              <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
              <h2 className="text-xl font-bold mb-4">Network Not Supported</h2>
              <p className="text-gray-600 mb-6">
                You're currently on <span className="font-medium">{networkInfo?.name || 'Unknown Network'}</span>, which is not supported by this application.
              </p>
              <p className="text-gray-600 mb-6">Please switch to a supported network to continue.</p>
              <Button onClick={() => window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x5' }], // Goerli testnet
              })}>
                Switch to Goerli Testnet
              </Button>
            </div>
          ) : !isContractConfigured || isConfiguring ? (
            <div className="max-w-md mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Contract</CardTitle>
                  <CardDescription>
                    Enter the address of your deployed EventRegistration smart contract
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contract Address</label>
                      <Input 
                        value={contractAddress}
                        onChange={(e) => setContractAddress(e.target.value)}
                        placeholder="0x..."
                      />
                      <p className="text-xs text-muted-foreground">
                        This is the address of the EventRegistration contract after deployment
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {isContractConfigured && (
                    <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                      Cancel
                    </Button>
                  )}
                  <Button onClick={handleSetContract}>
                    Set Contract
                  </Button>
                </CardFooter>
              </Card>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
                <h3 className="font-medium flex items-center text-amber-800">
                  <AlertTriangle size={16} className="mr-2" /> 
                  Need to deploy the contract?
                </h3>
                <p className="mt-2 text-sm text-amber-700">
                  If you haven't deployed the EventRegistration contract yet, you'll need to:
                </p>
                <ol className="list-decimal list-inside mt-2 text-sm text-amber-700 space-y-1">
                  <li>Run <code className="bg-amber-100 px-1 py-0.5 rounded">npx hardhat compile</code></li>
                  <li>Run <code className="bg-amber-100 px-1 py-0.5 rounded">npx hardhat run scripts/deploy.js --network localhost</code></li>
                  <li>Copy the deployed contract address and paste it here</li>
                </ol>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Create Your Event</h2>
                  <p className="text-gray-600">Fill in the details to create a new event</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsConfiguring(true)}
                >
                  Change Contract
                </Button>
              </div>
              <CreateEventForm />
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
