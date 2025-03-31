
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useWallet } from '@/contexts/WalletContext';
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile, updateUserProfile, addUserSkill, removeUserSkill, addPastEvent, removePastEvent, UserProfile, PastEvent } from '@/services/userService';
import contractService from '@/services/contractService';
import { 
  Pencil, 
  Award, 
  Link, 
  Calendar, 
  Star, 
  Users, 
  Shield,
  Clock,
  ExternalLink,
  X,
  Plus,
  Save,
  Trash2,
  Info
} from 'lucide-react';

const Profile = () => {
  const { address, userType } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  
  // Edit profile states
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  
  // Add past event dialog
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<PastEvent>>({
    name: "",
    date: "",
    role: ""
  });

  useEffect(() => {
    loadUserProfile();
  }, [address]);

  const loadUserProfile = async () => {
    if (!address) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // Get profile
      const userProfile = await getUserProfile(address);
      
      // Try to get ENS name if profile name is not set
      if (userProfile && !userProfile.name) {
        const ensName = await contractService.getUserENSName(address);
        if (ensName) {
          userProfile.name = ensName;
          await updateUserProfile(address, { name: ensName });
        }
        
        // Try to get avatar
        const avatar = await contractService.getUserAvatar(address);
        if (avatar) {
          userProfile.avatar = avatar;
          await updateUserProfile(address, { avatar });
        }
      }
      
      setProfile(userProfile);
      // Initialize edit form fields
      if (userProfile) {
        setEditedName(userProfile.name || "");
        setEditedBio(userProfile.bio || "");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!address || !profile) return;
    
    try {
      const updatedProfile = await updateUserProfile(address, {
        name: editedName,
        bio: editedBio
      });
      
      if (updatedProfile) {
        setProfile(updatedProfile);
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleAddSkill = async () => {
    if (!address || !newSkill.trim()) return;
    
    try {
      const updatedProfile = await addUserSkill(address, newSkill.trim());
      if (updatedProfile) {
        setProfile(updatedProfile);
        setNewSkill("");
      }
    } catch (error) {
      toast.error("Failed to add skill");
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    if (!address) return;
    
    try {
      const updatedProfile = await removeUserSkill(address, skill);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (error) {
      toast.error("Failed to remove skill");
    }
  };

  const handleAddPastEvent = async () => {
    if (!address || !newEvent.name || !newEvent.date || !newEvent.role) {
      toast.error("Please fill all required fields");
      return;
    }
    
    try {
      const eventToAdd: PastEvent = {
        id: `event-${Date.now()}`,
        name: newEvent.name,
        date: newEvent.date,
        role: newEvent.role,
        achievement: newEvent.achievement
      };
      
      const updatedProfile = await addPastEvent(address, eventToAdd);
      if (updatedProfile) {
        setProfile(updatedProfile);
        setShowAddEventDialog(false);
        setNewEvent({ name: "", date: "", role: "" });
      }
    } catch (error) {
      toast.error("Failed to add event");
    }
  };

  const handleRemovePastEvent = async (eventId: string) => {
    if (!address) return;
    
    try {
      const updatedProfile = await removePastEvent(address, eventId);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (error) {
      toast.error("Failed to remove event");
    }
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (!address) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
            <p className="text-gray-600 mb-6">Connect your wallet to view and manage your profile</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="h-40 relative bg-gradient-to-r from-greenroom-600 to-greenroom-800">
            <div className="absolute bottom-0 left-0 w-full px-6 pb-4 flex justify-between items-end">
              <div className="flex items-end">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden">
                  {loading ? (
                    <Skeleton className="h-full w-full" />
                  ) : profile?.avatar ? (
                    <img src={profile.avatar} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                      {profile?.name?.charAt(0) || address.charAt(2)}
                    </div>
                  )}
                </div>
                <div className="ml-4 mb-2 text-white">
                  {loading ? (
                    <Skeleton className="h-8 w-40 bg-white/20" />
                  ) : (
                    <h1 className="text-2xl font-bold">{profile?.name || `${address.substring(0, 6)}...${address.substring(address.length - 4)}`}</h1>
                  )}
                  <p className="text-greenroom-100">
                    {loading ? (
                      <Skeleton className="h-5 w-32 bg-white/20" />
                    ) : (
                      `Joined ${profile?.joinedDate ? new Date(profile.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}`
                    )}
                  </p>
                </div>
              </div>
              {!loading && !editMode ? (
                <Button 
                  variant="outline" 
                  className="bg-white text-greenroom-800 mb-2 hover:bg-greenroom-50"
                  onClick={() => setEditMode(true)}
                >
                  <Pencil size={16} className="mr-2" />
                  Edit Profile
                </Button>
              ) : !loading ? (
                <div className="flex space-x-2 mb-2">
                  <Button 
                    variant="outline" 
                    className="bg-white text-red-600 hover:bg-red-50"
                    onClick={() => setEditMode(false)}
                  >
                    <X size={16} className="mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    variant="outline" 
                    className="bg-white text-greenroom-800 hover:bg-greenroom-50"
                    onClick={handleSaveProfile}
                  >
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 pt-16">
            {/* Bio Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Bio</h2>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : editMode ? (
                <Textarea 
                  value={editedBio} 
                  onChange={(e) => setEditedBio(e.target.value)}
                  placeholder="Write something about yourself..."
                  rows={4}
                  className="w-full"
                />
              ) : (
                <p className="text-gray-600">
                  {profile?.bio || "No bio provided yet."}
                </p>
              )}
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Skills</h2>
                {!loading && !editMode && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-greenroom-600 hover:text-greenroom-700"
                    onClick={() => setEditMode(true)}
                  >
                    <Pencil size={14} className="mr-1" />
                    Edit Skills
                  </Button>
                )}
              </div>

              {loading ? (
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-32 rounded-full" />
                  <Skeleton className="h-8 w-28 rounded-full" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile?.skills?.map((skill) => (
                    <div key={skill} className="bg-greenroom-50 text-greenroom-700 px-3 py-1 rounded-full flex items-center">
                      {!editMode ? (
                        <>
                          <Shield size={14} className="mr-1.5" />
                          <span>{skill}</span>
                        </>
                      ) : (
                        <>
                          <span>{skill}</span>
                          <button 
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 text-gray-500 hover:text-red-500"
                          >
                            <X size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  
                  {editMode && (
                    <div className="flex items-center">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="mr-2 w-40"
                      />
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={handleAddSkill}
                      >
                        <Plus size={14} className="mr-1" />
                        Add
                      </Button>
                    </div>
                  )}
                  
                  {!loading && profile?.skills?.length === 0 && !editMode && (
                    <p className="text-gray-500 text-sm">No skills added yet.</p>
                  )}
                </div>
              )}
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
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Past Events</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-greenroom-600 hover:text-greenroom-700"
                      onClick={() => setShowAddEventDialog(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Event
                    </Button>
                  </div>
                  
                  {loading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-24 w-full" />
                      <Skeleton className="h-24 w-full" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {profile?.pastEvents && profile.pastEvents.length > 0 ? (
                        profile.pastEvents.map((event) => (
                          <div key={event.id} className="border rounded-lg p-4 hover:border-greenroom-200 transition-colors">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-greenroom-500 to-greenroom-600 flex items-center justify-center text-white mr-4">
                                  <Calendar size={20} />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{event.name}</h3>
                                  <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                                  <div className="flex items-center mt-1">
                                    {event.achievement ? (
                                      <Star size={14} className="text-yellow-400 mr-1" />
                                    ) : (
                                      <Clock size={14} className="text-gray-400 mr-1" />
                                    )}
                                    <span className="text-sm">{event.role} {event.achievement ? `- ${event.achievement}` : ''}</span>
                                  </div>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemovePastEvent(event.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 border rounded-lg">
                          <Info size={40} className="mx-auto text-gray-300 mb-2" />
                          <p className="text-gray-500">No past events added yet.</p>
                          <p className="text-sm text-gray-400">Add events you have participated in to showcase your experience.</p>
                        </div>
                      )}
                    </div>
                  )}
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

        {/* Add Past Event Dialog */}
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Past Event</DialogTitle>
              <DialogDescription>
                Add an event you've participated in to showcase your experience.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <label htmlFor="eventName" className="text-sm font-medium">Event Name</label>
                <Input 
                  id="eventName" 
                  value={newEvent.name} 
                  onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                  placeholder="ETH Global Tokyo"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="eventDate" className="text-sm font-medium">Date</label>
                <Input 
                  id="eventDate" 
                  type="date"
                  value={newEvent.date} 
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="eventRole" className="text-sm font-medium">Your Role</label>
                <select 
                  id="eventRole"
                  value={newEvent.role}
                  onChange={(e) => setNewEvent({...newEvent, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-greenroom-500 focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="Attendee">Attendee</option>
                  <option value="Speaker">Speaker</option>
                  <option value="Hacker">Hacker</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Judge">Judge</option>
                  <option value="Mentor">Mentor</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="eventAchievement" className="text-sm font-medium">Achievement (optional)</label>
                <Input 
                  id="eventAchievement" 
                  value={newEvent.achievement || ""} 
                  onChange={(e) => setNewEvent({...newEvent, achievement: e.target.value})}
                  placeholder="e.g., Best DeFi Project, Finalist, etc."
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>Cancel</Button>
              <Button onClick={handleAddPastEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Profile;
