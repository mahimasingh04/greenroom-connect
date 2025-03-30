
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Ticket, Loader2 } from 'lucide-react';
import { registerForEvent } from '@/services/registrationService';
import { useWallet } from '@/contexts/WalletContext';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface RegisterButtonProps {
  eventId: string;
  price?: string;
  currency?: string;
  onSuccess?: () => void;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ 
  eventId, 
  price = '0', 
  currency = 'ETH',
  onSuccess 
}) => {
  const { address } = useWallet();
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleRegister = async () => {
    if (!address) {
      toast.error("Please connect your wallet to register");
      return;
    }
    
    setLoading(true);
    try {
      const result = await registerForEvent(eventId, address, 'standard', price, currency);
      
      if (result) {
        toast.success("Registration successful!");
        setConfirmDialogOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error("Failed to register for event");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        onClick={() => setConfirmDialogOpen(true)}
        className="bg-greenroom-500 hover:bg-greenroom-600"
      >
        <Ticket size={16} className="mr-2" />
        Register
      </Button>

      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Registration</DialogTitle>
            <DialogDescription>
              You are about to register for this event. 
              {Number(price) > 0 && (
                <span className="font-medium block mt-2">
                  This will cost {price} {currency}.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setConfirmDialogOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRegister} 
              className="bg-greenroom-500 hover:bg-greenroom-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Ticket size={16} className="mr-2" />
                  Confirm
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterButton;
