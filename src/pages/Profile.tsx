
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserProfile, updateUserProfile, addUserSkill, removeUserSkill, UserProfile, PastEvent, addPastEvent, removePastEvent } from '@/services/userService';
import { toast } from "sonner";
import { User, Calendar, MapPin, Award, X, Plus, Pencil, Save, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserEventsList from '@/components/profile/UserEventsList';
import contractService from '@/services/contractService';

const Profile = () => {
  const { address, userType, connect } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBio, setEditedBio] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [addingEvent, setAddingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<PastEvent>>({
    name: '',
    date: new Date().toISOString().split('T')[0],
    role: ''
  });
  const [ensName, setEnsName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!address) return;

      setLoading(true);
      try {
        // Try to get ENS name
        const ensResult = await contractService.getUserENSName(address);
        if (ensResult) setEnsName(ensResult);
        
        // Try to get avatar
        const avatarResult = await contractService.getUserAvatar(address);
        if (avatarResult) setAvatar(avatarResult);
        
        // Get user profile
        const userProfile = await getUserProfile(address);
        if (userProfile) {
          setProfile(userProfile);
          setEditedName(userProfile.name || '');
          setEditedBio(userProfile.bio || '');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [address]);

  const handleSaveProfile = async () => {
    if (!address || !profile) return;

    try {
      const updatedProfile = await updateUserProfile(address, {
        name: editedName,
        bio: editedBio
      });

      if (updatedProfile) {
        setProfile(updatedProfile);
        setEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleAddSkill = async () => {
    if (!address || !newSkill.trim()) return;

    try {
      const updatedProfile = await addUserSkill(address, newSkill.trim());
      if (updatedProfile) {
        setProfile(updatedProfile);
        setNewSkill('');
      }
    } catch (error) {
      console.error('Error adding skill:', error);
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
      console.error('Error removing skill:', error);
    }
  };

  const handleAddEvent = async () => {
    if (!address || !newEvent.name || !newEvent.date || !newEvent.role) {
      toast.error('Please fill in all event fields');
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
        setAddingEvent(false);
        setNewEvent({
          name: '',
          date: new Date().toISOString().split('T')[0],
          role: ''
        });
      }
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    }
  };

  const handleRemoveEvent = async (eventId: string) => {
    if (!address) return;

    try {
      const updatedProfile = await removePastEvent(address, eventId);
      if (updatedProfile) {
        setProfile(updatedProfile);
        toast.success('Event removed successfully');
      }
    } catch (error) {
      console.error('Error removing event:', error);
      toast.error('Failed to remove event');
    }
  };

  // If not connected, show connect prompt
  if (!address) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>
                Connect your wallet to view and manage your profile
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => connect('user')} 
                className="w-full sm:w-auto"
              >
                Connect as User
              </Button>
              <Button 
                onClick={() => connect('organization')} 
                variant="outline" 
                className="w-full sm:w-auto"
              >
                Connect as Organization
              </Button>
            </CardFooter>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-greenroom-500 to-greenroom-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
          <p className="text-greenroom-100">View and manage your Web3 profile</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  {!editing && (
                    <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
                      <Pencil size={16} className="mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <>
                    <div className="flex items-center mb-6">
                      <Skeleton className="h-16 w-16 rounded-full mr-4" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-48 mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </>
                ) : (
                  <div className="space-y-6">
                    {/* Avatar and Name */}
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16 mr-4 border-2 border-greenroom-100">
                        <AvatarImage src={avatar || undefined} />
                        <AvatarFallback className="bg-greenroom-200 text-greenroom-700">
                          {profile?.name?.[0]?.toUpperCase() || address[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        {editing ? (
                          <Input
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Your name"
                            className="mb-1"
                          />
                        ) : (
                          <h3 className="text-lg font-semibold">
                            {profile?.name || 'Unnamed User'}
                          </h3>
                        )}

                        <div className="flex items-center text-sm text-muted-foreground">
                          <User size={14} className="mr-1" />
                          {ensName ? ensName : `${address.substring(0, 6)}...${address.substring(address.length - 4)}`}
                        </div>
                      </div>
                    </div>

                    {/* User Type */}
                    <div>
                      <div className="font-medium mb-1 text-sm text-muted-foreground">Account Type</div>
                      <Badge variant="outline" className="capitalize">{userType}</Badge>
                    </div>

                    {/* Bio */}
                    <div>
                      <div className="font-medium mb-1 text-sm text-muted-foreground">Bio</div>
                      {editing ? (
                        <Textarea
                          value={editedBio}
                          onChange={(e) => setEditedBio(e.target.value)}
                          placeholder="Tell us about yourself"
                          className="mb-2"
                        />
                      ) : (
                        <p className="text-sm">{profile?.bio || 'No bio added yet.'}</p>
                      )}
                    </div>

                    {/* Joined Date */}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      Joined {profile?.joinedDate ? new Date(profile.joinedDate).toLocaleDateString() : 'recently'}
                    </div>

                    {/* Edit Buttons */}
                    {editing && (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} className="bg-greenroom-600 hover:bg-greenroom-700">
                          <Save size={16} className="mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" onClick={() => {
                          setEditing(false);
                          setEditedName(profile?.name || '');
                          setEditedBio(profile?.bio || '');
                        }}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills and Events Section */}
          <div className="lg:col-span-2">
            {/* Skills Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your skills and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex flex-wrap gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-8 w-24" />
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profile?.skills.length ? (
                        profile.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="pl-3 pr-2 py-1.5 text-sm">
                            {skill}
                            <button 
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 hover:text-red-500 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No skills added yet.</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a new skill"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newSkill) handleAddSkill();
                        }}
                      />
                      <Button onClick={handleAddSkill} disabled={!newSkill}>
                        <Plus size={16} className="mr-1" />
                        Add
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Past Events Card */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Past Events</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setAddingEvent(!addingEvent)}
                  >
                    {addingEvent ? 'Cancel' : (
                      <>
                        <Plus size={16} className="mr-1" />
                        Add Event
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription>Events you've participated in</CardDescription>
              </CardHeader>
              <CardContent>
                {addingEvent && (
                  <Card className="mb-6 border-dashed">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Event Name</label>
                          <Input
                            value={newEvent.name || ''}
                            onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                            placeholder="Hackathon or conference name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Date</label>
                          <Input
                            type="date"
                            value={newEvent.date || ''}
                            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Your Role</label>
                          <Input
                            value={newEvent.role || ''}
                            onChange={(e) => setNewEvent({...newEvent, role: e.target.value})}
                            placeholder="Participant, speaker, etc."
                          />
                        </div>
                        <div className="grid gap-2">
                          <label className="text-sm font-medium">Achievement (optional)</label>
                          <Input
                            value={newEvent.achievement || ''}
                            onChange={(e) => setNewEvent({...newEvent, achievement: e.target.value})}
                            placeholder="Any award or achievement"
                          />
                        </div>
                        <Button onClick={handleAddEvent} className="w-full bg-greenroom-600 hover:bg-greenroom-700">
                          <Plus size={16} className="mr-1" />
                          Add To Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/3 mb-1" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile?.pastEvents && profile.pastEvents.length > 0 ? (
                      profile.pastEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg p-4 relative group">
                          <button
                            onClick={() => handleRemoveEvent(event.id)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 hover:text-red-500"
                          >
                            <X size={16} />
                          </button>
                          <h3 className="font-medium">{event.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <Calendar size={14} className="mr-1" />
                            {event.date}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Award size={14} className="mr-1" />
                            {event.role}
                          </div>
                          {event.achievement && (
                            <p className="text-sm mt-2 flex items-center">
                              <CheckCheck size={14} className="mr-1 text-green-500" />
                              {event.achievement}
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Award size={24} className="mx-auto mb-2 opacity-50" />
                        <p>No past events added yet.</p>
                        <p className="text-sm">Add events to showcase your experience.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User Events List - Future enhancement */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Your Upcoming Events</h3>
              <UserEventsList userAddress={address} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
