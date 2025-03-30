
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  Award, 
  Ticket, 
  Network, 
  Wallet, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

import EventList from '@/components/events/EventList';
import HowItWorks from '@/components/home/HowItWorks';
import FeatureShowcase from '@/components/home/FeatureShowcase';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-greenroom-500 to-greenroom-800 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-greenroom-400/20 to-transparent"></div>
        <div className="container mx-auto px-4 py-24 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                Revolutionizing Event Participation with Web3
              </h1>
              <p className="text-xl text-greenroom-100">
                Greenroom streamlines the entire event experience - from applications and ticketing to networking and reputation building - all powered by web3 identity.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-white text-greenroom-800 hover:bg-greenroom-50">
                  <Link to="/explore">Explore Events</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/create">Create Event</Link>
                </Button>
              </div>
              <div className="flex items-center gap-2 text-greenroom-100">
                <CheckCircle size={18} className="text-greenroom-200" />
                <span>No subscription needed</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-greenroom-200"></div>
                <CheckCircle size={18} className="text-greenroom-200" />
                <span>Web3-native experience</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-greenroom-400/30 blur-3xl"></div>
              <div className="relative z-10 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="nft-card animate-float p-4">
                    <div className="h-32 rounded-lg bg-gradient-to-r from-greenroom-400 to-greenroom-600"></div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 w-2/3 rounded-full bg-white/50"></div>
                      <div className="h-3 w-1/2 rounded-full bg-white/40"></div>
                    </div>
                  </div>
                  <div className="nft-card animate-float delay-200 p-4 mt-12">
                    <div className="h-32 rounded-lg bg-gradient-to-r from-blue-400 to-green-400"></div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 w-3/4 rounded-full bg-white/50"></div>
                      <div className="h-3 w-1/2 rounded-full bg-white/40"></div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 nft-card animate-float delay-500 p-4">
                  <div className="h-24 rounded-lg bg-gradient-to-r from-orange-400 to-pink-400"></div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-20 rounded-full bg-white/50"></div>
                      <div className="h-3 w-16 rounded-full bg-white/40"></div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">All-in-One Event Platform for Web3</h2>
            <p className="text-gray-600">Greenroom offers a comprehensive solution for event organizers and attendees, powered by blockchain technology.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Calendar className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Creation</h3>
              <p className="text-gray-600">Easily create events with IPFS-stored metadata and an optional staking mechanism to deter spam.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Identity</h3>
              <p className="text-gray-600">Users create NFT profiles showcasing their skills, past events, and on-chain credentials.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Chain Reputation</h3>
              <p className="text-gray-600">Build a verifiable reputation by participating in events and earning credentials.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Ticket className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NFT Ticketing</h3>
              <p className="text-gray-600">Digital tickets as NFTs that provide access to events and serve as proof of attendance.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Network className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Networking</h3>
              <p className="text-gray-600">Find the right connections based on skill sets and interests, facilitated by on-chain data.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-greenroom-100 rounded-xl flex items-center justify-center mb-6">
                <Wallet className="text-greenroom-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Payouts</h3>
              <p className="text-gray-600">Streamline prize distribution and payments with smart contract automation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link 
              to="/events" 
              className="flex items-center text-greenroom-600 hover:text-greenroom-700 font-medium"
            >
              View all events
              <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          <EventList />
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 bg-greenroom-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Event Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join Greenroom today and be part of the future of web3 event management.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-white text-greenroom-700 hover:bg-greenroom-50">
              <Link to="/explore">Discover Events</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/create">Create Your Event</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
