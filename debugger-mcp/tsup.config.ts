import { defineConfig } from 'tsup';

/**
 * tsup 配置文件
 * 
 * tsup 是一个基于 esbuild 的 TypeScript 打包工具，比 tsc 更快。
 * 它自动处理 TypeScript 编译、ESM/CommonJS 转换等。
 * 
 * 配置说明：
 * - entry: 入口文件
 * - format: 输出格式（esm 表示 ES Modules）
 * - target: 目标 JavaScript 版本
 * - outDir: 输出目录
 * - sourcemap: 生成 source map 文件（用于调试）
 * - clean: 构建前清理输出目录
 * - dts: 生成 TypeScript 类型声明文件
 * - splitting: 代码分割（保持文件结构）
 * - treeshake: 启用 tree shaking（移除未使用的代码）
 */
export default defineConfig({
  // 入口文件
  entry: ['src/index.ts'],

  // 输出格式：ES Modules（因为我们使用 "type": "module"）
  format: ['esm'],

  // 目标 JavaScript 版本
  target: 'es2022',

  // 输出目录
  outDir: 'dist',

  // 生成 source map（用于调试）
  sourcemap: false,

  // 构建前清理输出目录
  clean: true,

  // 生成 TypeScript 类型声明文件（.d.ts）
  dts: false,

  // 保持文件结构（不打包成单个文件）
  // 这对于使用 ES modules 的 import 很重要
  splitting: true,

  // 启用 tree shaking（移除未使用的代码）
  treeshake: true,

  // 不压缩代码（开发时）
  // 生产环境可以通过 --minify 标志启用压缩
  minify: true,

  // 外部依赖（不打包到输出中）
  // 这些依赖会在运行时从 node_modules 加载
  external: [
    '@modelcontextprotocol/sdk',
    'puppeteer',
    'zod',
  ],

  // 在文件顶部添加 shebang（#!/usr/bin/env node）
  // 这对于可执行脚本很重要
  banner: {
    js: '#!/usr/bin/env node',
  },
});

