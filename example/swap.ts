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

   // 请求交换报价
  const quote = await jupiterQuoteApi.quoteGet({
    inputMint: INPUT_COIN_ADDRESS, // 输入代币
    outputMint: OUTPUT_COIN_ADDRESS, // 输出代币
    amount: SWAP_OUTPUT_COIN_AMOUNT, // 交换数量
    slippageBps: 100, // 滑点值，基点表示
    onlyDirectRoutes: false, // 是否只使用直接路径
    asLegacyTransaction: false, // 是否使用传统交易格式
  });
 // 如果无法获取报价，打印错误并返回
  if (!quote) {
    console.error("unable to quote");
    return;
  }

  // 获取交换交易信息
  const swapResult = await jupiterQuoteApi.swapPost({
    swapRequest: {
      quoteResponse: quote,
      userPublicKey: wallet.publicKey.toBase58(), // 用户公钥
      dynamicComputeUnitLimit: true, // 是否动态计算单位限制
      prioritizationFeeLamports: "auto", // 优先费用，自动计算
    },
  });


  console.dir(swapResult, { depth: null });

 // 交易序列化
  const swapTransactionBuf = Buffer.from(swapResult.swapTransaction, "base64");
  var transaction = VersionedTransaction.deserialize(swapTransactionBuf);

 // 签署交易
  transaction.sign([wallet.payer]);
  const signature = getSignature(transaction);

  // 首先模拟交易以检测是否能成功执行
  const { value: simulatedTransactionResponse } =
    await connection.simulateTransaction(transaction, {
      replaceRecentBlockhash: true, // 替换最近的区块哈希
      commitment: "processed", // 提交级别
    });
  const { err, logs } = simulatedTransactionResponse;

  // 检查模拟执行是否有错误，如果有，打印错误和日志
  if (err) {
    console.error("Simulation Error:");
    console.error({ err, logs });
    return;
  }

    // 发送交易，并等待确认
  const serializedTransaction = Buffer.from(transaction.serialize());
  const blockhash = transaction.message.recentBlockhash;

    // 等待交易确认
  const transactionResponse = await transactionSenderAndConfirmationWaiter({
    connection,
    serializedTransaction,
    blockhashWithExpiryBlockHeight: {
      blockhash,
      lastValidBlockHeight: swapResult.lastValidBlockHeight,
    },
  });

  // 如果没有收到回复，则交易尚未确认。
  if (!transactionResponse) {
    console.error("Transaction not confirmed");
    return;
  }

  // 如果错误，打印错误信息
  if (transactionResponse.meta?.err) {
    console.error(transactionResponse.meta?.err);
  }
  //如果成功，返回交易哈希，并退出结束本次交易
  if (signature) return `https://solscan.io/tx/${signature}`
}

