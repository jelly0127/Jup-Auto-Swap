import { LimitOrderProvider, ownerFilter } from "@jup-ag/limit-order-sdk";
import { OrderHistoryItem, TradeHistoryItem } from "@jup-ag/limit-order-sdk";
import { Wallet } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, Signer, sendAndConfirmTransaction } from "@solana/web3.js";
import BN from "bn.js";
import bs58 from "bs58";

import dotenv from 'dotenv';

dotenv.config();

const RPC_API = process.env.RPC_API as string  // 读取环境变量中的RPC接口地址

// 钱包私钥
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

// 被兑换代币地址 usdt
const INPUT_COIN_ADDRESS=process.env.INPUT_COIN_ADDRESS as string

// 需兑换代币地址 jup
const OUTPUT_COIN_ADDRESS = process.env.OUTPUT_COIN_ADDRESS as string

// 需兑换代币数量（例如：1U=1000000）
const LIMIT_INPUT_COIN_AMOUNT = process.env.LIMIT_INPUT_COIN_AMOUNT as unknown as number

const LIMIT_OUTPUT_COIN_AMOUNT = process.env.LIMIT_OUTPUT_COIN_AMOUNT as unknown as number

const owner = new Wallet(
  Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY || ""))  // 通过Base58编码的私钥创建钱包
);
const connection = new Connection(RPC_API);  // 创建与RPC接口的连接

const limitOrder = new LimitOrderProvider(
  connection,
  // 推荐公钥和名称是可选的
  // 提供这两项可以获得推荐费用

  // referralPubKey,
  // referralName
);

export async function limit() { 

// 创建定价单
// Base key用于生成唯一的订单ID
const base = Keypair.generate();
const { tx, orderPubKey } = await limitOrder.createOrder({
  owner: owner.publicKey,
  inAmount: new BN(LIMIT_INPUT_COIN_AMOUNT),  // 输入代币数量
  outAmount: new BN(LIMIT_OUTPUT_COIN_AMOUNT),  // 输出代币数量
  inputMint: new PublicKey(OUTPUT_COIN_ADDRESS),  // 输入代币地址
  outputMint: new PublicKey(INPUT_COIN_ADDRESS),  // 输出代币地址
  expiredAt: null,  // 订单过期时间
  base: base.publicKey,  // 基础密钥
});

  const result = await sendAndConfirmTransaction(connection, tx, [owner.payer, base]);  // 发送并确认交易
  console.log('limitOrderCreatedSuccess--',result);
  if (result) return `https://solscan.io/tx/${result}`

}

export async function getLimitOrders() {
  const openOrder = await limitOrder.getOrders([ownerFilter(owner.publicKey)]);  // 获取钱包的开放订单
  console.log('openOrder--',openOrder);

const orderHistory: OrderHistoryItem[] = await limitOrder.getOrderHistory({
  wallet: owner.publicKey.toBase58(),  // 钱包地址
  take: 20,  // 取回的记录数，最多100
  // lastCursor: order.id // 分页时使用，可选
});
  
  console.log('orderHistory--',orderHistory);

const orderHistoryCount: number = await limitOrder.getOrderHistoryCount({
  wallet: owner.publicKey.toBase58(),  // 钱包地址
});

  console.log('orderHistoryCount--',orderHistoryCount);
  
const tradeHistory: TradeHistoryItem[] = await limitOrder.getTradeHistory({
  wallet: owner.publicKey.toBase58(),  // 钱包地址
  take: 20,  // 取回的记录数，最多100
  // lastCursor: order.id // 分页时使用，可选
});
  console.log('tradeHistory--',tradeHistory);

const tradeHistoryCount: number = await limitOrder.getTradeHistoryCount({
  wallet: owner.publicKey.toBase58(),  // 钱包地址
});
  console.log('tradeHistoryCount--',tradeHistoryCount);
  
}
