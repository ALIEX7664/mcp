/**
 * 性能相关类型命名空间
 */
export namespace Performance {
  /**
   * 性能指标
   */
  export interface Metrics {
    navigation: {
      type: string;
      redirectCount: number;
      timing: {
        navigationStart: number;
        unloadEventStart?: number;
        unloadEventEnd?: number;
        redirectStart?: number;
        redirectEnd?: number;
        fetchStart: number;
        domainLookupStart?: number;
        domainLookupEnd?: number;
        connectStart?: number;
        connectEnd?: number;
        secureConnectionStart?: number;
        requestStart?: number;
        responseStart?: number;
        responseEnd?: number;
        domLoading?: number;
        domInteractive?: number;
        domContentLoadedEventStart?: number;
        domContentLoadedEventEnd?: number;
        domComplete?: number;
        loadEventStart?: number;
        loadEventEnd?: number;
      };
    };
    paint: Array<{
      name: string;
      entryType: string;
      startTime: number;
      duration: number;
    }>;
    resources: Array<{
      name: string;
      entryType: string;
      startTime: number;
      duration: number;
      initiatorType: string;
      transferSize: number;
      encodedBodySize: number;
      decodedBodySize: number;
    }>;
    marks: Array<{
      name: string;
      entryType: string;
      startTime: number;
    }>;
    measures: Array<{
      name: string;
      entryType: string;
      startTime: number;
      duration: number;
    }>;
  }

  /**
   * 获取性能指标参数
   */
  export interface GetParams {
    url?: string;
  }
}
