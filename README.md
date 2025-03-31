
# Greenroom - Web3 Event Platform

A decentralized web3 platform for creating, managing, and participating in events using smart contracts.

## Features

- Create and manage events as an organization
- Register for events using cryptocurrency
- User profiles with skills and past event history
- Blockchain-based ticketing system using NFTs
- Responsive UI using Tailwind CSS and shadcn/ui

## Prerequisites

- Node.js (v16+)
- Hardhat for smart contract development
- MetaMask or another Ethereum wallet

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Compile the smart contract:

```bash
npx hardhat compile
```

4. Copy the contract artifacts to the public folder:

```bash
node scripts/copyArtifacts.js
```

5. Start a local Ethereum node:

```bash
npx hardhat node
```

6. In a new terminal, deploy the contract to the local node:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

7. Copy the deployed contract address

8. Start the development server:

```bash
npm run dev
```

9. Open your browser and navigate to `http://localhost:5173`

10. Connect your MetaMask wallet to the local network (Localhost:8545)

11. In the Create Event page, set the contract address to the one you deployed

## Smart Contracts

The platform uses a main `EventRegistration.sol` contract which:

- Creates and manages events
- Handles ticket sales
- Issues NFT tickets to attendees
- Verifies ticket ownership

## Development Workflow

1. Connect your wallet as either a user or organization
2. Organizations can create events with customizable parameters
3. Users can view events and register to attend
4. Tickets are stored as NFTs on the blockchain
5. Event creators can verify attendance using the contract's verification system

## License

MIT
