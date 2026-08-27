import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  esbuild: {
    // 生產建置 (minify) 時移除 console.log/debug 與 debugger，保留 console.error/warn/info
    pure: ['console.log', 'console.debug'],
    drop: ['debugger']
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 注意：物件寫法的 manualChunks 會讓 chunk 被入口急切預載，
        // xlsx / recharts / gsap 交由 Rollup 依 lazy 邊界自然切分即可
        manualChunks: {
          'vendor-firebase': [
            'firebase/app',
            'firebase/firestore',
            'firebase/auth'
          ]
        }
      }
    }
  }
});
