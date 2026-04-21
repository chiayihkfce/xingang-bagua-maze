import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import javascriptObfuscator from 'vite-plugin-javascript-obfuscator'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    javascriptObfuscator({
      options: {
        compact: true,
        controlFlowFlattening: false, // 保持關閉以防卡死
        deadCodeInjection: false,     // 保持關閉以防體積過大
        debugProtection: true,        // 核心：鎖住 F12
        debugProtectionInterval: 4000,
        disableConsoleOutput: true,   // 封鎖 Console 輸出
        selfDefending: true,          // 防止代碼被美化/竄改
        splitStrings: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
      },
    })
    ],
    base: './', 
    build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-utils': ['xlsx', 'gsap', 'recharts'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/auth'],
        },
      },
    },
  }
})
