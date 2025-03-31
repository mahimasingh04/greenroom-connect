
import { ethers } from 'ethers';

// Using a dynamic import for the contract artifact since it might not exist during build time
// We'll provide a placeholder structure for TypeScript
const EventRegistrationArtifact = {
  abi: [] // This will be populated at runtime
};

export interface EventDetails {
  eventId: number;
  name: string;
  ticketPrice: string;
  totalTickets: number;
  ticketsSold: number;
  eventDate: Date;
  active: boolean;
}

export class ContractService {
  private provider: ethers.BrowserProvider;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private contractAddress: string | null = null;
  
  constructor(contractAddress?: string) {
    if (window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
      if (contractAddress) {
        this.contractAddress = contractAddress;
      }
    } else {
      throw new Error('Ethereum provider not found. Please install MetaMask.');
    }
  }

  async loadContractArtifact() {
    try {
      // Use a try-catch with a require statement instead of dynamic import
      // This approach works better with how Vite and TypeScript handle dynamic imports
      return await new Promise<any>((resolve) => {
        try {
          // Using require would work at runtime but TypeScript doesn't like it in modules
          // So we use a Function constructor as a workaround
          const getArtifact = new Function('require', 'return require("../artifacts/contracts/EventRegistration.sol/EventRegistration.json")');
          const artifact = getArtifact(require);
          resolve(artifact);
        } catch (err) {
          console.error('Error loading contract artifact:', err);
          resolve({ abi: [] });
        }
      });
    } catch (error) {
      console.error('Error in loadContractArtifact:', error);
      return { abi: [] };
    }
  }

  async connect(): Promise<string> {
    try {
      this.signer = await this.provider.getSigner();
      
      if (this.contractAddress && this.signer) {
        // Load the contract ABI dynamically
        const artifact = await this.loadContractArtifact();
        
        this.contract = new ethers.Contract(
          this.contractAddress,
          artifact.abi,
          this.signer
        );
      }
      
      return await this.signer.getAddress();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      throw error;
    }
  }

  async createEvent(
    name: string,
    ticketPrice: string,
    totalTickets: number,
    eventDate: Date
  ): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const priceInWei = ethers.parseEther(ticketPrice);
      const timestampInSeconds = Math.floor(eventDate.getTime() / 1000);
      
      const tx = await this.contract.createEvent(
        name,
        priceInWei,
        totalTickets,
        timestampInSeconds
      );
      
      return await tx.wait();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async purchaseTicket(eventId: number, price: string): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const priceInWei = ethers.parseEther(price);
      const tx = await this.contract.purchaseTicket(eventId, {
        value: priceInWei
      });
      
      return await tx.wait();
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      throw error;
    }
  }

  async getEvent(eventId: number): Promise<EventDetails> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      // Convert eventId to string to fix the type error
      const event = await this.contract.getEvent(eventId.toString());
      
      return {
        eventId,
        name: event[0],
        ticketPrice: ethers.formatEther(event[1]),
        totalTickets: Number(event[2]),
        ticketsSold: Number(event[3]),
        eventDate: new Date(Number(event[4]) * 1000),
        active: event[5]
      };
    } catch (error) {
      console.error('Error getting event:', error);
      throw error;
    }
  }

  async verifyTicket(holderAddress: string, eventId: number): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      return await this.contract.verifyTicket(holderAddress, eventId);
    } catch (error) {
      console.error('Error verifying ticket:', error);
      throw error;
    }
  }

  async setContractAddress(address: string): Promise<void> {
    this.contractAddress = address;
    
    if (this.signer) {
      // Load the contract ABI dynamically
      const artifact = await this.loadContractArtifact();
      
      this.contract = new ethers.Contract(
        address,
        artifact.abi,
        this.signer
      );
    }
  }
}

export const contractService = new ContractService();
export default contractService;
