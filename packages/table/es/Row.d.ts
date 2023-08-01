import { StandardProps } from './@types/common';
export interface RowProps extends StandardProps {
    width?: number;
    height?: number;
    headerHeight?: number;
    top?: number;
    isHeaderRow?: boolean;
    rowRef?: any;
    rowSpan?: number;
}
declare const Row: any;
export default Row;
