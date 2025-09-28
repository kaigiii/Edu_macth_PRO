#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 資源優化腳本
 * 用於壓縮和優化靜態資源
 */

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// 檢查圖片文件大小
function checkImageSizes() {
  console.log('🔍 檢查圖片文件大小...');
  
  const checkDir = (dir) => {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkDir(filePath);
      } else if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const sizeKB = Math.round(stat.size / 1024);
        const sizeMB = Math.round(stat.size / (1024 * 1024) * 100) / 100;
        
        if (sizeKB > 500) { // 大於 500KB
          console.log(`⚠️  大文件: ${filePath} (${sizeMB}MB)`);
        } else {
          console.log(`✅ 正常: ${filePath} (${sizeKB}KB)`);
        }
      }
    });
  };
  
  checkDir(imagesDir);
}

// 生成資源預載入清單
function generatePreloadList() {
  console.log('📝 生成資源預載入清單...');
  
  const preloadList = {
    critical: [
      '/Edu_macth_PRO/videos/taiwan-education.mp4',
      '/Edu_macth_PRO/images/bg-1.jpg',
      '/Edu_macth_PRO/images/bg-2.jpg'
    ],
    important: [
      '/Edu_macth_PRO/images/bg-3.jpg',
      '/Edu_macth_PRO/images/bg-4.jpg',
      '/Edu_macth_PRO/images/impact-stories/featured/featured-01.jpg'
    ],
    lazy: [
      '/Edu_macth_PRO/images/impact-stories/background-wall/01.jpg',
      '/Edu_macth_PRO/images/impact-stories/background-wall/02.jpg',
      '/Edu_macth_PRO/images/impact-stories/background-wall/03.jpg'
    ]
  };
  
  const outputPath = path.join(__dirname, '../src/data/preloadAssets.ts');
  const content = `// 自動生成的資源預載入清單
export const PRELOAD_ASSETS = ${JSON.stringify(preloadList, null, 2)} as const;
`;
  
  fs.writeFileSync(outputPath, content);
  console.log('✅ 預載入清單已生成:', outputPath);
}

// 主執行函數
function main() {
  console.log('🚀 開始資源優化...\n');
  
  checkImageSizes();
  console.log('');
  
  generatePreloadList();
  
  console.log('\n✨ 資源優化完成！');
  console.log('\n💡 建議:');
  console.log('1. 使用 WebP 格式替代 JPEG/PNG');
  console.log('2. 壓縮大於 500KB 的圖片');
  console.log('3. 使用 CDN 加速靜態資源');
  console.log('4. 啟用 Gzip 壓縮');
}

if (require.main === module) {
  main();
}

module.exports = { checkImageSizes, generatePreloadList };
