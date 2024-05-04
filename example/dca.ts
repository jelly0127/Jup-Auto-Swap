import { CloseDCAParams, DCA, Network, type CreateDCAParamsV2, type DepositParams, type WithdrawParams } from '@jup-ag/dca-sdk';
import { Connection, Keypair, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from 'bs58';
import dotenv from 'dotenv';

dotenv.config();

const RPC_API = process.env.RPC_API as string


//钱包私钥
const PRIVATE_KEY = process.env.PRIVATE_KEY as string

//被兑换代币地址 usdt
const INPUT_COIN_ADDRESS=process.env.INPUT_COIN_ADDRESS as string

//需兑换代币地址 jup
const OUTPUT_COIN_ADDRESS = process.env.OUTPUT_COIN_ADDRESS as string

const connection = new Connection(RPC_API);

const dca = new DCA(connection, Network.MAINNET);

const user = Keypair.fromSecretKey(new Uint8Array(bs58.decode(PRIVATE_KEY))); 

const USDT = new PublicKey(INPUT_COIN_ADDRESS);
const JUP = new PublicKey(OUTPUT_COIN_ADDRESS);

async function createDCA() {

  // 创建DCA定期购买参数
  const params: CreateDCAParamsV2 = {
    payer: user.publicKey, // 付款方公钥
    user: user.publicKey, // 用户公钥
    inAmount: BigInt(6_000_000), // 总购买量为6 JUP
    inAmountPerCycle: BigInt(3_000_000), // 每次购买3 JUP
    cycleSecondsApart: BigInt(60), // 每次购买间隔60秒
    inputMint: JUP, // 出售代币为JUP
    outputMint: USDT, // 购买代币为USDT
    minOutAmountPerCycle: null,  // 最小输出量（参考集成文档）
    maxOutAmountPerCycle: null, // 最大输出量（参考集成文档）
    startAt: null, // 开始时间（UNIX时间戳，秒）
  };

  const { tx, dcaPubKey } = await dca.createDcaV2(params); // 调用DCA服务创建定期购买
  const txid = await sendAndConfirmTransaction(connection, tx, [user]); // 发送并确认交易


  console.log('Create DCA: ', { txid });

  return dcaPubKey;
}

// this is for withdrawing from program ATA
async function withdraw(dcaPubKey: PublicKey) {
  // it's possible to withdraw in-tokens only or out-tokens only or both in and out tokens together. See WithdrawParams for more details
  const params: WithdrawParams = {
    user: user.publicKey,
    dca: dcaPubKey,
    inputMint: USDT,
    withdrawInAmount: BigInt(1_000_000),
  };

  const { tx } = await dca.withdraw(params);

  const txid = await sendAndConfirmTransaction(connection, tx, [user]);

  console.log('Withdraw: ', { txid });
}

async function closeDCA(dcaPubKey: PublicKey) {
  const params: CloseDCAParams = {
    user: user.publicKey,
    dca: dcaPubKey,
  };

  const { tx } = await dca.closeDCA(params);

  const txid = await sendAndConfirmTransaction(connection, tx, [user]);

  console.log('Close DCA: ', { txid });
}

export async function runDCA() {
  const dcaPubKey = await createDCA();
  console.log('DCA Pub Key: ', { dcaPubKey });

  const dcaAccount = await dca.fetchDCA(dcaPubKey);
  console.log('DCA Account Data: ', { dcaAccount });

//   const dcaAccounts = await dca.getCurrentByUser(user.publicKey);
//   console.log('dcaAccounts--',{ dcaAccounts });

//  const getBalance=  await dca.getBalancesByAccount(dcaPubKey);
//   console.log('getBalance--',{ getBalance });

  // await withdraw(dcaPubKey);

  // await closeDCA(dcaPubKey);
}
