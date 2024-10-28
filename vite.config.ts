import { defineConfig } from "vite";
import UnoCSS from 'unocss/vite'
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), UnoCSS(), vitePluginForArco()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'), // 根路径
      '@': path.resolve(__dirname, 'src') // src 路径
    }
  },
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'https://fanyi.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/test': {
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/test/, '')
      }
    }
  },
  build: {
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: true
      }
    },
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 2000,
    outDir: 'dist'
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${path.resolve(
          __dirname,
          'src/assets/style/index.less'
        )}";`,
        // 支持内联 JavaScript
        javascriptEnabled: true
      }
    }
  }
})
