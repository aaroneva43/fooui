import React from 'react';
import { RowDataType } from '../@types/common';
interface TableDimensionProps<Row, Key> {
    data?: readonly Row[];
    rowHeight: number | ((rowData?: Row) => number);
    height: number;
    minHeight: number;
    tableRef?: React.RefObject<HTMLDivElement>;
    headerWrapperRef?: React.RefObject<HTMLDivElement>;
    width?: number;
    prefix: (str: string) => string;
    affixHeader?: boolean | number;
    affixHorizontalScrollbar?: boolean | number;
    headerHeight: number;
    autoHeight?: boolean;
    fillHeight?: boolean;
    children?: React.ReactNode;
    expandedRowKeys?: readonly Key[];
    showHeader?: boolean;
    bordered?: boolean;
    onTableScroll?: (coord: {
        x?: number;
        y?: number;
    }) => void;
    onTableResizeChange?: (prevSize: number, event: 'bodyHeightChanged' | 'bodyWidthChanged' | 'widthChanged' | 'heightChanged') => void;
}
/**
 * The dimension information of the table,
 * including the height, width, scrollable distance and the coordinates of the scroll handle, etc.
 * @param props
 * @returns
 */
declare const useTableDimension: <Row extends RowDataType<never>, Key>(props: TableDimensionProps<Row, Key>) => {
    contentHeight: any;
    contentWidth: any;
    minScrollY: any;
    minScrollX: any;
    scrollY: any;
    scrollX: any;
    tableWidth: any;
    headerOffset: any;
    tableOffset: any;
    getTableHeight: () => any;
    setScrollY: any;
    setScrollX: any;
};
export default useTableDimension;
