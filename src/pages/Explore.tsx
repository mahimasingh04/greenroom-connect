
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Award, Shield, Book, Star } from 'lucide-react';

const Explore = () => {
  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-greenroom-500 to-greenroom-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Explore Web3 Credentials</h1>
          <p className="text-greenroom-100">Discover skills, badges, and achievements from across the web3 ecosystem.</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search for skills, credentials, or people" 
              className="pl-10"
            />
          </div>
          <Button className="bg-greenroom-500 hover:bg-greenroom-600">Search</Button>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center hover:shadow-md transition">
            <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <Award className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Event Credentials</h3>
              <p className="text-sm text-gray-500">Hackathons & conferences</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center hover:shadow-md transition">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Verified Skills</h3>
              <p className="text-sm text-gray-500">Technical abilities</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center hover:shadow-md transition">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Book className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Learning Achievements</h3>
              <p className="text-sm text-gray-500">Courses & certificates</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 flex items-center hover:shadow-md transition">
            <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <Star className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Special Recognitions</h3>
              <p className="text-sm text-gray-500">Awards & honors</p>
            </div>
          </div>
        </div>
        
        {/* Trending Skills */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Trending Skills</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="font-semibold mb-2 flex items-center">
                <div className="w-4 h-4 bg-greenroom-500 rounded-full mr-2"></div>
                Solidity
              </div>
              <div className="text-sm text-gray-500 mb-3">Smart Contract Development</div>
              <div className="text-xs text-greenroom-600">580+ verified profiles</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="font-semibold mb-2 flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                React
              </div>
              <div className="text-sm text-gray-500 mb-3">Frontend Development</div>
              <div className="text-xs text-greenroom-600">840+ verified profiles</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="font-semibold mb-2 flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                UI/UX Design
              </div>
              <div className="text-sm text-gray-500 mb-3">Product Design</div>
              <div className="text-xs text-greenroom-600">420+ verified profiles</div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <div className="font-semibold mb-2 flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                Rust
              </div>
              <div className="text-sm text-gray-500 mb-3">Blockchain Development</div>
              <div className="text-xs text-greenroom-600">320+ verified profiles</div>
            </div>
          </div>
        </div>
        
        {/* Featured Credentials */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Featured Credentials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-r from-blue-500 to-blue-700 p-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Award className="text-white" size={32} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">ETH Denver 2023 Winner</h3>
                <p className="text-sm text-gray-500 mb-3">Awarded to hackathon project winners</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">68 earned</span>
                  <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">Details</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 p-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Shield className="text-white" size={32} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Smart Contract Auditor</h3>
                <p className="text-sm text-gray-500 mb-3">Verified security expertise</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">32 earned</span>
                  <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">Details</Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-40 bg-gradient-to-r from-green-500 to-emerald-600 p-6 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Star className="text-white" size={32} />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">Top DAO Contributor</h3>
                <p className="text-sm text-gray-500 mb-3">Recognition for governance participation</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">156 earned</span>
                  <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">Details</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Explore;
