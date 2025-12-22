import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Tools } from '../../types';
import { navigateTool } from './navigate';
import { getConsoleErrorsTool } from './get-console-errors';
import { checkElementTool } from './check-element';
import { getCacheStatusTool } from './get-cache-status';
import { getPerformanceTool } from './get-performance';
import { getHeapSnapshotTool } from './get-heap-snapshot';
import { analyzeMemoryTool } from './analyze-memory';
import { trackAllocationsTool } from './track-allocations';
import { takeScreenshotTool } from './take-screenshot';
import { getLighthouseTool } from './get-lighthouse';

/**
 * 所有工具定义列表
 */
export const allTools: Tools.Definition[] = [
  navigateTool,
  getConsoleErrorsTool,
  checkElementTool,
  getCacheStatusTool,
  getPerformanceTool,
  getHeapSnapshotTool,
  analyzeMemoryTool,
  trackAllocationsTool,
  takeScreenshotTool,
  getLighthouseTool,
];

/**
 * 注册所有工具到 MCP Server
 */
export function registerAllTools(server: McpServer, context: Tools.Context): void {
  for (const tool of allTools) {
    const handler = async (args: any) => {
      return tool.handler(args, context);
    };

    (server.registerTool as any)(
      tool.name,
      {
        description: tool.description,
        inputSchema: tool.inputSchema,
      },
      handler
    );
  }
}

