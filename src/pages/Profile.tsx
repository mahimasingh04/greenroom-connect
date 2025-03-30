
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pencil, 
  Award, 
  Link, 
  Calendar, 
  Star, 
  Users, 
  Shield,
  Clock,
  ExternalLink
} from 'lucide-react';

const Profile = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="profile-background h-40 relative">
            <div className="absolute bottom-0 left-0 w-full px-6 pb-4 flex justify-between items-end">
              <div className="flex items-end">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                </div>
                <div className="ml-4 mb-2 text-white">
                  <h1 className="text-2xl font-bold">Alex Thompson</h1>
                  <p className="text-greenroom-100">Joined April 2023</p>
                </div>
              </div>
              <Button variant="outline" className="bg-white text-greenroom-800 mb-2 hover:bg-greenroom-50">
                <Pencil size={16} className="mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 pt-16">
            {/* Bio Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Bio</h2>
              <p className="text-gray-600">
                Blockchain developer and designer with 4+ years of experience in web3. Passionate about building decentralized applications that solve real-world problems. Expert in Solidity, React, and designing user-friendly interfaces for crypto products.
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Skills</h2>
                <Button variant="ghost" size="sm" className="text-greenroom-600 hover:text-greenroom-700">
                  <Pencil size={14} className="mr-1" />
                  Edit Skills
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  <span>Solidity</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  <span>Smart Contracts</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full flex items-center">
                  <Shield size={14} className="mr-1.5" />
                  <span>React</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full">
                  <span>JavaScript</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full">
                  <span>UI/UX Design</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full">
                  <span>Ethereum</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full">
                  <span>DeFi</span>
                </div>
                <div className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full">
                  <span>Web3.js</span>
                </div>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Connected Accounts</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-blue-600">L</span>
                  </div>
                  <div>
                    <p className="font-medium">Lens Protocol</p>
                    <p className="text-xs text-gray-500">@alexthompson.lens</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-green-600">G</span>
                  </div>
                  <div>
                    <p className="font-medium">Guild.xyz</p>
                    <p className="text-xs text-gray-500">Connected</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-semibold text-purple-600">O</span>
                  </div>
                  <div>
                    <p className="font-medium">Otterspace</p>
                    <p className="text-xs text-gray-500">5 badges</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center border-dashed">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Link size={18} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Connect another</p>
                    <p className="text-xs text-gray-500">Link account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Event History & Credentials */}
            <div>
              <Tabs defaultValue="events">
                <TabsList className="mb-6">
                  <TabsTrigger value="events" className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    Event History
                  </TabsTrigger>
                  <TabsTrigger value="credentials" className="flex items-center">
                    <Award size={16} className="mr-2" />
                    Credentials
                  </TabsTrigger>
                  <TabsTrigger value="connections" className="flex items-center">
                    <Users size={16} className="mr-2" />
                    Connections
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="events">
                  <div className="space-y-4">
                    {/* Event 1 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-greenroom-500 to-greenroom-600 flex items-center justify-center text-white mr-4">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold">ETH Denver 2023</h3>
                            <p className="text-sm text-gray-500">March 1-5, 2023</p>
                            <div className="flex items-center mt-1">
                              <Star size={14} className="text-yellow-400 mr-1" />
                              <span className="text-sm">Hackathon Winner - Best DeFi Project</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-greenroom-600 hover:text-greenroom-700">
                          <ExternalLink size={14} className="mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    {/* Event 2 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white mr-4">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold">NFT NYC</h3>
                            <p className="text-sm text-gray-500">June 15-17, 2023</p>
                            <div className="flex items-center mt-1">
                              <Clock size={14} className="text-gray-400 mr-1" />
                              <span className="text-sm">Speaker - "The Future of Digital Identity"</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-greenroom-600 hover:text-greenroom-700">
                          <ExternalLink size={14} className="mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                    
                    {/* Event 3 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white mr-4">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold">Devcon VI</h3>
                            <p className="text-sm text-gray-500">October 11-14, 2022</p>
                            <div className="flex items-center mt-1">
                              <Users size={14} className="text-gray-400 mr-1" />
                              <span className="text-sm">Attendee</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-greenroom-600 hover:text-greenroom-700">
                          <ExternalLink size={14} className="mr-1" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="credentials">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Credential 1 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="h-32 bg-gradient-to-r from-greenroom-500 to-greenroom-700 rounded-lg mb-3 flex items-center justify-center">
                        <Award size={40} className="text-white" />
                      </div>
                      <h3 className="font-semibold">Hackathon Winner</h3>
                      <p className="text-sm text-gray-500 mb-2">ETH Denver 2023</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-greenroom-100 text-greenroom-800 px-2 py-1 rounded">Verified on-chain</span>
                        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">View</Button>
                      </div>
                    </div>
                    
                    {/* Credential 2 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg mb-3 flex items-center justify-center">
                        <Users size={40} className="text-white" />
                      </div>
                      <h3 className="font-semibold">Speaker</h3>
                      <p className="text-sm text-gray-500 mb-2">NFT NYC 2023</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Verified on-chain</span>
                        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">View</Button>
                      </div>
                    </div>
                    
                    {/* Credential 3 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                      <div className="h-32 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mb-3 flex items-center justify-center">
                        <Shield size={40} className="text-white" />
                      </div>
                      <h3 className="font-semibold">Solidity Expert</h3>
                      <p className="text-sm text-gray-500 mb-2">Skill verification</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Verified by Otterspace</span>
                        <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">View</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="connections">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Connection 1 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <div className="w-full h-full bg-gradient-to-br from-pink-400 to-red-500"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Emma Wilson</h3>
                        <p className="text-xs text-gray-500">Full Stack Developer</p>
                        <p className="text-xs text-greenroom-600 mt-1">Met at ETH Denver 2023</p>
                      </div>
                    </div>
                    
                    {/* Connection 2 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <div className="w-full h-full bg-gradient-to-br from-green-400 to-teal-500"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold">James Rodriguez</h3>
                        <p className="text-xs text-gray-500">Smart Contract Auditor</p>
                        <p className="text-xs text-greenroom-600 mt-1">Met at NFT NYC 2023</p>
                      </div>
                    </div>
                    
                    {/* Connection 3 */}
                    <div className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-500"></div>
                      </div>
                      <div>
                        <h3 className="font-semibold">Sophia Chen</h3>
                        <p className="text-xs text-gray-500">Product Designer</p>
                        <p className="text-xs text-greenroom-600 mt-1">Met at Devcon VI</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
