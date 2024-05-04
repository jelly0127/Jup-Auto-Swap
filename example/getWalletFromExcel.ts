import ExcelJS, { Workbook, Worksheet } from 'exceljs';

// 钱包数据的接口定义
interface WalletData {
    address: string;
    privateKey: string;
}

// 读取Excel文件中的钱包数据
async function readWalletDataFromExcel(filePath: string): Promise<WalletData[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Wallets');
    const walletData: WalletData[] = [];

    // 检查工作表是否存在
    if (!worksheet) {
        throw new Error('Worksheet not found.');
    }

    // 确保列的配置正确
    if (!worksheet.columns || worksheet.columns.length === 0) {
        throw new Error('No columns defined in the worksheet.');
    }

    // 遍历工作表中的每一行
    worksheet.eachRow((row, rowNumber) => {
        // 跳过表头行
        if (rowNumber !== 1) {
            const address = row.getCell('A').text;  
            const privateKey = row.getCell('B').text;  

            walletData.push({
                address: address,
                privateKey: privateKey,
            });
        }
    });

    return walletData;
}

async function displayWalletData() {
    const filePath = 'Wallets.xlsx';
    try {
        const wallets = await readWalletDataFromExcel(filePath);
        console.log('读取到的钱包数据:', wallets);
    } catch (error) {
        console.error('读取文件时发生错误:', error);
    }
}

displayWalletData();
