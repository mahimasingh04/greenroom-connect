
import React from 'react';
import { Shield, Code, Network } from 'lucide-react';

const FeatureShowcase = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6">
              <span className="text-greenroom-600 font-semibold">Web3 Identity & Reputation</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Your On-Chain Profile Opens New Doors</h2>
              <p className="text-gray-600">
                Greenroom aggregates your on-chain data from various sources to create a comprehensive profile that represents your skills, experiences, and achievements in the web3 ecosystem.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Shield className="text-greenroom-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Verifiable Credentials</h3>
                  <p className="text-gray-600 text-sm">
                    Display verifiable proof of your skills and past event participation through on-chain credentials.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Code className="text-greenroom-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Skill Tokenization</h3>
                  <p className="text-gray-600 text-sm">
                    Your skills become tokens that can be verified and recognized across the web3 ecosystem.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Network className="text-greenroom-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Cross-Platform Integration</h3>
                  <p className="text-gray-600 text-sm">
                    Connect data from Guild.xyz, Otterspace, Lens Protocol, and more to create a holistic on-chain identity.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute w-full h-full bg-greenroom-500/10 rounded-3xl -rotate-3"></div>
            <div className="relative bg-white rounded-xl border border-gray-100 shadow-lg p-6 transform rotate-1">
              <div className="profile-background rounded-t-lg h-32"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-between items-end -mt-16">
                  <div className="h-32 w-32 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-greenroom-100"></div>
                    <div className="h-8 w-8 rounded-full bg-greenroom-100"></div>
                    <div className="h-8 w-8 rounded-full bg-greenroom-100"></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-xl font-bold">Alex Thompson</h3>
                  <p className="text-gray-500 text-sm">Blockchain Developer & Designer</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-greenroom-50 text-greenroom-700 text-sm px-3 py-1 rounded-full">Solidity</span>
                      <span className="bg-greenroom-50 text-greenroom-700 text-sm px-3 py-1 rounded-full">React</span>
                      <span className="bg-greenroom-50 text-greenroom-700 text-sm px-3 py-1 rounded-full">UI/UX</span>
                      <span className="bg-greenroom-50 text-greenroom-700 text-sm px-3 py-1 rounded-full">Smart Contracts</span>
                      <span className="bg-greenroom-50 text-greenroom-700 text-sm px-3 py-1 rounded-full">+3 more</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Event History</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm">ETH Denver 2023</span>
                        <span className="text-xs text-gray-500">Mar 2023</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <span className="text-sm">NFT NYC</span>
                        <span className="text-xs text-gray-500">Jun 2023</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Devcon VI</span>
                        <span className="text-xs text-gray-500">Oct 2022</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-24 bg-gray-50 rounded-lg border border-gray-100 p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">On-chain Reputation</span>
                      <span className="text-xs text-greenroom-600">View details</span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div className="h-4 w-14 bg-gray-200 rounded-full mb-1"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                      <div>
                        <div className="h-4 w-14 bg-gray-200 rounded-full mb-1"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                      <div>
                        <div className="h-4 w-14 bg-gray-200 rounded-full mb-1"></div>
                        <div className="h-3 w-10 bg-gray-200 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;
