
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-greenroom-500 text-white rounded-lg p-1.5 mr-2">
                <span className="text-xl font-bold">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-greenroom-500 to-greenroom-700 bg-clip-text text-transparent">
                Greenroom
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="text-gray-700 hover:text-greenroom-500 font-medium transition-colors">
              Events
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-greenroom-500 font-medium transition-colors">
              My Profile
            </Link>
            <Link to="/explore" className="text-gray-700 hover:text-greenroom-500 font-medium transition-colors">
              Explore
            </Link>
            <div className="ml-4 flex items-center">
              <Button variant="default" className="bg-greenroom-500 hover:bg-greenroom-600">
                Connect Wallet
              </Button>
            </div>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-greenroom-500 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/events" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-greenroom-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-greenroom-500"
              onClick={() => setIsMenuOpen(false)}
            >
              My Profile
            </Link>
            <Link 
              to="/explore" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-greenroom-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <div className="px-3 py-2">
              <Button variant="default" className="w-full bg-greenroom-500 hover:bg-greenroom-600">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
