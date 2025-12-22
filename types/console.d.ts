/**
 * 控制台相关类型命名空间
 */
export namespace Console {
  /**
   * Console 日志条目
   */
  export interface LogEntry {
    type: 'log' | 'error' | 'warning' | 'info' | 'debug';
    text: string;
    timestamp: number;
    stackTrace?: string;
    url?: string;
    lineNumber?: number;
    columnNumber?: number;
  }

  /**
   * 获取 Console 错误参数
   */
  export interface GetErrorsParams {
    url?: string;
    level?: 'error' | 'warning' | 'all';
  }
}
