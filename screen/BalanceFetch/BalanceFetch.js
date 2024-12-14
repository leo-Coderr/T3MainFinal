import { ethers } from "ethers";
import { Connection, PublicKey } from "@solana/web3.js";
import base58 from "bs58"; // Add base58 for validation
import axios from "axios";

// Define the provider URLs for Ethereum and Solana
const ETH_PROVIDER = "https://ethereum-sepolia-rpc.publicnode.com";
const SOLANA_DEVNET_URL = "https://api.devnet.solana.com";

export const balanceFetch = async (chain, wallets) => {
  try {
    let totalBalance = 0;

    if (chain === "ETH") {
      // If Ethereum, handle the balance fetch as before
      for (let wallet of wallets) {
        console.log(`Fetching ETH balance for wallet: ${wallet}`);
        const provider = new ethers.JsonRpcProvider(ETH_PROVIDER);
        const balance = await provider.getBalance(wallet);
        const ethBalance = ethers.formatEther(balance);
        totalBalance += parseFloat(ethBalance); // Sum up ETH balance
        console.log(`ETH Balance for wallet ${wallet}:`, ethBalance);
      }
      console.log(`Total ETH Balance: ${totalBalance}`);
      return totalBalance;
    } else if (chain === "SOLANA") {
      // For Solana, handle multiple wallets
      const connection = new Connection(SOLANA_DEVNET_URL, "confirmed");

      for (let wallet of wallets) {
        if (!base58.decode(wallet)) {
          throw new Error("Invalid Solana wallet address format");
        }
        const publicKey = new PublicKey(wallet);
        const balance = await connection.getBalance(publicKey);
        const solBalance = balance / 1e9; // Convert lamports to SOL
        totalBalance += solBalance; // Sum up Solana balance
        console.log(`Solana Balance for wallet ${wallet}:`, solBalance);
      }
      console.log(`Total Solana Balance: ${totalBalance}`);
      return totalBalance;
    } else if (chain === "SOID") {
      // For Cosmos, handle the balance fetch as before
      for (let wallet of wallets) {
        const res = await axios.get(
          `https://explorer-restapi.sovereignty.one/cosmos/bank/v1beta1/balances/${wallet}`
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
      }
    } else if (chain === "BTC") {
      // For Bitcoin, handle the balance fetch as before
      for (let wallet of wallets) {
        console.log(`Fetching BTC balance for wallet: ${wallet}`);
        const res = await axios.get(
          `https://api.blockcypher.com/v1/btc/main/addrs/${wallet}/balance`
        );

        if (res.data && res.data.balance !== undefined) {
          const btcBalance = res.data.balance / 1e8; // Convert satoshis to BTC
          totalBalance += btcBalance; // Sum up BTC balance
          console.log(`BTC Balance for wallet ${wallet}:`, btcBalance);
        } else {
          console.log("No balance found in Bitcoin response");
        }
      }
      console.log(`Total BTC Balance: ${totalBalance}`);
      return totalBalance;
    } else {
      console.log("Unsupported chain:", chain);
      return 0;
    }
  } catch (error) {
    console.error("Error fetching balance:", error.message || error);
    return 0;
  }
};
