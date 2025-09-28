#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 影片優化腳本
 * 檢查影片文件大小並提供優化建議
 */

const videosDir = path.join(__dirname, '../public/videos');

function checkVideoSizes() {
  console.log('🎬 檢查影片文件大小...\n');
  
  if (!fs.existsSync(videosDir)) {
    console.log('❌ 影片目錄不存在:', videosDir);
    return;
  }
  
  const files = fs.readdirSync(videosDir);
  
  files.forEach(file => {
    if (file.match(/\.(mp4|webm|mov)$/i)) {
      const filePath = path.join(videosDir, file);
      const stat = fs.statSync(filePath);
      const sizeMB = Math.round(stat.size / (1024 * 1024) * 100) / 100;
      
      console.log(`📹 ${file}:`);
      console.log(`   大小: ${sizeMB}MB`);
      
      if (sizeMB > 10) {
        console.log(`   ⚠️  建議壓縮 (大於 10MB)`);
        console.log(`   💡 優化建議:`);
        console.log(`      - 降低解析度 (720p 或 480p)`);
        console.log(`      - 降低位元率 (1-2 Mbps)`);
        console.log(`      - 使用 H.264 編碼`);
        console.log(`      - 考慮使用 WebM 格式`);
      } else if (sizeMB > 5) {
        console.log(`   ⚠️  建議輕度壓縮 (大於 5MB)`);
      } else {
        console.log(`   ✅ 大小適中`);
      }
      console.log('');
    }
  });
}

function generateVideoOptimizationCommands() {
  console.log('🛠️  影片優化命令建議:\n');
  
  console.log('使用 FFmpeg 壓縮影片:');
  console.log('```bash');
  console.log('# 壓縮為 720p, 1.5 Mbps');
  console.log('ffmpeg -i taiwan-education.mp4 \\');
  console.log('  -c:v libx264 \\');
  console.log('  -crf 28 \\');
  console.log('  -maxrate 1.5M \\');
  console.log('  -bufsize 3M \\');
  console.log('  -vf scale=1280:720 \\');
  console.log('  -c:a aac \\');
  console.log('  -b:a 128k \\');
  console.log('  taiwan-education-optimized.mp4');
  console.log('');
  console.log('# 創建 WebM 版本 (更小)');
  console.log('ffmpeg -i taiwan-education.mp4 \\');
  console.log('  -c:v libvpx-vp9 \\');
  console.log('  -crf 30 \\');
  console.log('  -b:v 0 \\');
  console.log('  -b:a 128k \\');
  console.log('  -c:a libopus \\');
  console.log('  taiwan-education.webm');
  console.log('```\n');
}

function generatePreloadStrategy() {
  console.log('📋 影片預載入策略:\n');
  
  const strategy = {
    critical: [
      'taiwan-education-poster.jpg', // 優先載入封面
      'taiwan-education.mp4' // 然後載入影片
    ],
    optimization: [
      '使用 poster 圖片作為首屏顯示',
      '影片設置 preload="none" 避免自動載入',
      '用戶互動後才開始載入影片',
      '提供多種格式 (MP4, WebM)',
      '使用 CDN 加速載入'
    ]
  };
  
  console.log('關鍵資源載入順序:');
  strategy.critical.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
  
  console.log('\n優化建議:');
  strategy.optimization.forEach((item, index) => {
    console.log(`${index + 1}. ${item}`);
  });
}

function main() {
  console.log('🚀 開始影片優化分析...\n');
  
  checkVideoSizes();
  generateVideoOptimizationCommands();
  generatePreloadStrategy();
  
  console.log('✨ 影片優化分析完成！');
  console.log('\n💡 下一步建議:');
  console.log('1. 使用 FFmpeg 壓縮影片');
  console.log('2. 創建 WebM 格式版本');
  console.log('3. 優化 poster 圖片大小');
  console.log('4. 考慮使用 CDN 加速');
}

if (require.main === module) {
  main();
}

module.exports = { checkVideoSizes, generateVideoOptimizationCommands };
