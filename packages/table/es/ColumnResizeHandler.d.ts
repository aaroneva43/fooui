import type { StandardProps } from './@types/common';
export type FixedType = boolean | 'left' | 'right';
export interface Client {
    clientX?: number;
    clientY?: number;
    preventDefault?: any;
}
export interface ColumnResizeHandlerProps extends StandardProps {
    height?: number;
    defaultColumnWidth?: number;
    columnLeft?: number;
    columnFixed?: FixedType;
    minWidth?: number;
    onColumnResizeStart?: (client: Client) => void;
    onColumnResizeEnd?: (columnWidth?: number, cursorDelta?: number) => void;
    onColumnResizeMove?: (columnWidth?: number, columnLeft?: number, columnFixed?: FixedType) => void;
}
declare const ColumnResizeHandler: any;
export default ColumnResizeHandler;