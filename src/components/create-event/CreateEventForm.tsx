
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar as CalendarIcon, Loader2, Image } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useWallet } from "@/contexts/WalletContext";
import contractService from "@/services/contractService";
import { EventData } from "@/types/event";
import { addDays } from "date-fns";

// Array of placeholder images for random selection
const placeholderImages = [
  "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=3280&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?q=80&w=3273&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?q=80&w=3270&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=3270&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=3280&auto=format&fit=crop",
];

// Form schema validation
const createEventSchema = z.object({
  name: z.string().min(3, { message: "Event name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  eventDate: z.date({ required_error: "Event date is required" }),
  ticketPrice: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
    message: "Ticket price must be a valid number",
  }),
  totalTickets: z.number().min(1, { message: "Must have at least 1 ticket available" }),
  location: z.string().min(3, { message: "Location is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.string(),
});

type CreateEventValues = z.infer<typeof createEventSchema>;

const categoryOptions = ["Conference", "Hackathon", "Workshop", "Meetup", "Launch", "Other"];

export function CreateEventForm() {
  const { address, userType, networkInfo } = useWallet();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      name: "",
      description: "",
      ticketPrice: "0.01",
      totalTickets: 100,
      location: "",
      category: "Conference",
      tags: "Web3, Blockchain",
    },
  });

  const onSubmit = async (data: CreateEventValues) => {
    // Check wallet and network
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (userType !== 'organization') {
      toast.error("You must be connected as an organization to create events");
      return;
    }

    if (!networkInfo?.supported) {
      toast.error("Please switch to a supported network");
      return;
    }

    setIsSubmitting(true);

    try {
      // Deploy event to blockchain
      const tx = await contractService.createEvent(
        data.name,
        data.ticketPrice,
        data.totalTickets,
        data.eventDate
      );

      const tags = data.tags.split(',').map(tag => tag.trim());
      
      // Create event in our local mock database
      const newEvent: EventData = {
        id: `${Date.now()}`,
        title: data.name,
        description: data.description,
        date: data.eventDate.toISOString(),
        endDate: addDays(data.eventDate, 1).toISOString(),
        location: data.location,
        imageUrl: placeholderImages[Math.floor(Math.random() * placeholderImages.length)],
        organizer: {
          address: address,
          name: userType === 'organization' ? "Your Organization" : "Your Name"
        },
        capacity: data.totalTickets,
        attendees: 0,
        category: data.category,
        tags: tags,
        registrationDeadline: addDays(new Date(), 7).toISOString(),
        ticketPrice: data.ticketPrice,
        ticketCurrency: "ETH",
        applicationRequired: false,
        applicationStatus: 'open',
        status: 'upcoming',
        contractAddress: tx ? localStorage.getItem('eventContractAddress') || undefined : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // In a real app, we would save this to a database
      // For this demo, we'll simulate a successful creation
      console.log("Created event:", newEvent);

      toast.success("Event created successfully!", {
        description: "Your event has been created on the blockchain.",
      });

      // Redirect to events page or event details page
      navigate('/events');
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event", {
        description: error.message || "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input placeholder="Web3 Barcelona Summit" {...field} />
              </FormControl>
              <FormDescription>
                The name of your event as it will appear on the blockchain.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your event. This will be stored on IPFS and linked to your event contract."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Event Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Physical location or virtual meeting link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Web3, NFT, DAO" {...field} />
                </FormControl>
                <FormDescription>Separate tags with commas</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="ticketPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Price (ETH)</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0.01" {...field} />
                </FormControl>
                <FormDescription>
                  The price in ETH to purchase a ticket.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalTickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Tickets</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Maximum number of tickets available.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-greenroom-600 hover:bg-greenroom-700"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  );
}
