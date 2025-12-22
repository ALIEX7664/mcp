import { Page } from 'puppeteer';

/**
 * 浏览器相关类型命名空间
 */
export namespace Browser {
  /**
   * 浏览器配置选项
   */
  export interface Config {
    headless?: boolean;
    args?: string[];
    timeout?: number;
  }

  /**
   * 页面信息
   */
  export interface PageInfo {
    page: Page;
    url: string;
    createdAt: Date;
  }
}
