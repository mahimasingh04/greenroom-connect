
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { CreateEventForm } from '@/components/create-event/CreateEventForm';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from "@/components/ui/button";

const CreateEvent = () => {
  const { address, userType, connect } = useWallet();

  // Only organizations can create events
  const isAuthorized = address && userType === 'organization';

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
          ) : (
            <CreateEventForm />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
