/**
 * 堆快照相关类型命名空间
 */
export namespace Heap {
  /**
   * 堆快照节点
   */
  export interface SnapshotNode {
    id: number;
    name: string;
    type: string;
    size: number;
    distance?: number;
  }

  /**
   * Heap snapshot 导出模式
   */
  export type SnapshotExportMode = 'none' | 'file' | 'inline' | 'both';

  /**
   * Heap snapshot 导出选项
   */
  export interface SnapshotExportOptions {
    /**
     * 导出方式：
     * - none: 不对外导出 raw snapshot（仅返回 summary；实现上仍可能使用临时文件做解析）
     * - file: 导出为文件并返回路径
     * - inline: 将 raw snapshot（可能截断）直接放入返回结构
     * - both: 同时 file + inline
     */
    mode?: SnapshotExportMode;
    /**
     * 当 mode 为 file/both 时可指定输出文件路径；不指定则写入系统临时目录
     */
    filePath?: string;
    /**
     * 当 mode 为 inline/both 时，inline 输出的最大字节数（超出将截断）
     */
    maxInlineBytes?: number;
  }

  export interface SnapshotTopConstructor {
    name: string;
    count: number;
    selfSizeBytes: number;
  }

  export interface SnapshotTopNode {
    id?: number;
    name: string;
    type?: string;
    selfSizeBytes: number;
  }

  export interface SnapshotSummary {
    /**
     * 是否成功解析 raw heap snapshot JSON
     */
    parsed: boolean;
    /**
     * 解析得到的节点数（如果解析失败则可能缺失）
     */
    totalNodes?: number;
    /**
     * 解析得到的总 self size（字节）（如果解析失败则可能缺失）
     */
    totalSizeBytes?: number;
    /**
     * Top N 构造函数/对象名（按 selfSizeBytes 排序）
     */
    topConstructors?: SnapshotTopConstructor[];
    /**
     * Top N 单体节点（按 selfSizeBytes 排序）
     */
    topNodes?: SnapshotTopNode[];
    /**
     * performance.memory（仅 Chromium 支持）
     */
    jsHeapUsedBytes?: number;
    jsHeapTotalBytes?: number;
    jsHeapSizeLimitBytes?: number;
    /**
     * Runtime.getHeapUsage（CDP）
     */
    runtimeUsedSizeBytes?: number;
    runtimeTotalSizeBytes?: number;
  }

  export interface SnapshotExportResult {
    mode: SnapshotExportMode;
    /**
     * file/both 模式的导出路径（本机路径）
     */
    filePath?: string;
    fileBytes?: number;
    /**
     * inline/both 模式的 raw snapshot（可能截断）
     */
    inline?: string;
    inlineBytes?: number;
    /**
     * 是否发生截断（可能来自 maxSnapshotBytes 或 maxInlineBytes）
     */
    truncated?: boolean;
    maxInlineBytes?: number;
  }

  /**
   * 堆快照返回结果（new shape）
   */
  export interface Snapshot {
    timestamp: number;
    summary: SnapshotSummary;
    export: SnapshotExportResult;
    limitations?: string[];

    /**
     * @deprecated 兼容字段（历史返回结构）。计划在下个 major 版本移除。
     *
     * 说明：
     * - 为避免 MCP 响应过大，这里的 `nodes` 可能只返回 TopN 节点（截断）。
     * - 请迁移到 `summary.topNodes`。
     */
    nodes?: SnapshotNode[];

    /**
     * @deprecated 兼容字段（历史返回结构）。计划在下个 major 版本移除。
     *
     * 请迁移到 `summary.totalSizeBytes`。
     */
    totalSize?: number;

    /**
     * @deprecated 兼容字段（历史返回结构）。计划在下个 major 版本移除。
     *
     * 请迁移到 `summary.totalNodes`。
     */
    totalNodes?: number;
  }

  /**
   * 内存分析结果
   */
  export interface MemoryAnalysis {
    heapUsed: number;
    heapTotal: number;
    external: number;
    rss: number;
    timestamp: number;
    objectCounts?: Record<string, number>;
  }

  /**
   * 分配跟踪信息
   */
  export interface AllocationTracking {
    /**
     * 本次跟踪开始/结束时刻附近的时间戳（毫秒）
     */
    timestamp?: number;
    /**
     * 跟踪时长（毫秒）
     */
    durationMs?: number;

    /**
     * new shape：可解释的分配统计与调用栈摘要
     */
    summary?: AllocationTrackingSummary;

    /**
     * new shape：raw profile 导出信息。
     *
     * 说明：为了最大化复用与兼容，我们复用 HeapSnapshot 的 export 结构；
     * 实际导出的内容是"带 trace 的 heap snapshot"（可在 Chrome DevTools Memory 中加载）。
     */
    export?: SnapshotExportResult;

    /**
     * new shape：限制与降级说明
     */
    limitations?: string[];

    /**
     * ===== legacy fields（历史返回结构，暂时保留）=====
     *
     * 说明：当前实现会把 TopN 调用栈摘要映射到 `allocations`（每条代表一条 stack 的聚合）。
     */
    allocations: Array<{
      size: number;
      timestamp: number;
      stackTrace?: string[];
    }>;
    totalAllocated: number;
    count: number;
  }

  export interface AllocationTrackingTopStack {
    /**
     * 聚合的调用栈（从 root 到 leaf 的可读栈帧）
     */
    stackTrace: string[];
    /**
     * 该调用栈累计分配的字节数
     */
    sizeBytes: number;
    /**
     * 该调用栈累计分配次数（如果可用）
     */
    count: number;
  }

  export interface AllocationTrackingSummary {
    /**
     * 是否成功解析 raw snapshot 的 trace_tree
     */
    parsed: boolean;
    /**
     * 解析得到的总分配字节数（如果解析失败则可能缺失）
     */
    totalAllocatedBytes?: number;
    /**
     * 解析得到的总分配次数（如果解析失败则可能缺失）
     */
    totalCount?: number;
    /**
     * TopN 调用栈摘要（按 sizeBytes 排序）
     */
    topStacks?: AllocationTrackingTopStack[];
  }

  /**
   * 获取堆快照参数
   */
  export interface GetSnapshotParams {
    url?: string;
    /**
     * Top N（构造函数/节点）数量，默认 20
     */
    topN?: number;
    /**
     * 采集前是否触发 GC，默认 false
     */
    collectGarbage?: boolean;
    /**
     * raw snapshot 导出选项
     */
    export?: SnapshotExportOptions;
    /**
     * 采集 raw snapshot 的最大字节数，默认 200MB。超出将截断并跳过解析。
     */
    maxSnapshotBytes?: number;
    /**
     * 解析（JSON.parse）允许的最大字节数，默认 50MB。超出将跳过解析。
     */
    maxParseBytes?: number;
  }

  /**
   * 分析内存参数
   */
  export interface AnalyzeMemoryParams {
    url?: string;
  }

  /**
   * 跟踪分配参数
   */
  export interface TrackAllocationsParams {
    url?: string;
    duration?: number;
    /**
     * Top N（调用栈）数量，默认 20
     */
    topN?: number;
    /**
     * 采集前是否触发 GC，默认 false
     */
    collectGarbage?: boolean;
    /**
     * raw profile 导出选项（复用 heap snapshot export 结构）
     */
    export?: SnapshotExportOptions;
    /**
     * raw snapshot 采集最大字节数，默认 200MB。超出将截断并跳过解析。
     */
    maxSnapshotBytes?: number;
    /**
     * JSON.parse 解析最大字节数，默认 50MB。超出将跳过解析。
     */
    maxParseBytes?: number;
  }
}
