export const  generateRandomTimestamp=()=> {
    // 生成30到60之间的随机秒数
    const randomSeconds = Math.floor(Math.random() * 31) + 30;
    
    // 获取当前时间的毫秒数
    const currentTime = new Date().getTime();
    
    // 将随机秒数转换为毫秒数并添加到当前时间上
    const randomTimestamp = currentTime + (randomSeconds * 1000);
    
    // 返回生成的时间戳
    return randomTimestamp;
}

