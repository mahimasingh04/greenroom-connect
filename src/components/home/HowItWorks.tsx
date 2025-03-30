
import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">How Greenroom Works</h2>
          <p className="text-gray-600">Our platform streamlines the entire event lifecycle with web3 technology.</p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-12 w-1 bg-greenroom-100 -translate-x-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Step 1 */}
            <div className="lg:text-right">
              <div className="flex lg:justify-end items-start mb-4">
                <div className="lg:order-last">
                  <div className="w-12 h-12 bg-greenroom-100 rounded-full flex items-center justify-center z-10 relative lg:ml-6">
                    <span className="text-greenroom-600 font-bold text-xl">1</span>
                  </div>
                </div>
                <div className="lg:pr-6">
                  <h3 className="text-xl font-bold mb-2">Create Your Web3 Identity</h3>
                  <p className="text-gray-600">Connect your wallet and create your on-chain profile with verified skills and credentials.</p>
                </div>
              </div>
            </div>
            
            {/* Empty column for Step 1 */}
            <div className="hidden lg:block"></div>
            
            {/* Empty column for Step 2 */}
            <div className="hidden lg:block"></div>
            
            {/* Step 2 */}
            <div>
              <div className="flex items-start mb-4">
                <div>
                  <div className="w-12 h-12 bg-greenroom-100 rounded-full flex items-center justify-center z-10 relative lg:mr-6">
                    <span className="text-greenroom-600 font-bold text-xl">2</span>
                  </div>
                </div>
                <div className="pl-6">
                  <h3 className="text-xl font-bold mb-2">Discover Relevant Events</h3>
                  <p className="text-gray-600">Browse and find events that match your interests, skills, and goals.</p>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="lg:text-right">
              <div className="flex lg:justify-end items-start mb-4">
                <div className="lg:order-last">
                  <div className="w-12 h-12 bg-greenroom-100 rounded-full flex items-center justify-center z-10 relative lg:ml-6">
                    <span className="text-greenroom-600 font-bold text-xl">3</span>
                  </div>
                </div>
                <div className="lg:pr-6">
                  <h3 className="text-xl font-bold mb-2">Apply With Your Profile</h3>
                  <p className="text-gray-600">Use your on-chain identity to seamlessly apply for events with a single click.</p>
                </div>
              </div>
            </div>
            
            {/* Empty column for Step 3 */}
            <div className="hidden lg:block"></div>
            
            {/* Empty column for Step 4 */}
            <div className="hidden lg:block"></div>
            
            {/* Step 4 */}
            <div>
              <div className="flex items-start mb-4">
                <div>
                  <div className="w-12 h-12 bg-greenroom-100 rounded-full flex items-center justify-center z-10 relative lg:mr-6">
                    <span className="text-greenroom-600 font-bold text-xl">4</span>
                  </div>
                </div>
                <div className="pl-6">
                  <h3 className="text-xl font-bold mb-2">Attend & Network</h3>
                  <p className="text-gray-600">Use your NFT ticket to access the event and connect with like-minded attendees.</p>
                </div>
              </div>
            </div>
            
            {/* Step 5 */}
            <div className="lg:text-right">
              <div className="flex lg:justify-end items-start">
                <div className="lg:order-last">
                  <div className="w-12 h-12 bg-greenroom-100 rounded-full flex items-center justify-center z-10 relative lg:ml-6">
                    <span className="text-greenroom-600 font-bold text-xl">5</span>
                  </div>
                </div>
                <div className="lg:pr-6">
                  <h3 className="text-xl font-bold mb-2">Build Your Reputation</h3>
                  <p className="text-gray-600">Earn verifiable credentials that enhance your on-chain profile and reputation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
