import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const { PRIVATE_KEY, SEPOLIA_RPC_URL, MUMBAI_RPC_URL } = process.env;
const accounts = PRIVATE_KEY && PRIVATE_KEY.length > 0 ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: { optimizer: { enabled: true, runs: 200 } }
  },
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL || "",
      accounts
    },
    mumbai: {
      url: MUMBAI_RPC_URL || "",
      accounts
    }
  }
};

export default config;
