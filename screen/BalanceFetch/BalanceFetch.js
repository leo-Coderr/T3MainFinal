import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58"; // Add base58 for validation
import axios from "axios";

// Define the provider URLs for Ethereum and Solana
const ETH_PROVIDER = "https://base-sepolia-rpc.publicnode.com"; // Or use a testnet provider
const SOLANA_DEVNET_URL = "https://api.devnet.solana.com";

export const balanceFetch = async (chain, wallet) => {
  try {
    if (chain === "ETH") {
      console.log(`Fetching ETH balance for wallet: ${wallet}`);
      const provider = new ethers.JsonRpcProvider(ETH_PROVIDER);
      console.log("Provider initialized:", provider);

      const balance = await provider.getBalance(wallet);
      console.log("Raw balance (in wei):", balance.toString());

      const ethBalance = ethers.formatEther(balance);
      console.log(`ETH Balance for wallet ${wallet}:`, ethBalance);
      return ethBalance;
    } else if (chain === "SOLANA") {
      // Validate Solana wallet address format using base58
      if (!base58.decode(wallet)) {
        throw new Error("Invalid Solana wallet address format");
      }

      // For Solana Devnet
      const connection = new Connection(SOLANA_DEVNET_URL, "confirmed");
      const publicKey = new PublicKey(wallet);
      const balance = await connection.getBalance(publicKey);
      const solBalance = balance / 1e9; // Convert lamports to SOL
      console.log(`Solana Balance for wallet ${wallet}:`, solBalance);
      return solBalance;
    } else if (chain === "SOID") {
      // For Cosmos
      const res = await axios.get(
        `http://146.190.5.120:1317/cosmos/bank/v1beta1/balances/${wallet}`
      );

      if (res.data.balances && res.data.balances.length > 0) {
        const balanceObject = res.data.balances.find((b) => b.amount);
        if (balanceObject) {
          const totalBalance = balanceObject.amount;
          console.log("Cosmos Total balance:", totalBalance);
          return totalBalance;
        } else {
          console.log("No balance with an amount found for Cosmos");
          return 0;
        }
      } else {
        console.log("No balances found in Cosmos response");
        return 0;
      }
    } else {
      console.log("Unsupported chain:", chain);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching balance:", error.message || error);
    return 0;
  }
};
