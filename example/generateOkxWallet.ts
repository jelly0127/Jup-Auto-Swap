import fs from 'fs';
import ExcelJS, { Workbook, Worksheet } from 'exceljs';
import { SolWallet } from '@okxweb3/coin-solana';

// 定义钱包数据的接口
interface WalletData {
    address: string;
    privateKey: string;
}

// 加载或创建工作簿，如果文件存在则读取，否则创建新的
async function loadOrCreateWorkbook(filePath: string): Promise<Workbook> {
    const workbook = new ExcelJS.Workbook();
    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
    }
    ensureWorksheet(workbook, 'Wallets');
    return workbook;
}

// 确保工作簿中有指定名称的工作表，如果没有则创建
function ensureWorksheet(workbook: Workbook, sheetName: string): Worksheet {
    let worksheet = workbook.getWorksheet(sheetName);
    if (!worksheet) {
        worksheet = workbook.addWorksheet(sheetName);
    }
    setupWorksheet(worksheet);
    return worksheet;
}

// 设置工作表的列，如果尚未设置
function setupWorksheet(worksheet: Worksheet): void {
    if (!worksheet.columns || worksheet.columns.length === 0) {
        worksheet.columns = [
            { header: 'Address', key: 'address', width: 80 },
            { header: 'Private Key', key: 'privateKey', width: 150 },
        ];
    }
}

// 生成并存储钱包数据的主函数
async function generateAndStoreWalletData() {
    const filePath = 'Wallets.xlsx';
    const workbook = await loadOrCreateWorkbook(filePath);
    const worksheet = ensureWorksheet(workbook, 'Wallets');

    try {
        const wallet = new SolWallet();
        const privateKey = await wallet.getRandomPrivateKey();
        const address = await wallet.getNewAddress({ privateKey });

        const walletData: WalletData = {
            address: address.address,
            privateKey: privateKey,
        };

        worksheet.addRow(walletData); // 将钱包数据添加到工作表
        await workbook.xlsx.writeFile(filePath); // 保存工作簿到文件
        console.log('Wallet data has been written to Excel file.'); // 打印成功信息
    } catch (error) {
        console.error('An error occurred:', error); // 错误处理
    }
}

generateAndStoreWalletData();
