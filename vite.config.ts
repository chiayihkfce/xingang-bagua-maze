import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    javascriptObfuscator({
      // 混淆選項配置
      options: {
        compact: true,
        controlFlowFlattening: true, // 控制流扁平化，讓邏輯極難追蹤
        controlFlowFlatteningThreshold: 0.75,
        numbersToExpressions: true,
        simplify: true,
        stringArray: true, // 開啟字串陣列化，隱藏字串內容
        stringArrayEncoding: ['base64'], // 使用 base64 加密字串
        stringArrayThreshold: 0.75,
        splitStrings: true, // 拆分長字串
        unicodeEscapeSequence: true // 使用 Unicode 轉義序列
      },
    })
  ],
  base: './', // Ensures relative paths for GitHub Pages
  build: {
    sourcemap: false
  }
})
