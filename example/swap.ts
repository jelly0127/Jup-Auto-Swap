import { createJupiterApiClient } from "../src/index";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { transactionSenderAndConfirmationWaiter } from "./utils/transactionSender";
import { getSignature } from "./utils/getSignature";
import dotenv from 'dotenv';
dotenv.config();

//钱包私钥
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

// RPC节点
const RPC_API = process.env.RPC_API as string

//被兑换代币地址 usdt
const INPUT_COIN_ADDRESS=process.env.INPUT_COIN_ADDRESS as string

//需兑换代币地址 jup
const OUTPUT_COIN_ADDRESS = process.env.OUTPUT_COIN_ADDRESS as string

//需兑换代币数量 1U=1000000
const SWAP_OUTPUT_COIN_AMOUNT=process.env.SWAP_OUTPUT_COIN_AMOUNT as unknown as number


export async function swapJup() {
  const jupiterQuoteApi = createJupiterApiClient();
  const wallet = new Wallet(
    Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY || ""))
  );
  
  const connection = new Connection(RPC_API);

  // get quote
  const quote = await jupiterQuoteApi.quoteGet({
    inputMint: INPUT_COIN_ADDRESS,
    outputMint: OUTPUT_COIN_ADDRESS,
    amount: SWAP_OUTPUT_COIN_AMOUNT,
    slippageBps: 100,//滑点值
    onlyDirectRoutes: false,
    asLegacyTransaction: false,
  });

  if (!quote) {
    console.error("unable to quote");
    return;
  }

  // Get serialized transaction
  const swapResult = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toBase58(),
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: "auto",
      // prioritizationFeeLamports: {
      //   autoMultiplier: 2,
      // },
    },
  });

  console.dir(swapResult, { depth: null });

  // Serialize the transaction
  const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, "base64");
  var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

  // Sign the transaction
  transaction.sign([wallet.payer]);
  const signature = getSignature(transaction);

  // We first simulate whether the transaction would be successful
  const { value: simulatedTransactionResponse } =
    await connection.simulateTransaction(transaction, {
      replaceRecentBlockhash: true,
      commitment: "processed",
    });
  const { err, logs } = simulatedTransactionResponse;

  if (err) {
    // Simulation error, we can check the logs for more details
    // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
    console.error("Simulation Error:");
    console.error({ err, logs });
    return;
  }

  const serializedTransaction = Buffer.from(transaction.serialize());
  const blockhash = transaction.message.recentBlockhash;

  const transactionResponse = await transactionSenderAndConfirmationWaiter({
    connection,
    serializedTransaction,
    blockhashWithExpiryBlockHeight: {
      blockhash,
      lastValidBlockHeight: swapResult.lastValidBlockHeight,
    },
  });

  // If we are not getting a response back, the transaction has not confirmed.
  if (!transactionResponse) {
    console.error("Transaction not confirmed");
    return;
  }

  if (transactionResponse.meta?.err) {
    console.error(transactionResponse.meta?.err);
  }
  if (signature) return `https://solscan.io/tx/${signature}`
}

