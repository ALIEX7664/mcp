/**
 * 元素相关类型命名空间
 */
export namespace Element {
  /**
   * 元素状态信息
   */
  export interface State {
    tagName: string;
    id?: string;
    className?: string;
    textContent?: string;
    innerHTML?: string;
    attributes: Record<string, string>;
    styles: Record<string, string>;
    visible: boolean;
    clickable: boolean;
    boundingBox?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }

  /**
   * 检查元素参数
   */
  export interface CheckParams {
    selector: string;
    url?: string;
  }
}
