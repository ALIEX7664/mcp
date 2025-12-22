import { z } from 'zod';
import type { BrowserManager } from '../src/browser-manager';
import type { ConsoleHandler } from '../src/cdp-handlers/console-handler';
import type { ElementHandler } from '../src/cdp-handlers/element-handler';
import type { CacheHandler } from '../src/cdp-handlers/cache-handler';
import type { PerformanceHandler } from '../src/cdp-handlers/performance-handler';
import type { HeapHandler } from '../src/cdp-handlers/heap-handler';
import type { LighthouseHandler } from '../src/cdp-handlers/lighthouse-handler';

/**
 * 工具相关类型命名空间
 */
export namespace Tools {
  /**
   * 工具上下文，包含所有需要的处理器和管理器
   */
  export interface Context {
    browserManager: BrowserManager;
    consoleHandler: ConsoleHandler;
    elementHandler: ElementHandler;
    cacheHandler: CacheHandler;
    performanceHandler: PerformanceHandler;
    heapHandler: HeapHandler;
    lighthouseHandler: LighthouseHandler;
  }

  /**
   * 工具定义接口
   */
  export interface Definition {
    name: string;
    description: string;
    inputSchema: z.ZodTypeAny;
    handler: (args: any, context: Context) => Promise<{
      content: Array<{
        type: 'text';
        text: string;
      }>;
    }>;
  }

  /**
   * 导航参数
   */
  export interface NavigateParams {
    url: string;
  }

  /**
   * 截图参数
   */
  export interface TakeScreenshotParams {
    url?: string;
    fullPage?: boolean;
  }
}
