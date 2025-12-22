/**
 * 缓存相关类型命名空间
 */
export namespace Cache {
  /**
   * 缓存状态信息
   */
  export interface Status {
    localStorage: Record<string, string>;
    sessionStorage: Record<string, string>;
    cookies: Array<{
      name: string;
      value: string;
      domain: string;
      path: string;
      expires?: number;
      httpOnly: boolean;
      secure: boolean;
      sameSite: string;
    }>;
    indexedDB?: {
      databases: string[];
    };
  }

  /**
   * 获取缓存状态参数
   */
  export interface GetStatusParams {
    url?: string;
  }
}
