import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from "@uni-helper/vite-plugin-uni-components";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    uni(),
    Components(),
    { // 自定义插件禁用vite:vue插件的devToolsEnabled，强制编译 vue 模板时 inline 为 true
      name: 'fix-vite-plugin-vue',
      configResolved(config) {
        const plugin = config.plugins.find((p) => p.name === 'vite:vue')
        if (plugin && plugin.api && plugin.api.options) {
          plugin.api.options.devToolsEnabled = false
        }
      },
    },
  ],
});
