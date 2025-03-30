
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { applyForEvent } from '@/services/registrationService';
import { toast } from "sonner";
import { useWallet } from '@/contexts/WalletContext';

interface ApplicationFormProps {
  eventId: string;
  onSuccess?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ eventId, onSuccess }) => {
  const { address } = useWallet();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    motivation: '',
    experience: '',
    links: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address) {
      toast.error("Please connect your wallet to apply");
      return;
    }
    
    try {
      setLoading(true);
      const result = await applyForEvent(eventId, address, formData);
      
      if (result) {
        toast.success("Application submitted successfully!");
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      toast.error("Failed to submit application");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="motivation">Why do you want to attend this event?</Label>
        <Textarea 
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          placeholder="Explain your interest in this event..."
          className="min-h-[100px]"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="experience">Relevant experience</Label>
        <Textarea 
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          placeholder="Share your background and experience..."
          className="min-h-[100px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="links">Relevant links (portfolio, GitHub, LinkedIn, etc.)</Label>
        <Input 
          id="links"
          name="links"
          value={formData.links}
          onChange={handleInputChange}
          placeholder="https://..."
        />
      </div>
      
      <Button 
        type="submit" 
        className="bg-greenroom-500 hover:bg-greenroom-600 w-full"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
};

export default ApplicationForm;
