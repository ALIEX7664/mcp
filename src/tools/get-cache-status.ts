import { z } from 'zod';
import { Tools } from '../../types';

/**
 * 获取缓存状态工具定义
 */
export const getCacheStatusTool: Tools.Definition = {
    name: 'get_cache_status',
    description: '获取缓存状态（LocalStorage、SessionStorage、Cookies、IndexedDB）',
    inputSchema: z.object({
        url: z.string().optional().describe('页面 URL（可选）'),
    }),
    handler: async (args: { url?: string }, context: Tools.Context) => {
        const cacheStatus = await context.cacheHandler.getCacheStatus({
            url: args.url,
        });

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(cacheStatus, null, 2),
                },
            ],
        };
    },
};

