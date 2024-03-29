import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';
import type { ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import VitePluginCertificate from 'vite-plugin-mkcert';
import { viteMockServe } from 'vite-plugin-mock';
import { loadEnv } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import progress from 'vite-plugin-progress'
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const root = process.cwd();

  const { VITE_PORT } = loadEnv(mode, root);
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: true,
        prodEnabled: true,
        injectCode: `
          import { setupProdMockServer } from '/mock/index';
    
          setupProdMockServer();
          `,
      }),
      VitePluginCertificate({
        source: 'coding',
      }),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts',
      }),
       // 打包进度条展示
       progress()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      target: 'es2019',
      cssTarget: 'chrome80',
      sourcemap: false,
      commonjsOptions: {
        sourceMap: false,
      },
      terserOptions: {
        //打包后移除console和注释
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    server: {
      https: true,
      open:true,
      // Listening on all local IPs
      host: true,
      port: Number(VITE_PORT),
      proxy: {
        // 使用 proxy 实例
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/basic-api/, ""),
        },
        '/qiniu-api': {
          target: 'http://localhost:1000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/qiniu-api/, ''),
        },
        '/api': {
          target: 'http://localhost:19080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
};
