import { getLimitOrders, limit } from './limit';
import { swapJup } from './swap';
import { generateRandomTimestamp } from './utils';

let successCount = 0;
const stopCount = 100;

// 定义定时器的回调函数
async function runSwap() {
    // 调用swapJup函数
    const result = await swapJup();
    
    // 如果返回结果不为空，则表示交易成功
    if (result) {
        successCount++;
        console.log(`交易成功次数: ${successCount}, ${result}`);
        
        // 如果成功次数未达到停止次数，则继续执行
        if (successCount < stopCount) {
            setTimeout(runSwap, generateRandomTimestamp()); // 随机数30-60秒之间，后再次执行runSwap函数
        } else {
            console.log("已停止运行");
        }
    }
}

// 立即启动运行
runSwap();
// limit()
// getLimitOrders()