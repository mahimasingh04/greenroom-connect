
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Upload, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreateEvent = () => {
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
          <Tabs defaultValue="basic">
            <TabsList className="mb-8 w-full justify-start">
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="publish">Publish</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <div className="space-y-8 max-w-3xl">
                {/* Event Cover Image */}
                <div>
                  <Label htmlFor="coverImage">Event Cover Image</Label>
                  <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium text-gray-700">Drop image here or click to upload</p>
                      <p>1200 x 600px recommended. Max 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter your event title" />
                </div>

                {/* Event Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your event. This will be stored on IPFS and linked to your event contract."
                    rows={5}
                  />
                </div>

                {/* Event Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date & Time</Label>
                    <div className="relative">
                      <Input id="startDate" type="datetime-local" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date & Time</Label>
                    <div className="relative">
                      <Input id="endDate" type="datetime-local" />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                </div>

                {/* Event Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Physical location or virtual meeting link" />
                </div>

                {/* Event Category and Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select 
                      id="category" 
                      className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent"
                    >
                      <option value="" disabled selected>Select a category</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="conference">Conference</option>
                      <option value="workshop">Workshop</option>
                      <option value="meetup">Meetup</option>
                      <option value="summit">Summit</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 border rounded-md border-gray-300 p-2 min-h-10">
                      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm flex items-center">
                        Ethereum
                        <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </div>
                      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm flex items-center">
                        Web3
                        <button className="ml-1 text-gray-500 hover:text-gray-700">×</button>
                      </div>
                      <input 
                        type="text" 
                        className="flex-grow min-w-20 outline-none text-sm" 
                        placeholder="Add a tag..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                    Continue to Advanced Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced">
              <div className="space-y-8 max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Advanced Settings</h2>
                
                {/* Staking Settings */}
                <div className="p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Staking Settings</h3>
                  <p className="text-gray-600 mb-4">
                    Requiring a stake can help deter spam and ensure committed participants.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="requireStake">Require Stake?</Label>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="requireStake"
                          className="h-4 w-4 text-greenroom-600 focus:ring-greenroom-500 border-gray-300 rounded"
                        />
                        <label htmlFor="requireStake" className="ml-2 block text-sm text-gray-700">
                          Enable staking requirement for participants
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="stakeAmount">Stake Amount (ETH)</Label>
                        <Input id="stakeAmount" type="number" placeholder="0.1" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stakeToken">Token</Label>
                        <select 
                          id="stakeToken" 
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent"
                        >
                          <option value="eth">ETH</option>
                          <option value="dai">DAI</option>
                          <option value="usdc">USDC</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="stakeReleaseCriteria">Stake Release Criteria</Label>
                      <select 
                        id="stakeReleaseCriteria" 
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent"
                      >
                        <option value="attendance">Event Attendance</option>
                        <option value="submission">Project Submission</option>
                        <option value="manual">Manual Release</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Privacy Settings */}
                <div className="p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="eventVisibility">Event Visibility</Label>
                      <select 
                        id="eventVisibility" 
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent mt-2"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="private">Private - Only invited users can view</option>
                        <option value="token">Token-gated - Requires specific tokens to view</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="attendeeList">Attendee List Visibility</Label>
                      <select 
                        id="attendeeList" 
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent mt-2"
                      >
                        <option value="public">Public - Anyone can see who's attending</option>
                        <option value="private">Private - Only organizers can see</option>
                        <option value="attendees">Attendees Only - Only registered users can see</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline">
                    Back to Basic Details
                  </Button>
                  <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                    Continue to Registration
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="registration">
              <div className="space-y-8 max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Registration Settings</h2>
                
                {/* Registration Options */}
                <div className="p-6 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Registration Options</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                        <Input id="maxAttendees" type="number" placeholder="100" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                        <div className="relative">
                          <Input id="registrationDeadline" type="datetime-local" />
                          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="approvalProcess">Approval Process</Label>
                      <select 
                        id="approvalProcess" 
                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent mt-2"
                      >
                        <option value="automatic">Automatic - First come, first served</option>
                        <option value="manual">Manual - Organizer approval required</option>
                        <option value="criteria">Criteria-based - Based on profile credentials</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Ticketing */}
                <div className="p-6 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Ticket Types</h3>
                    <Button variant="outline" size="sm" className="flex items-center text-greenroom-600 border-greenroom-300">
                      <Plus size={16} className="mr-1" />
                      Add Ticket Type
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* General Admission Ticket */}
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">General Admission</h4>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">0.1 ETH</span> per ticket
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="ticketQty" className="text-sm">Available Quantity</Label>
                          <Input id="ticketQty" type="number" placeholder="50" size={10} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="ticketLimit" className="text-sm">Purchase Limit per Wallet</Label>
                          <Input id="ticketLimit" type="number" placeholder="2" size={10} className="h-8 text-sm" />
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        NFT tickets will be automatically generated when purchased
                      </div>
                    </div>
                    
                    {/* VIP Ticket */}
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium">VIP Access</h4>
                        <div className="text-sm text-gray-500">
                          <span className="font-medium text-gray-700">0.5 ETH</span> per ticket
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="vipQty" className="text-sm">Available Quantity</Label>
                          <Input id="vipQty" type="number" placeholder="20" size={10} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="vipLimit" className="text-sm">Purchase Limit per Wallet</Label>
                          <Input id="vipLimit" type="number" placeholder="1" size={10} className="h-8 text-sm" />
                        </div>
                      </div>
                      
                      <div className="mt-3 text-sm text-gray-600">
                        Includes special networking session and exclusive merch
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between">
                  <Button variant="outline">
                    Back to Advanced Settings
                  </Button>
                  <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                    Continue to Publish
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="publish">
              <div className="space-y-8 max-w-3xl">
                <div className="bg-gray-50 p-8 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-6">Ready to Publish Your Event</h2>
                  <p className="text-gray-600 mb-8">
                    Your event information will be stored on IPFS and linked to a smart contract on the Ethereum blockchain. This requires a small gas fee.
                  </p>
                  
                  <div className="bg-white p-4 rounded-md border mb-8">
                    <h3 className="font-medium mb-4">Event Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Title:</span>
                        <span className="font-medium">Web3 Barcelona Summit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span>June 15-17, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Location:</span>
                        <span>Barcelona, Spain</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Registration:</span>
                        <span>Manual Approval</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ticket Types:</span>
                        <span>2 types</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border mb-8">
                    <h3 className="font-medium mb-4">Estimated Fees</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contract Deployment:</span>
                        <span>~0.01 ETH</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">IPFS Storage:</span>
                        <span>~0.001 ETH</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 mt-2">
                        <span className="font-medium">Total:</span>
                        <span className="font-medium">~0.011 ETH</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-8">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 text-greenroom-600 focus:ring-greenroom-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                      I understand that this action will deploy a smart contract to the blockchain and cannot be reversed.
                    </label>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline">
                      Back to Registration
                    </Button>
                    <Button className="bg-greenroom-500 hover:bg-greenroom-600">
                      Publish Event
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateEvent;
