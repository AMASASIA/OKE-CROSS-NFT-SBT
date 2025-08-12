# OKE: AI-Enhanced Digital Asset Creation Platform

This application provides a seamless experience for creating unique digital assets on the blockchain. It leverages AI to generate rich metadata and combines NFT and Soul-Bound Token (SBT) minting into a single, efficient transaction, powered by a robust, centralized application architecture.

## Key Features

- **AI-Powered Metadata:** Uses the Gemini API to automatically generate creative names and descriptions for your assets based on the file type and an optional voice note.
- **Unified Minting:** Mints both a standard ERC-721 NFT and a non-transferable "Proof of Creation" SBT in a single atomic transaction.
- **Token Bound Accounts (TBA):** Automatically computes the ERC-6551 Token Bound Account address for each minted NFT, giving every asset its own smart contract wallet.
- **Seamless User Experience:** A single-page application designed for a smooth, uninterrupted workflow, even on mobile devices with wallet-enforced page reloads.

---

## The New Architecture: How It Works

### 1. Centralized State Management and Persistence to Solve Problems 💾
The biggest flaw in the previous architecture was that the state was scattered across multiple components. When a mobile wallet connection caused a page reload, the application lost its state, and users couldn't return to their in-progress task.

To solve this, the new architecture implements the following:

**Consolidation into a Global Store:** We've combined React's Context API and the useReducer hook to create a global store in `context/AppContext.tsx`. This centralizes all application state, such as `walletAddress`, `mintingStatus`, and `uploadedFile`, so all shared data functions as a single source of truth.

**Automatic State Persistence and Restoration:** Critical state that indicates user intent and progress is now automatically saved to `sessionStorage` whenever it changes. If a page reload occurs, the application instantly "hydrates" from this saved state upon startup. This guarantees that users can fully resume their work after leaving the app to connect their wallet, completely eliminating the "stuck on wallet screen" issue.

### 2. Achieving a Predictable and Robust Workflow ✅
The previous logic was plagued by "race conditions," where state changes were unpredictable. This was a breeding ground for unexpected bugs that ruined the user experience.

To solve this, we've rebuilt the entire workflow as follows:

**State Transitions via "Actions":** Instead of directly modifying state, all state changes are now defined as clear "actions" like `dispatch({ type: 'START_MINT' })` and are updated only through a central `reducer.ts`. This strictly manages state transitions for starting, completing, or canceling the minting process, preventing unexpected behavior.

**Atomic Cleanup:** The logic for cleaning up the "mint intent" flag has been corrected to execute only when the minting process is fully completed or explicitly canceled by the user. This completely eliminates the race condition where state was prematurely cleared, ensuring users can always return to the minting process.

### 3. Improved Maintainability and Development Efficiency with Modularization 🛠️
The previous architecture's complex state management logic made the code difficult to read and maintain.

The new architecture solves these issues by clearly separating responsibilities:

**Separation of Concerns:** `App.tsx` now serves as a "shell" dedicated to providing the global context. Components like `OkeCreator.tsx` and `MintingModal.tsx` are freed from complex logic and can focus solely on their UI rendering.

**Code Modularization:** All state management logic is now consolidated into a new `context` directory. This makes it easy for developers to identify where to look for fixes when issues related to the minting flow or state arise, simplifying debugging and future feature additions.

With these improvements, the AI-Driven Minting workflow has been reborn as a seamless, reliable, and robust experience that can withstand future expansion.

---

## Getting Started

### Prerequisites

- Node.js and npm (or a compatible package manager).
- A browser wallet that supports the Mumbai testnet (e.g., MetaMask, Soul Wallet).
- Test MATIC on the Mumbai network for gas fees.
- API Keys for **Gemini** and **NFT.Storage**.

### 1. Backend: Smart Contract Deployment

The smart contracts need to be deployed to the Mumbai testnet first.

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up Environment Variables:**
    Create a `.env` file in the root directory and add the following, replacing the placeholder values:
    ```
    # Your Mumbai RPC endpoint URL
    MUMBAI_RPC_URL="https://rpc-mumbai.maticvigil.com"

    # Your private key for the deployment wallet
    PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"

    # Optional: Etherscan API key for verification
    POLYGONSCAN_API_KEY="YOUR_POLYGONSCAN_API_KEY"
    ```

3.  **Compile Contracts:**
    ```bash
    npx hardhat compile
    ```

4.  **Deploy to Mumbai:**
    ```bash
    npx hardhat run scripts/deploy.ts --network mumbai
    ```

5.  **Update Contract Address:**
    After a successful deployment, the console will output the new contract address. Copy this address and paste it into `utils/constants.ts`:

    ```typescript
    // utils/constants.ts
    export const OKE_SBT_NFT_ADDRESS = "YOUR_NEWLY_DEPLOYED_CONTRACT_ADDRESS";
    ```

### 2. Frontend: Running the Application

This application is designed to be run in a browser-based development environment.

1.  **Launch the App:** Open the `index.html` file in your development server.

2.  **First-Time API Key Setup:**
    - The first time you attempt to mint an asset, the "AI Mint Preparation Modal" will appear.
    - You will be prompted to enter your **Gemini API Key** and your **NFT.Storage API Key**.
    - These keys are stored securely in your browser's local storage and will be used for all subsequent minting operations.