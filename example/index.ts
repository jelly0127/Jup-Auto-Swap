import { createJupiterApiClient } from "../src/index";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { Wallet } from "@project-serum/anchor";
import bs58 from "bs58";
import { transactionSenderAndConfirmationWaiter } from "./utils/transactionSender";
import { getSignature } from "./utils/getSignature";
const PRIVATE_KEY='42boT4er4uVk6S9wkeTaDmqaFRSTeudHCwuhMvFkMZskmo87nmujBS6tmJtu8cFFbHWHdy5jJSmWqLfm6oAZWX4S'
const RPC_API='https://go.getblock.io/83a534d091cc4303a1fd6753f54ec74a/'

export async function main() {
  const jupiterQuoteApi = createJupiterApiClient();
  const wallet = new Wallet(
    Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY || ""))
  );
  console.log("Wallet:", wallet.publicKey.toBase58());

  // Make sure that you are using your own RPC endpoint.
  // const connection = new Connection(
  //   "https://neat-hidden-sanctuary.solana-mainnet.discover.quiknode.pro/2af5315d336f9ae920028bbb90a73b724dc1bbed/"
  // );
  const connection = new Connection(RPC_API);

  // get quote
  const quote = await jupiterQuoteApi.quoteGet({
    inputMint: "Es9vMFrqoqMEBT9c6RhoEsV6EYiS4SJjn3sCQfDXxTLp",
    outputMint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
    amount: 1000000,
    slippageBps: 50,
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

  console.log('result----',`https://solscan.io/tx/${signature}`);
}

main();
