# Jupiter 策略交易脚本

# 1.yarn or npm i

# 2.创建.env文件 
## 钱包私钥
### PRIVATE_KEY=

##  RPC节点
### RPC_API = 

## 被兑换代币地址 如 usdt
### INPUT_COIN_ADDRESS=

## 需兑换代币地址 如 jup
### OUTPUT_COIN_ADDRESS = 

## swap 需兑换代币数量 1U=1000000
### SWAP_OUTPUT_COIN_AMOUNT=1000000

## limit 需兑换代币数量 1U=1000000
### LIMIT_OUTPUT_COIN_AMOUNT=1000000

## limit 被兑换代币数量 1U=1000000
### LIMIT_INPUT_COIN_AMOUNT=1000000


# 3.在example/main/中注释放行需要执行的策略
# 4.yarn start


# example/generateOkxWallet/ 生成okx钱包并记录为Excel表存贮
# example/getWalletFromExcel/ 读取Excel表存贮的钱包数据，可以将交易所账户生成的子账号导入并命名为 Wallets.xlsx