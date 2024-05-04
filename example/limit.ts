import { LimitOrderProvider, ownerFilter } from "@jup-ag/limit-order-sdk";
import { OrderHistoryItem, TradeHistoryItem } from "@jup-ag/limit-order-sdk";
import { Wallet } from "@project-serum/anchor";
import { Connection, Keypair, PublicKey, Signer, sendAndConfirmTransaction } from "@solana/web3.js";
import BN from "bn.js";
import bs58 from "bs58";

import dotenv from 'dotenv';

dotenv.config();

const RPC_API = process.env.RPC_API as string

//钱包私钥
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

//被兑换代币地址 usdt
const INPUT_COIN_ADDRESS=process.env.INPUT_COIN_ADDRESS as string

//需兑换代币地址 jup
const OUTPUT_COIN_ADDRESS = process.env.OUTPUT_COIN_ADDRESS as string

//需兑换代币对数量 1U=1000000
const LIMIT_INPUT_COIN_AMOUNT = process.env.LIMIT_INPUT_COIN_AMOUNT as unknown as number

const LIMIT_OUTPUT_COIN_AMOUNT = process.env.LIMIT_OUTPUT_COIN_AMOUNT as unknown as number

const owner = new Wallet(
  Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY || ""))
);
const connection = new Connection(RPC_API);

const limitOrder = new LimitOrderProvider(
  connection,
  // referralPubKey and name are both optional
  // provide both to get referral fees
  // more details in the section below

  // referralPubKey,
  // referralName
);

export async function limit() { 

// 创建定价单
// Base key are used to generate a unique order id
const base = Keypair.generate();
const { tx, orderPubKey } = await limitOrder.createOrder({
  owner: owner.publicKey,
  inAmount: new BN(LIMIT_INPUT_COIN_AMOUNT), // 1000000 => 1 U
  outAmount: new BN(LIMIT_OUTPUT_COIN_AMOUNT),
  inputMint: new PublicKey(OUTPUT_COIN_ADDRESS),
  outputMint: new PublicKey(INPUT_COIN_ADDRESS),
  expiredAt: null, // new BN(new Date().valueOf() / 1000)
  base: base.publicKey,
});

  const result = await sendAndConfirmTransaction(connection, tx, [owner.payer, base]);
   console.log('limitOrderCreatedSuccess--',result);
  if (result) return `https://solscan.io/tx/${result}`

}

export async function getLimitOrders() {
  const openOrder = await limitOrder.getOrders([ownerFilter(owner.publicKey)]);
  console.log('openOrder--',openOrder);
  

const orderHistory: OrderHistoryItem[] = await limitOrder.getOrderHistory({
  wallet: owner.publicKey.toBase58(),
  take: 20, // optional, default is 20, maximum is 100
  // lastCursor: order.id // optional, for pagination
});
  
  console.log('orderHistory--',orderHistory);
  

const orderHistoryCount: number = await limitOrder.getOrderHistoryCount({
  wallet: owner.publicKey.toBase58(),
});

  console.log('orderHistoryCount--',orderHistoryCount);
  
const tradeHistory: TradeHistoryItem[] = await limitOrder.getTradeHistory({
  wallet: owner.publicKey.toBase58(),
  take: 20, // optional, default is 20, maximum is 100
  // lastCursor: order.id // optional, for pagination
});
  console.log('tradeHistory--',tradeHistory);

const tradeHistoryCount: number = await limitOrder.getTradeHistoryCount({
  wallet: owner.publicKey.toBase58(),
});
  console.log('tradeHistoryCount--',tradeHistoryCount);
  
  
}