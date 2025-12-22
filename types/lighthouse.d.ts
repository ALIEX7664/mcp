/**
 * Lighthouse 相关类型命名空间
 */
export namespace Lighthouse {
  /**
   * Web Vitals 评级枚举
   */
  export enum WebVitalsRating {
    GOOD = 'good',
    NEEDS_IMPROVEMENT = 'needs-improvement',
    POOR = 'poor',
  }

  /**
   * 获取 Lighthouse 报告参数
   */
  export interface GetParams {
    url?: string;
    onlyCategories?: string[];
    skipAudits?: string[];
  }

  /**
   * Lighthouse 分类
   */
  export interface Category {
    score: number;
    title: string;
  }

  /**
   * Web Vitals 指标
   */
  export interface WebVitalsMetrics {
    fcp: number | null;
    lcp: number | null;
    fid: number | null;
    cls: number;
    ttfb: number | null;
  }

  /**
   * Web Vitals 评级
   */
  export interface WebVitalsRatings {
    fcp?: WebVitalsRating;
    lcp?: WebVitalsRating;
    fid?: WebVitalsRating;
    cls?: WebVitalsRating;
    ttfb?: WebVitalsRating;
  }

  /**
   * 性能指标（Lighthouse 上下文）
   */
  export interface PerformanceMetrics {
    tbt: number;
    tti: number;
    speedIndex: number;
  }

  /**
   * Lighthouse 指标
   */
  export interface Metrics {
    firstContentfulPaint: number | null;
    largestContentfulPaint: number | null;
    totalBlockingTime: number;
    cumulativeLayoutShift: number;
    speedIndex: number;
    timeToInteractive: number;
    firstInputDelay: number | null;
    timeToFirstByte: number | null;
    ratings?: WebVitalsRatings;
  }

  /**
   * Lighthouse 审计项
   */
  export interface Audit {
    id: string;
    title: string;
    description?: string;
    score?: number;
    numericValue?: number;
    displayValue?: string;
  }

  /**
   * Lighthouse 报告
   */
  export interface Report {
    url: string;
    fetchTime: string;
    userAgent: string;
    categories: {
      performance?: Category;
      accessibility?: Category;
      'best-practices'?: Category;
      seo?: Category;
    };
    metrics: Metrics;
    opportunities: Audit[];
    diagnostics: Audit[];
    implementation: 'approximation';
    limitations?: string[];
  }
}
